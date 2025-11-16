'use server';

import { Stuff,
  Condition,
  MerchStockStatus,
  LengthUnit,
  MerchMaterial,
  MerchCondition,
  MassUnit } from '@prisma/client';
import { hash } from 'bcrypt';
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
  Length: number,
  Width: number,
  Height: number,
  Mass: number,
  LUnit: string,
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
 * Fetches all image of a merch from the database.
 * @param merchID, the ID of the merch to get image of.
 */
export async function getMerchImage(merchID : number) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/download/merch-images?merchID=${merchID}`, {
    cache: 'no-store',
  }).then(result => result.json());
}

export const DEFAULT_IMAGE : {
  id: number,
  mimeType: string,
  base64: string;
  url?: string;
} = {
  id: -1,
  mimeType: 'image/png',
  base64: '',
  url: '/merch-photo/no-image-available.png',
};

export async function parseImageSource(image : {
  id: number,
  mimeType: string,
  base64: string,
  url?: string,
}) {
  if (image.base64 && image.base64.length > 0) {
    return `data:${image.mimeType};base64,${image.base64}`;
  }
  return image.url;
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
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}
