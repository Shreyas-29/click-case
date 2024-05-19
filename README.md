<img src="https://clickcase.vercel.app/logo.png" alt="Logo" width="60px"> 
 
# Click-Case
 
Click-Case is a cutting-edge e-commerce platform for custom phone cases. This project allows users to select, customize, and order phone cases online, providing a seamless and personalized shopping experience.

## Features

- **Customizable Phone Cases**: Users can choose from various models, materials, finishes, and colors to create their perfect phone case.
- **User Authentication**: Secure user registration and login system.
- **Order Management**: Comprehensive order tracking and management system.
- **Admin Dashboard**: Admins can view and manage orders, track revenue, and update order statuses.
- **Responsive Design**: Fully responsive design ensures a seamless experience on all devices.
- **Payment Integration**: Secure and reliable payment processing.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API, Prisma
- **Database**: MongoDB
- **Authentication**: Kinde-OSS
- **PDF Generation**: pdf-lib
- **Deployment**: Vercel
- **Image Uploads**: Uploadthing

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Shreyas-29/click-case.git
    cd click-case
    ```

2. **Install dependencies:**

    Using npm:
    ```bash
    npm install
    ```

    Or using yarn:
    ```bash
    yarn install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variables:
    ```env
    KINDE_CLIENT_ID=
    KINDE_CLIENT_SECRET=
    KINDE_ISSUER_URL=
    KINDE_SITE_URL=http://localhost:3000
    KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
    KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/auth-callback
    DATABASE_URL=
    NEXT_PUBLIC_SERVER_URL=http://localhost:3000
    ADMIN_EMAIL=youremail@mail.com
    UPLOADTHING_SECRET=
    UPLOADTHING_APP_ID=
    STRIPE_SECRET_KEY=
    STRIPE_WEBHOOK_SECRET=
    RESEND_API_KEY=
    ```

4. **Set up the database:**

    ```bash
    npx prisma init
    ```

5. **Start the development server:**

    Using npm:
    ```bash
    npm run dev
    ```

    Or using yarn:
    ```bash
    yarn dev
    ```

    The server will start on `http://localhost:3000`.

### Running Tests

To run tests, use the following command:

```bash
npm run test
```

Or using yarn:
```bash
yarn test
```

### Deployment
To deploy the project, follow these steps:
1. **Build the project:**
    Using npm:
    ```bash
    npm run build
    ```

    Or using yarn:
    ```bash
    yarn build
    ```
2. **Deploy to Vercel:**
    Connect your GitHub repository to Vercel and deploy. Make sure to set the environment variables in the vercel dashboard.

### Contributing
I welcome contributions to improve Click-Case. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch: git checkout -b feature-name
3. Make your changes and commit them: git commit -m 'Add feature'
4. Push to the branch: git push origin feature-name
5. Create a pull request.


### License
This project is licensed under the MIT License. See the LICENSE file for more details.


### Acknowledgments
- Next.js
- Tailwind CSS
- Prisma
- MongoDB
- pdf-lib
- Shadcn UI
- Uploadthing
- Framer Motion
- Resend
- Stripe
- Zod

