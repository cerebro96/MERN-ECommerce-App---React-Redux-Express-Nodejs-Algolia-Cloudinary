# MERN - ECommerce - App - (React-Redux-Express-Nodejs-Algolia-Cloudinary)

<!-- blockquote -->

> built during the course, by **_Brad Traversy_** [MERN eCommerce From Scratch]
> (https://www.udemy.com/course/mern-ecommerce/)

[Main Repo By Brad Traversy](https://github.com/bradtraversy/proshop_mern)

![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/screenshot_home.PNG?raw=true)

## Features

- Full featured shopping cart
  - Shopping cart number animation
  - Product add successfull meaasage Modal
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/screenshotModal_productADD.PNG?raw=true)
- Product reviews and ratings
- Top products carousel
- Product pagination
  - Dynamic pagination (Page Size can be change according to the your page requirment)
- Product search feature with Algolia Advanced Search
  - Home Screen Search
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/search_home.png?raw=true)
  - Advanced Search Capabilities
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/search_algo_exam_1.png?raw=true)
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/search_algo_exam_2.png?raw=true)
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/search_algo_exam_3.png?raw=true)
- Product Admin
  - Product image Upload
    - intergrate with Cloudinary cloud-based image and video management service
  - Seperate pages for product update and create
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/productupdate.PNG?raw=true)
- User profile with orders
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Env Variables

Create a .env file in then root and add the following

```bash
NODE_ENV = Development
PORT = 5000
MONGO_URI = xxxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET = 123456
PAYPAL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_INDEX_ID=xxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_WEB_API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_PRICE_DESC=xxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_PRICE_ASC=xxxxxxxxxxxxxxxxxxxxxxx
ALGOLIA_QUERY_SUGGESTIONS=xxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_NAME=xxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxx
CLOUDINARY_FOLDER=xxxxxxxxxxxxxxxxxxxxxxx
```

## Algolia Setup

- You need free account in alogolia [Algolia](https://www.algolia.com/)
  ![API Secrets](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/algolia_api.png?raw=true)
- Create Indice and replace .env **_ALGOLIA_INDEX_ID_** using that name
  ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/algolia_main_indice.PNG?raw=true)
- Main Indice Configuration
  ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/conf1.PNG?raw=true)
  ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/conf2.PNG?raw=true)
- ALGOLIA_PRICE_DESC && ALGOLIA_PRICE_ASC for sorting
  ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/conf4.png?raw=true)
  - Create two replicas for search sorting
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/conf3.PNG?raw=true)
    - add sorting and ranking attribute to the replica
      ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/conf5.PNG?raw=true)
- ALGOLIA_QUERY_SUGGESTIONS for website home search bar
  - add query suggesion and Source indices settings as your main indices
  - but you need to add manual record to the query suggestion indices because this categories, I plan to add using front end.
    ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/conf6.PNG?raw=true)

## Cloudinary Setup

- Create account [Create](https://cloudinary.com/)
  ![](https://github.com/cerebro96/MERN-ECommerce-App---React-Redux-Express-Nodejs-Algolia-Cloudinary/blob/master/uploads/conf7.PNG?raw=true)
- In media library create folder called **_images_**
  - CLOUDINARY_FOLDER = **images** in .env
- Settings -> upload -> Add new upload preset

## Install Dependencies (frontend & backend)

```bash
npm install
cd frontend
npm install
```

## Run

```bash
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```bash
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```bash
Sample User Logins

admin@example.com (Admin)
123456

john@example.com (Customer)
123456

jane@example.com (Customer)
123456
```
