# End to end testing with Playwright

In addition to `vitest`, pupparazzi ships with some end-to-end (E2E) tests, using [playwright](https://playwright.dev/).

## How to run the E2E tests

In addition to `npm install`, playwright will need to make sure the browsers it will run tests in are installed in your environment. You can do this via npx:

```sh
npx playwright install 'chromium'
```

or with an npm script:

```sh
npm run install-browsers
```

Now, you should have everything you need so you can run the tests with npx:

```sh
npx playwright test
```

... or as an npm script

```sh
npm run e2e-test
```

If you're interested in exploring the playwright tests, or you get stuck you
might want to run the playwright ui. This allows you to see the state of the app
when individual steps are happening.

```sh
npx playwright test --ui
```

... or

```sh
npm run e2e-test -- --ui
```

## Configuration and setup

These tests are very similar to what we write with vitest and you can read them [here](../e2e-tests/pupparazzi.spec.js)

So that the playwright runner and the vitest runner don't collide, we've excluded the e2e-tests folder from our `npm test` script by configuring `vitest` to [ignore this folder](../vitest.config.js).

The main configuration is in the [playwright config](../playwright.config.js).

The E2E tests will also start the dev server and before each test they restore the `data.json` file to a known state.
