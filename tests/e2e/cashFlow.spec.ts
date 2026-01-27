import { test, expect } from '@playwright/test'

test.describe.serial('cashFlow cruds', () => {
  let title = ''
  test('create cash flow', async ({ page }, testInfo) => {
    const pjName = testInfo.project.name
    title = `もも - ${pjName}`
    await page.goto('http://localhost:5173/')
    await page.getByRole('button', { name: '+ Add' }).click()
    await page.getByRole('spinbutton', { name: 'Amount' }).click()
    await page.getByRole('spinbutton', { name: 'Amount' }).fill('1000')
    await page.getByRole('textbox', { name: 'Title' }).click()
    await page.getByRole('textbox', { name: 'Title' }).fill(title)
    await page.getByRole('textbox', { name: 'Recorded At' }).fill('2026-01-22')
    await page.getByRole('button', { name: 'Submit' }).click()

    const row = page
      .getByRole('row')
      .filter({ has: page.getByRole('cell', { name: title, exact: true }) })

    await expect(row.getByRole('cell', { name: title })).toBeVisible()
    await expect(row.getByRole('cell', { name: '1000', exact: true })).toBeVisible()
  })

  test('update cash flow', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    const row = page
      .getByRole('row')
      .filter({ has: page.getByRole('cell', { name: title, exact: true }) })
    await row.getByRole('button', { name: 'Edit' }).click()
    await page.getByRole('spinbutton', { name: 'Amount' }).click()
    await page.getByRole('spinbutton', { name: 'Amount' }).fill('2000')
    await page.getByRole('button', { name: 'Edit' }).click()

    await expect(row.getByRole('cell', { name: title })).toBeVisible()
    await expect(row.getByRole('cell', { name: '2000', exact: true })).toBeVisible()
  })

  test('delete cash flow', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    const row = page
      .getByRole('row')
      .filter({ has: page.getByRole('cell', { name: title, exact: true }) })
    await row.getByRole('button', { name: 'Delete' }).click()
    await page.getByRole('button', { name: 'Delete' }).click()
    await expect(row).toHaveCount(0)
  })
})
