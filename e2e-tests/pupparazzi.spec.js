// @ts-check
import { test, expect } from '@playwright/test'
import { existsSync } from 'node:fs'
import * as fs from 'node:fs/promises'

let initialData = ''

test.beforeAll(async () => {
  // remember how our data looked when we started
  initialData = await fs.readFile('./storage/data.json', 'utf8')
})

test.beforeEach(async () => {
  // before each test, we'll set up our database to a
  // predefined state
  await resetData()
})

test.afterAll(async () => {
  // when we're done we can put it back to normal
  await fs.writeFile('./storage/data.json', initialData, 'utf8')
})

test('has title', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Pupparazzi/)
})

test('link to coco', async ({ page }) => {
  await page.goto('/')

  // Click on coco
  await page.getByAltText('Coco').click()

  // Expects page to have a heading with the name of "Coco".
  await expect(page.getByRole('heading', { name: 'Coco' })).toBeVisible()
  await expect(page.getByText('Breed: labrador')).toBeVisible()
  await expect(page.getByText('Owner: Chloe')).toBeVisible()
})

test('edit coco', async ({ page }) => {
  await page.goto('/')

  // Click the get started link.
  await page.getByAltText('Coco').click()

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Coco' })).toBeVisible()

  await page.getByRole('link', { name: 'Edit' }).click()

  await page.getByLabel('Name:').fill('Jormp')
  await page.getByLabel('Breed:').fill('Shitzu')
  await page.getByLabel('Owner:').fill('Jatin')
  await page.getByRole('button', { name: 'Submit' }).click()

  await expect(page.getByRole('heading', { name: 'Jormp' })).toBeVisible()
  await expect(page.getByText('Breed: Shitzu')).toBeVisible()
})

test('making a brand new puppy', async ({ page }) => {
  await page.goto('/')

  await page.getByRole('link', { name: 'Add Puppy' }).click()

  await page.getByLabel('Name:').fill('Apple')
  await page.getByLabel('Breed:').fill('Baby')
  await page.getByLabel('Owner:').fill('Goop')
  await page.getByRole('button', { name: 'Submit' }).click()

  await expect(page.getByRole('heading', { name: 'Apple' })).toBeVisible()
  await expect(page.getByText('Breed: Baby')).toBeVisible()
})

async function resetData() {
  if (existsSync('storage/data.json')) {
    await fs.cp('example.json', 'storage/data.json')
  }
}
