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
  Width: number,
  Height: number,
  Mass: number,
  LUnit?: string | null,
  WUnit: string,
  HUnit: string,
  MUnit: string,
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
      Length: merch.Length || 0,
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
