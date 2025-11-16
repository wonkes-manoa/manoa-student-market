import { MerchImage } from '@prisma/client';

export type ListingCardData = {
  MerchID: number;
  Image: MerchImage[];
  Name: string;
  Price: number;
  seller: {
    Username: string;
  };
  Condition: string;
  PostTime: Date;
};
