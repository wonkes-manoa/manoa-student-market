import { test, expect } from './auth-utils';

test.slow();
test('can authenticate a specific user', async ({ getUserPage }) => {
  // Call the getUserPage fixture with users signin info to get authenticated session for user
  const customUserPage = await getUserPage('john@foo.com', 'changeme');

  // Navigate to the home customUserPage
  // await customUserPage.goto('http://localhost:3000/'); // already navigating as part of authentication, removing.
  // Check if all expected links are visible
  await expect(customUserPage.getByRole('button', { name: 'My Listings' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'View Listings' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'Add Listing' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'Support & FAQ' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'University Website' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'Contact Wonkes' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'Wonkes Project Home Page' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'Wonkes Project Repository' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'Terms & Academic Use' })).toBeVisible();

  // Top right button check
  await expect(customUserPage.getByRole('button', { name: 'john@foo.com' })).toBeVisible();
  // await customUserPage.getByRole('link', { name: 'Add Stuff' }).click();
  // await expect(customUserPage.getByRole('heading', { name: 'Add Stuff' })).toBeVisible();
  // await customUserPage.getByRole('link', { name: 'List Stuff' }).click();
  // await expect(customUserPage.getByRole('heading', { name: 'Stuff' })).toBeVisible();

  // Open the "My Listings" dropdown and check items
  const dropdownButton = customUserPage.getByRole('button', { name: 'My Listings' });
  await dropdownButton.scrollIntoViewIfNeeded();
  await dropdownButton.focus();
  await customUserPage.keyboard.press('Enter'); // Try keyboard navigation for robust opening
  // Optionally short wait
  await customUserPage.waitForTimeout(500);
  // Debugging: Output HTML if still flaky
  // console.log(await customUserPage.content());
  await expect(customUserPage.getByRole('link', { name: 'Favorited Listings' })).toBeVisible();
  await expect(customUserPage.getByRole('link', { name: 'Added Listings' })).toBeVisible();

});


// Original code for reference:
// test('can authenticate a specific user', async ({ getUserPage }) => {
//   // Call the getUserPage fixture with users signin info to get authenticated session for user
//   const customUserPage = await getUserPage('john@foo.com', 'changeme');

//   // Navigate to the home customUserPage
//   await customUserPage.goto('http://localhost:3000/');
//   await expect(customUserPage.getByRole('link', { name: 'Add Stuff' })).toBeVisible();
//   await expect(customUserPage.getByRole('link', { name: 'List Stuff' })).toBeVisible();
//   await expect(customUserPage.getByRole('button', { name: 'john@foo.com' })).toBeVisible();
//   await customUserPage.getByRole('link', { name: 'Add Stuff' }).click();
//   await expect(customUserPage.getByRole('heading', { name: 'Add Stuff' })).toBeVisible();
//   await customUserPage.getByRole('link', { name: 'List Stuff' }).click();
//   await expect(customUserPage.getByRole('heading', { name: 'Stuff' })).toBeVisible();

// });
