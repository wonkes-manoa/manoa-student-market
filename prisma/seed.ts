import {
  PrismaClient,
  AccountPrivilege,
  MerchStockStatus,
  LengthUnit,
  MassUnit,
  MerchMaterial,
  MerchCondition,
} from '@prisma/client';
import { hash } from 'bcrypt';
import path from 'path';
import fs from 'fs/promises';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  for (const account of config.defaultAccount) {
    const privilege = account.Privilege as AccountPrivilege || AccountPrivilege.USER;
    // eslint-disable-next-line no-await-in-loop
    await prisma.account.upsert({
      where: { AccountID: config.defaultAccount.indexOf(account) + 1 },
      update: {},
      create: {
        Privilege: privilege,
        Username: account.Username,
        EmailAddress: account.EmailAddress,
        // eslint-disable-next-line no-await-in-loop
        Password: await hash(account.Password, 14),
        FirstName: account.FirstName,
        LastName: account.LastName,
      } });
  }
  for (const merch of config.defaultMerch) {
    const stock = merch.StockStatus as MerchStockStatus || MerchStockStatus.ON_STOCK;
    const lengthUnit = merch.LUnit as LengthUnit || LengthUnit.CENTIMETER;
    const widthUnit = merch.WUnit as LengthUnit || LengthUnit.CENTIMETER;
    const heightUnit = merch.HUnit as LengthUnit || LengthUnit.CENTIMETER;
    const massUnit = merch.MUnit as MassUnit || MassUnit.GRAM;
    const material = merch.Material as MerchMaterial || MerchMaterial.ALUMINUM;
    const condition = merch.Condition as MerchCondition || MerchCondition.NEW;
    // eslint-disable-next-line no-await-in-loop
    await prisma.merch.upsert({
      where: { MerchID: config.defaultMerch.indexOf(merch) + 1 },
      update: {},
      create: {
        AccountID: merch.AccountID,
        StockStatus: stock,
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
  }
  for (const image of config.defaultMerchImages) {
    const filePath = path.join(process.cwd(), 'public', 'merch-photo', image.FileName);
    /* eslint-disable no-await-in-loop */
    const fileBuffer = await fs.readFile(filePath);
    await prisma.merchImage.upsert({
      where: { ImageID: config.defaultMerchImages.indexOf(image) + 1 },
      update: {},
      create: {
        MerchID: image.MerchID,
        FileName: image.FileName,
        MIMEType: image.MIMEType,
        Data: fileBuffer,
      },
    });
    /* eslint-enable no-await-in-loop */
  }
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
