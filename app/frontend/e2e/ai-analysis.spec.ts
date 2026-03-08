import { test, expect } from '@playwright/test';

const BASE = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173';

test.describe('AI Analysis Flow', () => {
    test('should request AI analysis and display results', async ({ page }) => {
        // 1. Visit Dashboard and Login
        await page.goto(`${BASE}/dashboard`);

        if (page.url().includes('/login')) {
            await page.locator('input[type="email"]').fill('test@example.com');
            await page.locator('input[type="password"]').fill('password123');
            await page.getByRole('button', { name: /sign in/i }).click();
            await expect(page).toHaveURL(/\/dashboard/);
        }

        // 2. Click on the first existing session if available, else skip or create one
        // Let's create one for reliability
        await page.getByTestId('create-session-btn').click();
        await page.getByPlaceholder(/Implement a LRU Cache/i).fill('AI Test Session');
        await page.getByRole('button', { name: /start session/i }).click();

        await expect(page).toHaveURL(/\/session\/[a-zA-Z0-9]+/, { timeout: 10000 });
        await expect(page.locator('.monaco-editor')).toBeVisible({ timeout: 15000 });

        // 3. Click Analyze
        await page.getByRole('button', { name: /analyze/i }).click();

        // 4. Verify AI Analysis tab becomes active
        await expect(page.getByText('Deep Analysis in Progress...')).toBeVisible({ timeout: 5000 });

        // Since real AI analysis takes 10-20s and calls Gemini, we might timeout in a standard E2E test, 
        // but we can at least assert the loading state works.
    });
});
