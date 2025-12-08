export type ListingCardData = {
  MerchID: number;
  Image: {
    ImageID: number;
    MIMEType: string;
  }[]
  Name: string;
  Price: number;
  seller: {
    Username: string;
  };
  Condition: string;
  PostTime: Date;
};
