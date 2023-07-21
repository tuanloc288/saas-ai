# SAAS AI Platform with Next.js 13 App Router: React, Tailwind, Prisma, MySql

![Landing](https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919609/landing_sbiqnh.png)
![Dashboard](https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919608/dashboard_wrsrcl.png)
![Conversation](https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919609/conversationTab_tvezys.png)
![Image](https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919609/imageTab_dk3ruz.png)
![Responsive](https://res.cloudinary.com/dbiliw2ja/image/upload/v1689919609/responsive_fuwpco.png)

This project is a SAAS AI Platform with Next.js 13 App Router: 
    React, Tailwind + Shadcn UI, Prisma + MySQL (PlanetScale), 
    NextJS, Zustand, Clerk, Stripe, Crisp, OpenAI, Replicate AI

Features:

- Tailwind design
- Tailwind animations and effects
- Reusable and customizable components with Shadcn UI 
- Fully responsive design
- Redirect unauthorized users when accessing protected routes
- Google and Facebook authentication using Clerk
- Landing page
- Form validation and handling using react-hook-form + Shadcn components
- Notification using react-hot-toast
- Page loading state
- Conversation, image and code generation using OpenAI
- Music and video generation using Replicate AI
- Free trial with a limited times (default 10)
- Stripe monthly subscription (default 5$)
- Real-time customer support chatbot using Crisp

### Prerequisites

**Node version 14.x**

**NextJS version 13.x**

### Cloning the repository

```shell
git clone https://github.com/tuanloc288/saas-ai.git
```

### Install packages

```shell
npm install
```

### Setup .env file


```js
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

DATABASE_URL=

NEXT_PUBLIC_APP_URL="http://localhost:3000"

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Setup Prisma / MySQL 

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev
```
