import { PhotoItem } from '@prisma/client';

export type ListingCardData = {
  photoItem: PhotoItem;
  username: string | null;
  itemSold: string | null;
  price: string | null;
  quality: string | null;
  dateOfList: Date | null;
};
