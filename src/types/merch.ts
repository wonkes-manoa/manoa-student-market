import type { Merch, LikedMerch } from '@prisma/client';

export type MerchWithRelations = Merch & {
  likedBy: LikedMerch[];
  Image: {
    ImageID: number;
    MIMEType: string;
  }[];
};
