'use server';

import { Stuff,
  Condition,
  MerchStockStatus,
  LengthUnit,
  MerchMaterial,
  MerchCondition,
  MassUnit } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { sendEmail } from '@/lib/email';
import { prisma } from './prisma';

/**
 * Adds a new merch to the database.
 * @param merch, an object that specify the detail of the merch to add.
 */
export async function addMerch(merch: {
  AccountID: number,
  StockStatus: string,
  Price: number,
  Name: string,
  Description: string,
  Length?: number | null,
  Width?: number | null,
  Height?: number | null,
  Mass?: number | null,
  LUnit?: string | null,
  WUnit?: string | null,
  HUnit?: string | null,
  MUnit?: string | null,
  Material: string,
  Condition: string,
}) {
  const stockStatus = merch.StockStatus as MerchStockStatus;
  const lengthUnit = merch.LUnit as LengthUnit;
  const widthUnit = merch.WUnit as LengthUnit;
  const heightUnit = merch.HUnit as LengthUnit;
  const massUnit = merch.MUnit as MassUnit;
  const material = merch.Material as MerchMaterial;
  const condition = merch.Condition as MerchCondition;

  const newMerch = await prisma.merch.create({
    data: {
      AccountID: merch.AccountID,
      StockStatus: stockStatus,
      Price: merch.Price,
      Name: merch.Name,
      Description: merch.Description,
      Length: merch.Length,
      Width: merch.Width,
      Height: merch.Height,
      Mass: merch.Mass,
      LUnit: lengthUnit,
      WUnit: widthUnit,
      HUnit: heightUnit,
      MUnit: massUnit,
      Material: material,
      Condition: condition,
    },
  });

  return newMerch;
}

/**
 * Edits a given merch in the database.
 * @param merch, an object that specify the detail of the merch to edit.
 */
export async function editMerch(merch: {
  MerchID: number,
  StockStatus: string,
  Price: number,
  Name: string,
  Description: string,
  Length?: number | null,
  Width?: number | null,
  Height?: number | null,
  Mass?: number | null,
  LUnit?: string | null,
  WUnit?: string | null,
  HUnit?: string | null,
  MUnit?: string | null,
  Material: string,
  Condition: string,
}) {
  const stockStatus = merch.StockStatus as MerchStockStatus;
  const lengthUnit = merch.LUnit as LengthUnit;
  const widthUnit = merch.WUnit as LengthUnit;
  const heightUnit = merch.HUnit as LengthUnit;
  const massUnit = merch.MUnit as MassUnit;
  const material = merch.Material as MerchMaterial;
  const condition = merch.Condition as MerchCondition;

  const editedMerch = await prisma.merch.update({
    where: { MerchID: merch.MerchID },
    data: {
      StockStatus: stockStatus,
      Price: merch.Price,
      Name: merch.Name,
      Description: merch.Description,
      Length: merch.Length,
      Width: merch.Width,
      Height: merch.Height,
      Mass: merch.Mass,
      LUnit: lengthUnit,
      WUnit: widthUnit,
      HUnit: heightUnit,
      MUnit: massUnit,
      Material: material,
      Condition: condition,
    },
  });

  return editedMerch;
}

/**
 * Adds a new stuff to the database.
 * @param stuff, an object with the following properties: name, quantity, owner, condition.
 */
export async function addStuff(stuff: { name: string; quantity: number; owner: string; condition: string }) {
  // console.log(`addStuff data: ${JSON.stringify(stuff, null, 2)}`);
  let condition: Condition = 'good';
  if (stuff.condition === 'poor') {
    condition = 'poor';
  } else if (stuff.condition === 'excellent') {
    condition = 'excellent';
  } else {
    condition = 'fair';
  }
  await prisma.stuff.create({
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition,
    },
  });
  // After adding, redirect to the list page
  redirect('/list');
}

/**
 * Edits an existing stuff in the database.
 * @param stuff, an object with the following properties: id, name, quantity, owner, condition.
 */
export async function editStuff(stuff: Stuff) {
  // console.log(`editStuff data: ${JSON.stringify(stuff, null, 2)}`);
  await prisma.stuff.update({
    where: { id: stuff.id },
    data: {
      name: stuff.name,
      quantity: stuff.quantity,
      owner: stuff.owner,
      condition: stuff.condition,
    },
  });
  // After updating, redirect to the list page
  redirect('/list');
}

/**
 * Deletes an existing stuff from the database.
 * @param id, the id of the stuff to delete.
 */
export async function deleteStuff(id: number) {
  // console.log(`deleteStuff id: ${id}`);
  await prisma.stuff.delete({
    where: { id },
  });
  // After deleting, redirect to the list page
  redirect('/list');
}

/**
 * Creates a user new account in the database.
 * @param credentials, an object containing information required for creating an account.
 */
