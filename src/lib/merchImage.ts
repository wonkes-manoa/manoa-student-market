/**
 * A simplification of the MerchImage data model in the database. Contains basic information
 * needed to identify and display an image.
 */
export type MerchImage = {
  id: number;
  mimeType: string;
  base64: string;
  url?: string;
};

/**
 * An image of a crossed out camera, with the phrase "No Image Available" beneath.
 */
export const DEFAULT_IMAGE : MerchImage = {
  id: -1,
  mimeType: 'image/png',
  base64: '',
  url: '/merch-photo/no-image-available.png',
};

/**
 * Returns an array of merch images associate with the merch of the given merch ID.
 * @param merchID, ID of the merch to fetch associate images.
 * @param addDummy, if true, DEFAULT_IMAGE is inserted to the result array of it is empty.
 * @returns An array of merch images.
 */
export async function getMerchImagesByMerchID(merchID : number, addDummy : boolean = true) : Promise<MerchImage[]> {
  try {
    const res = await fetch(`/api/download/merch-images?merchID=${merchID}`, {
      cache: 'no-store',
    });
    let result : MerchImage[] = [];

    if (res.ok) {
      result = await res.json();
    }
    if (addDummy && result.length === 0) {
      result.push(DEFAULT_IMAGE);
    }

    return result;
  } catch (err) {
    return addDummy ? [DEFAULT_IMAGE] : [];
  }
}

/**
 * Returns the string for the src attribute of the Image component for displaying the given image.
 * @param image, the image to get the string for src.
 * @returns A string that can pass directly to the src attribute of an Image component to display the given image.
 */
export function parseImageSource(image: MerchImage) : string {
  if (image.base64 && image.base64.length > 0) {
    return `data:${image.mimeType};base64,${image.base64}`;
  }
  return (image.url ?? DEFAULT_IMAGE.url) ?? '/merch-photo/no-image-available.png';
}
