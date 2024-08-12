# Pupparazzi Workshop

## Learning Objectives:

1. Learn Express router
2. Practice using promises

## Setup

### 0. Cloning and installation

- [ ] After cloning this repo, install dependencies with `npm install`, and start the dev server with `npm run dev`
  <details style="padding-left: 2em">
    <summary>More about getting started</summary>

  - To run the tests: `npm test`

---

## Things to Consider

<details>
  <summary>Important tips for completing the challenge</summary>

1. The order of routes is important. When your app is running, the first one that matches will be used. So if you have a `/:id` route before an `/edit` route, a request to `/edit` will choose the `/:id` route and the value of `req.params.id` will be `"edit"`.
1. There can only be one server response (e.g. `res.send()` or `res.json()`) per request. If you have multiple potential responses (like a success and an error response) make sure to write your logic so that the route responds appropriately.
1. Make sure to `JSON.parse` and `JSON.stringify` when reading/writing JSON data.
1. Don't forget to handle errors when your promises fail using `try { } catch (e) { }`
1. When in doubt check the [node `fs/promises` documentation](https://nodejs.org/api/fs.html#promises-api)
more specifically: [readFile](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options) and 
[writeFile](https://nodejs.org/api/fs.html#fspromiseswritefilefile-data-options)
</details>
<br />

---

## 1. Take a look around and list all puppies

- [ ] As a user, I want to see a list off all the puppies.

Let's get familiar with the code base so you can begin to understand what needs to be done to get it to work.

- Firstly, have a look through the code. Familiarise yourself with the structure and different folders/files. Think about how data will move through the stack.

- If you have the development server running `npm run dev`, you can visit our site at http://localhost:5173. You'll see that a lot of the functionality is broken. In the network tab on your brower's development tools, you can see that our api calls are coming back as 404s.

- Notice how there are tests to test the data at different points of the stack. Run our tests with `npm test`, you'll see that our frontend tests are passing but our backend tests are failing

Now that you have an idea of what is going on, let's get our first route going, set up a handler `GET /api/v1/puppies/` that returns an array of puppies

  <details style="padding-left: 2em">
    <summary>More about the server</summary>

  Create a new file at `server/routes/puppies.ts`. We'll put all our puppy related routes in here.

  In Express, we can group together routes that are related, like user routes or 'puppy' routes. We group them in what's called a "router". We can collect them together like this:

  ```js
  import express from 'express'

  const router = express.Router()
  export default router
  ```

  Then we'll add our root ('/') puppy route handler. For now, we'll just send an empty array:

  ```js
  router.get('/', async (req, res) => {
    res.json([])
  })
  ```

  Now let's hook up the router. In `server/server.ts` we first import our router.

  ```js
  import puppies from './routes/puppies.ts'
  ```

  Then we integrate our new router with `server.use` which we can then pass
  the prefix `/api/v1/puppies` we want to route from.

  ```js
  // make sure you have this line to set up the JSON middleware
  server.use(express.json())
  server.use('/api/v1/puppies', puppies)
  ```

  Start the server and make a GET request in Thunderclient to http://localhost:5173/api/v1/puppies to see the JSON output

  Now that we have our basic setup, let's load some actual puppies.
  </details>

  <details style="padding-left: 2em">
    <summary>How to get data from the file system</summary>

  First we're going to need a file to read from, there's an example file in the repo called [example.json](./example.json) and before we get started let's copy it into the storage folder.

  We're going to call the copy "data.json". You can do this in VS Code or by running the following command.

  ```sh
  cp example.json ./storage/data.json
  ```

  There's an existing test for this feature. Run `npm test -- -t 'Listing all puppies'` and you should see a test failing

  Now we can update our [puppy routes](./server/routes/puppies.ts) to serve data from that file

  ```ts
  import * as fs from 'node:fs/promises'

  router.get('/', async (req, res) => {
    const json = await fs.readFile('./storage/data.json', 'utf8')
    const data = JSON.parse(json)
    res.json(data)
  })
  ```

  Since both the `readFile()` and the `JSON.parse()` can fail in unpredictable ways, we'll wrap them both _and the `res.json()` call_ into a `try`/`catch` block.

  ```ts
  try {
    // the happy path goes here
  } catch (error: any) {
    // Something bad has happened!
    console.log('getting puppies failed', error)
    res.sendStatus(500)
  }
  ```

  Run the test `npm test -- -t 'Listing all puppies'` and you should see a test passing ✅

  And if you visit the browser now, you should be able to see our beautiful pups 😊

  </details>

---

## 2. Displaying a detailed single puppy page

- [ ] As a user, I want to click on a puppy and see their name, breed, and who their owner is.

For this step we will implement a server-side route `GET /api/v1/puppies/:id` to fetch details of a specific puppy. 

  <details style="padding-left: 2em">
    <summary>More about puppy pages</summary>

The frontend is already set up for this, we just need to set up the API route that gets the data of a specific puppy using its unique identifier (id). So our API route needs to include the `/:id` parameter (more on this soon!).

For example: `GET /api/v1/puppies/1` will get a document that looks like this:

```json
{
  "id": 1,
  "name": "Fido",
  "owner": "Fred",
  "image": "/images/puppy1.jpg",
  "breed": "Labrador"
}
```

You can run the tests for this functionality with: `npm test -- -t 'Reading a specific puppy'`

You should see that test is failing ❌, next we'll write the code to make this test pass.

**Writing functions:** 

In this file `/store.ts` we will write all the functions that affect our puppy data. We can export these functions, and import them into our puppies routes when we need them. 

In `store.ts` write a function that gets an array of **_all the puppies_** and then returns one with a matching ID if it
exists or undefined otherwise. You can probably re-use the code we used to get all the puppies previously (in the puppies.ts routes file). 

For the `getPuppyById` function, you can start with something like this:

```ts
import type { Puppy } from '../models/Puppy.ts'

async function getPuppyById(id: number): Promise<Puppy | undefined> {
 ...
}
```

You can either loop through the puppies or use [`array.find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

**_Top tip!_** - use the code you wrote in the 'get all puppies' route and make a new function in `store.ts` called 'getAllPuppies', this is helpful because you can re-use that function later. 

**Next**, add a new route handler in [`puppies.ts`](./server/routes/puppies.ts) which uses a route param:

```js
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
})
```

Using the `:` in route pattern like that means that `:id` is a path parameter, e.g. it will match `/api/v1/puppies/1` and req.params will look like this: `{ id: '1' }`

Use that `id` variable to call `getPuppyById`. If it resolves with a Puppy you can call `res.json(puppy)` but
if the it doesn't find one (i.e. `puppy` is `undefined`), the we should `res.sendStatus(404)` the HTTP Status code for [Not Found](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404).

If everything went well, then the tests under "Reading a specific puppy" should be passing now

Hit `http://localhost:5173/api/v1/puppies/1` in Thunderclient (or your other favourite Rest API Client) and confirm that it's showing what you expect.

Visit the page at `http://localhost:5173/1` to confirm that the individual puppy view is working.

  </details>


---

## 3. Deleting a single puppy

- [ ] As a user, I want to delete a puppy from our website when someone adopts them (awwww cute!) 

For this step we will implement a server-side route `DELETE /api/v1/puppies/:id` to delete a specific puppy. 

  <details style="padding-left: 2em">
    <summary>More about deleting a pup</summary>

We should already have a red test under 'deleting puppies', so now let's make it green.

To delete a puppy, we need a new route at `DELETE /api/v1/puppies/:id`

First, we'll take care of the data-handling side of it.

```ts
import type { PuppyData } from '../models/Puppy.ts'

async function deletePuppy(id: number): Promise<void> {
  ...
}
```

In this function:

1. call `getPuppies()` to get the list of puppies. 
1. Make a filtered copy of that puppies array and return all the puppies except for the one you want to delete.
1. Write the filtered array to a file in the `storage` folder (with `fs.writeFile`). We will call this file `data.json`. You don't have to explicitly create this file, the `fs.writeFile` function will do it for you as long as the path is correct.  

Next, add a new route handler in [`puppies.ts`](./server/routes/puppies.ts) which uses the id as a route param, and calls the `deletePuppy` function.

If everything went well, then the tests under "Delete a specific puppy" should be passing now!

Hit `DEL` `http://localhost:5173/api/v1/puppies/1` in Thunderclient (or your other favourite Rest API Client) and confirm that it's showing what you expect.

Visit the page at `http://localhost:5173/1` to confirm that the individual puppy view is working and when you click the delete button that the user is redirected back to the home page, with all the puppies showing EXCEPT for the one that was deleted.

In your code - check the data.json file to confirm that the puppy was deleted.

</details>

--- 

## 4. Adding a new puppy

- [ ] As a user, I want to add a new puppy when I go to the client side route `http://localhost:5173/new-puppy`.

<details style="padding-left: 2em">
    <summary>More about new-pups:</summary>

- Right now the form is empty and doesn't do anything when a user submits it. 
- First, we'll take care of the data-handling function for adding a new Puppy in `store.ts`: 

```ts
import type { PuppyData } from '../models/Puppy.ts'

async function addPuppy(data: PuppyData): Promise<void> {
  ...
}
```

In this function:

1. call `getPuppies()` to get the list of puppies, make a copy of this array in a new variable. 
1. Find a way to create a new id for the new puppy. What array methods could you use to find the next expected id number?
1. Add the new puppy (with fancy new id) to the puppies array copy. 
1. Write the entire array copy (with new pup) to `data.json` (with `fs.writeFile`).
1. Once that fs operation is complete, return the id of your new puppy. 

- Next we'll add a server side POST route in [puppies.ts](./server/routes/puppies.ts):
- use res.json() to return the id
- Check the POST method for `http://localhost:5173/api/v1/puppies/` in Thunderclient and confirm that it's showing what you expect when you give it the right JSON content as a BODY. 


```ts
router.post('/', async (req, res) => {
  try {
    // some code that calls the addPuppy function. 
    const id = await addPuppy(req.body)
    // respond with your new puppy id
    res.json({id})
  } catch (error) {
    // If things go wrong in the try block, the catch block should log an error and respond with a server error status code. 
    // For example: 
    console.error(error)
    res.sendStatus(500) 
  }
})
```

- Load the website up in your browser and add a puppy, observe how it re-directs to the home page, and the check your code to see if it made changes in `data.json` and how the changes persist even if you stop and restart the server.

- The last of your tests should be passing now.

- You can now submit your branch for the CP07 and WD01 Trello tickets! 🎉

</details>


---

## 5. Stretch: Updating a puppy

- [ ] As a user, I want to be able to update the puppy's name, breed, and owner

For this step you will implement a route `PATCH /api/v1/puppies/:id` to update a puppy's details. 
You will need to create a new frontend component to allow users to edit and update a puppy's details.

<details style="padding-left: 2em">
    <summary>More about pupdates</summary>

Visit `http://localhost:5173/2/edit` to see the edit form. This is already hooked up to our API to load the values.

We should already have a red test under 'editing puppies', so now let's make it green.

To save the updated puppy values, we need a new route at `PATCH /api/v1/puppies/:id`

  First, we'll take care of the data-handling side of it.
  Write a new function in the `store.ts` file: 

```ts
import type { PuppyData } from '../models/Puppy.ts'

async function updatePuppy(id: number, data: PuppyData): Promise<void> {
  ...
}
```

In this function:

1. call `getPuppies()` to get the list of puppies
1. locate a puppy with the matching ID
1. update or replace that puppy in the array
1. Write the entire data object to a file in the `data.json` (with `fs.writeFile`).

Now we'll add a route in [puppies.ts](./server/routes/puppies.ts):

```ts
router.patch('/:id', async (req, res) => {
  try {
    // get the id from the url params 
    // pass this id and the req.body to the updatePuppy function  
    // respond with an appropriate status code, eg 204
  } catch (error) {
    // log the errors 
    // respond with an appropriate status code 
  }
})
```

Load the website up in chrome and edit a puppy, observe how it makes changes in `data.json` and how the changes persist even if you stop and restart the server.

  </details>


---

## 5. Stretch: Adding a new animal

- [ ] As a user, I want to add a new animal.

For this step, challenge yourself to add a new animal. Maybe you want to display cats? Or iguanas? Or maybe a collection of stick insects? Think about how the user experience and how you can update the app to accommodate different animals.



## Submitting this challenge for marking

<details>
  <summary>How to submit this challenge</summary>

This challenge can be used for the following assessments:

- CP07 - Filesystem: Use filesystem methods to access and save data in a file 
- WD01: Build an HTTP server with a restful JSON API

 ## E2E tests 
This challenge ships with some end-to-end tests written in playwright, if you are submitting this
challenge to complete an NZQA requirement, please make sure these tests are passing _before_ you submit.

## Read this short guide on [how to run them](./doc/end-to-end-testing.md).

[Provide feedback on this repo](https://docs.google.com/forms/d/e/1FAIpQLSfw4FGdWkLwMLlUaNQ8FtP2CTJdGDUv6Xoxrh19zIrJSkvT4Q/viewform?usp=pp_url&entry.1958421517=pupparazzi)
