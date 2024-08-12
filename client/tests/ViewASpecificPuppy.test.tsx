// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import nock from 'nock'

import { renderRoute, testData } from './setup.tsx'

describe('A link to Coco', () => {
  it('Is visible on the home page', async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/puppies')
      .reply(200, testData())

    const { ...screen } = renderRoute('/')
    const link = await screen.findByRole('link', { name: /Coco/ })
    expect(link).toBeVisible()
    expect(scope.isDone()).toBe(true)
  })

  it("Takes me to Coco's page", async () => {
    const scope = nock('http://localhost')
      .get('/api/v1/puppies')
      .reply(200, testData())

    const { user, ...screen } = renderRoute('/')
    const link = await screen.findByRole('link', { name: /Coco/ })
    expect(scope.isDone()).toBe(true)

    const scope2 = nock('http://localhost')
      .get('/api/v1/puppies/1')
      .reply(200, testData().puppies[0])
    await user.click(link)
    const heading = await screen.findByRole('heading', { name: 'Coco' })
    expect(heading).toBeVisible()
    expect(scope2.isDone()).toBe(true)
  })
})
