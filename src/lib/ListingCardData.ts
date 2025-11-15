import { PhotoItem } from '@prisma/client';

export type ListingCardData = {
  photoItem: PhotoItem | null;
  username: string;
  itemSold: string | null;
  price: string | null;
  quality: string | null;
  dateOfList: Date | null;
};
