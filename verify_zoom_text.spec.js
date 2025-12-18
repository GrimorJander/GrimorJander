const { test, expect } = require('@playwright/test');

test('should display occupant name on seat when zoomed in', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // 1. Click on a seat to open the modal (Use a more specific selector)
  const seatId = 'F13-B36';
  await page.locator(`g[data-id="${seatId}"]`).click();

  // 2. Fill in the first and last name
  await page.locator('#firstName').fill('Jules');
  await page.locator('#lastName').fill('Test');

  // 3. Save the changes
  await page.locator('#saveBtn').click();

  // 4. Zoom in multiple times
  const canvas = page.locator('#canvasWrap');
  for (let i = 0; i < 15; i++) {
    await canvas.dispatchEvent('wheel', { deltaY: -100 });
  }

  // Wait for zoom to apply
  await page.waitForTimeout(500);

  // 5. Take a screenshot
  const seatElement = await page.locator(`g[data-id="${seatId}"]`);
  await seatElement.screenshot({ path: 'zoomed_seat_name_fix.png' });

});
