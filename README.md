# To Do App

A simple to do app where user can add their tasks,mark them completed and can delete the tasks as well.
This project is build on ⚡Next JS,uses 💫mongoDB as backend and houses ⭐TailwindCSS + Material UI.

## API Reference

#### Login

```http
  POST /api/auth/login
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `email `   | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Register

```http
  POST /api/auth/register
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `name`     | `string` | **Required**. |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Tasks

```http
  GET /api/me/tasks
```

To get the tasks of the current user.

| Headers         | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `Authorization` | ` Bearer Token` | **Required**. |

```http
  POST /api/me/tasks
```

To post the task by the user.
| Headers | Type | Description |
| :-------- | :------- | :-------------------------------- |
| `Authorization` | ` Bearer Token` | **Required**. |

| Body        | Type     | Description   |
| :---------- | :------- | :------------ |
| `text`      | `string` | **Required**. |
| `tag`       | `string` | **Required**. |
| `dueDate`   | `string` | **Required**. |
| `createdAt` | `string` | **Required**. |

```http
  DELETE /api/me/tasks/{id}
```

To delete the task by the user.

| Headers         | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `Authorization` | ` Bearer Token` | **Required**. |

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

```http
  PUT /api/me/tasks/{id}
```

To mark the task completed.

| Headers         | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `Authorization` | ` Bearer Token` | **Required**. |

| Parameter | Type     | Description   |
| :-------- | :------- | :------------ |
| `id`      | `string` | **Required**. |

| Body          | Type      | Description   |
| :------------ | :-------- | :------------ |
| `isCompleted` | `boolean` | **Required**. |

#### Tags

```http
  GET /api/me/tags
```

To get the tags of the user.

| Headers         | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `Authorization` | ` Bearer Token` | **Required**. |

```http
  POST /api/me/tags
```

To post the tags by the user.

| Headers         | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `Authorization` | ` Bearer Token` | **Required**. |

| Body  | Type     | Description   |
| :---- | :------- | :------------ |
| `tag` | `string` | **Required**. |

#### For Admin use **Only**

```http
  GET /api/me
```

To get all the tasks of the users.

| Headers         | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `Authorization` | ` Bearer Token` | **Required**. |

```http
  GET /api/me/task?from={fromDate}&to={toDate}
```

To get all the tasks of the users between the fromDate and toDate.

| Headers         | Type            | Description   |
| :-------------- | :-------------- | :------------ |
| `Authorization` | ` Bearer Token` | **Required**. |

| Parameter  | Type     | Description                |
| :--------- | :------- | :------------------------- |
| `fromDate` | `string` | **Required**.A date string |
| `toDate`   | `string` | **Required**.A date string |

## Authors

- [@rohanb202](https://github.com/rohanb202)

## Tech Stack

**Client:** Next JS, Recoil, TailwindCSS,Material UI

**Server:** Next JS built-in API routing system

## Installation

```bash
npm install

```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