export async function createAccount(credentials: {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}) {
  const isUsernameExist = await prisma.account.findUnique({
    where: { Username: credentials.username },
  });

  if (isUsernameExist) {
    return { ok: false, message: 'Username already exists' };
  }
  const isEmailExist = await prisma.account.findUnique({
    where: { EmailAddress: credentials.email },
  });

  if (isEmailExist) {
    return { ok: false, message: 'Email address already exists' };
  }

  const hashedPassword = await hash(credentials.password, 14);

  await prisma.account.create({
    data: {
      Username: credentials.username,
      Password: hashedPassword,
      EmailAddress: credentials.email,
      FirstName: credentials.firstName,
      LastName: credentials.lastName,
    },
  });

  return { ok: true };
}

/**
 * Check if an account match the specified information, and send that account's owner a passcode for resetting password.
 * @param username, username of the account to send whose owner a passcode
 * @param email, email of the account to send whose owner a passcode
 */
export async function sendPasswordResetPasscode({ username, email } : {
  username : string;
  email : string;
}) {
  // Validate information.
  const account = await prisma.account.findFirst({
    where: { Username: username, EmailAddress: email },
  });
  if (!account) {
    return { ok: false, message: 'Account not found, double check what you entered' };
  }

  // Prepare passcode.
  let done : boolean = false;
  let iteration : number = 0;
  let passcode : string = '';
  /* eslint-disable no-await-in-loop */
  while (!done) {
    ++iteration;
    done = true;
    // 6-digit code, 900000 possibilities.
    const passCodeCandidate = Math.floor(100000 + Math.random() * 900000).toString();
    const unlucky = await prisma.account.findMany({
      where: {
        PwdResetCode: { not: null },
        PwdRstCdExp: { gt: new Date() },
      },
    });
    for (const acc of unlucky) {
      if (acc.PwdResetCode) {
        const collide = await compare(passCodeCandidate, acc.PwdResetCode);
        if (collide) {
          done = false;
          break;
        }
      }
    }
    // Return if collide for more than 50 times.
    if (!done && iteration > 50) {
      console.error('Failed to generate unique passcode for 51 attempts');
      return { ok: false, message: 'An internal error occurred, try again later' };
    }
    if (done) {
      passcode = passCodeCandidate;
    }
  }
  /* eslint-enable no-await-in-loop */

  // Write passcode into database.
  await prisma.account.update({
    where: { Username: username, EmailAddress: email },
    data: { PwdResetCode: await hash(passcode, 14), PwdRstCdExp: new Date(Date.now() + 10 * 60 * 1000) },
    // Passcode expires in 10 minutes.
  });

  // Send passcode to user.
  async function handleSendEmail() {
    await sendEmail({
      recipientEmail: [email],
      subject: 'Wonkes Reset Password',
      html: `<p>Your passcode is <b>${passcode}</b>. If you did not expect this email, you may safely ignore it.</p>`,
    });
  }
  await handleSendEmail();

  // Done.
  return { ok: true };
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object containing information required for resetting password.
 */
export async function changePasswordByPasscode({ passcode, password } : {
  passcode : string;
  password : string;
}) {
  const account = await prisma.account.findMany({
    where: {
      PwdResetCode: { not: null },
      PwdRstCdExp: { gt: new Date() },
    },
  });

  if (!account) {
    return { ok: false, message: 'An internal error occurred, please try again later.' };
  }

  /* eslint-disable no-await-in-loop */
  for (let index = 0; index < account.length; ++index) {
    if (await compare(passcode, account[index].PwdResetCode || '')) {
      await prisma.account.update({
        where: { AccountID: account[index].AccountID },
        data: {
          Password: await hash(password, 14),
          PwdResetCode: null,
          PwdRstCdExp: null,
        },
      });
      return { ok: true };
    }
  }
  /* eslint-enable no-await-in-loop */

  return { ok: false, message: 'Passcode is invalid or has expired' };
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object containing information required for resetting password.
 */
export async function changePassword(credentials: {
  username: string;
  oldpassword: string;
  password: string;
}) {
  const { username } = credentials;
  const account = await prisma.account.findUnique({
    where: { Username: username },
  });
  if (!account) {
    return { ok: false, message: 'Server did not recognize your account' };
  }

  const isOldPasswordValid = await compare(credentials.oldpassword, account.Password);
  if (!isOldPasswordValid) {
    return { ok: false, message: 'Old password is incorrect' };
  }

  const isOldNewPwdSame = credentials.oldpassword === credentials.password;
  if (isOldNewPwdSame) {
    return { ok: false, message: 'New password and old password must differ' };
  }

  const hashedPassword = await hash(credentials.password, 14);
  await prisma.account.update({
    where: { Username: username },
    data: { Password: hashedPassword },
  });

  return { ok: true };
}
