# Simple E-commerce Website with Admin Dashboard, Product Display Page and Order Page

This is a simple E-commerce website that includes an admin dashboard for managing products and displaying orders. The website is built using NextJS for the frontend, while Supabase is used as the backend and API.

## Tech Stack

**Front-end:** Nextjs

**Back-end:** Supabase

## Features

- Admin Dashboard Page

Add Products

This section enables the admin to manage products by adding new product.

    • On the product page, the admin can input data in the following fields:
        ◦ Product name
        ◦ Product description
        ◦ Main Image
        ◦ 4 Product sub images
        ◦ Price (the original price)
        ◦ Promotional Price
    • After inputting the data, the admin can then save the product or cancel it.

View List of Products

    • This page simply displays the product list in a table format, showing the product name, description, main thumbnail image, 4 sub images, price, and promotional price.

Display Orders

This pages shows a table of all orders made on the order page. It lists:

    • Customer Name
    • Customer Number
    • Customer Email
    • Payment Address
    • Order ID

- Product Page

The product display page is where shoppers can view all the products available for purchase. The page lists the following details for each product:

    • Product name
    • Product description
    • Main thumbnail image
    • Original price
    • Promotional price (if product is currently on promotion)

- Order Page

Shoppers can click on the checkout button on the cart on product page to start the checkout process, which begins with a form that collects the following customer information:

    • Name
    • Phone Number (validated)
    • Email Address (validated)
    • Address

## Run Locally

Clone the project

```bash
  git clone https://github.com/dangluan343/Shecom-test.git
```

Go to the project directory

```bash
  cd Shecom-test
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_SUPABASE_URL`

`NEXT_PUBLIC_SUPABASE_ANON_KEY`

`NEXT_PUBLIC_SUPABASE_PRODUCTS_BUCKET_URL`

## Demo

https://shecom-test-9bt8cpak7-luandangluandang-hcmuteduvn.vercel.app/

## Deployment

To deploy this project run this command in the CLI

```bash
  vercel
```

If you haven't installed vercel yet. Install the Vercel CLI by running

```bash
  npm install -g vercel
```

## Documentation

[Nextjs](https://nextjs.org/docs)

[Supabase](https://supabase.com/docs)

## Support

For support, email dangluan15112001@gmail.com
