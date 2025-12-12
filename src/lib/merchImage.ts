/**
 * Represents a merch image stored on Vercel Blob.
 */
export type MerchImage = {
  id: number;
  mimeType: string;
  url: string;
};

/**
 * Fallback “No Image Available” image.
 */
export const DEFAULT_IMAGE: MerchImage = {
  id: -1,
  mimeType: 'image/png',
  url: '/merch-photo/no-image-available.png',
};

/**
 * Fetch merch images from Vercel Blob by merch ID.
 * The API route should use `@vercel/blob` to list or retrieve blob URLs.
 *
 * @param merchID – ID of the merch item whose images you want.
 * @param addDummy – If true, return DEFAULT_IMAGE when no images exist.
 */
export async function getMerchImagesByMerchID(
  merchID: number,
  addDummy: boolean = true,
): Promise<MerchImage[]> {
  try {
    const res = await fetch(`/api/blob/merch-images?merchID=${merchID}`, {
      cache: 'no-store',
    });

    let result: MerchImage[] = [];

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
 * Returns an image source URL for the <Image> component.
 */
export function parseImageSource(image: MerchImage): string {
  return (image.url ?? DEFAULT_IMAGE.url) ?? '/merch-photo/no-image-available.png';
}
