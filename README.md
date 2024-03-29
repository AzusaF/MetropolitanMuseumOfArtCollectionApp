# Metropolitan Museum of Art Collection App

## About
This web application allows you to search collections in the Metropolitan Museum of Art. The app allows you to save your favourite artwork and the history of what you searched. User data is managed in [user-API app](https://github.com/AzusaF/user-api).

## Key Features
- React app implemented in Next.js  
- Used MongoDB database to store the user data and its activity like history and favourite  
- The collection is accessible only when the user is authenticated   
- The history and favourite data are stored using Jotai  
- Password stored as hashed passwords using Bcrypt.js  
- Used Bootstrap to style the app   
- Developed an app deployed on cyclic using RESTful API (CRUD) to manage user data  

## Main Frameworks/Libraries used
- React / Next.js
- Jotai
- JSON Web Tokens (JWT)
- MongoDB
- Bcrypt.js
- React Bootstrap   

## Try the app
https://metropolitan-museum-of-art-collection-app.vercel.app/
| userID | password |
|---|---|
| test_user | test |

https://github.com/AzusaF/MetropolitanMuseumOfArtCollectionApp/assets/95828247/55931107-ea9a-45e8-8d2b-3599e46a9c9a


---


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
