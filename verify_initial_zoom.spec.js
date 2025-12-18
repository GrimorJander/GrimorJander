const { test, expect } = require('@playwright/test');

test('should display the seating plan correctly on initial load', async ({ page }) => {
  await page.goto('http://localhost:8080');

  // Wait for the SVG to be rendered
  await page.waitForSelector('#seating');

  // Give a moment for layout to settle
  await page.waitForTimeout(500);

  // Take a screenshot of the initial view
  await page.screenshot({ path: 'initial_view_fix.png' });
});
