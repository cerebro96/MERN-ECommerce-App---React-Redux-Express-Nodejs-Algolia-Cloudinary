# MERN - ECommerce - App - (React-Redux-Express-Nodejs-Algolia-Cloudinary)

<!-- blockquote -->

> built during the course, by **_Brad Traversy_** [MERN eCommerce From Scratch]
> (https://www.udemy.com/course/mern-ecommerce/)

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
- User profile with orders
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## .env File Structure

- NODE_ENV = Development
- PORT = 5000
- MONGO_URI = xxxxxxxxxxxxxxxxxxxxxxx
- JWT_SECRET = 123456
- PAYPAL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxx
- ALGOLIA_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxx
- ALGOLIA_API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
- ALGOLIA_INDEX_ID=xxxxxxxxxxxxxxxxxxxxxxx
- ALGOLIA_WEB_API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
- ALGOLIA_PRICE_DESC=xxxxxxxxxxxxxxxxxxxxxxx
- ALGOLIA_PRICE_ASC=xxxxxxxxxxxxxxxxxxxxxxx
- ALGOLIA_QUERY_SUGGESTIONS=xxxxxxxxxxxxxxxxxxxxxxx
- CLOUDINARY_NAME=xxxxxxxxxxxxxxxxxxxxxxx
- CLOUDINARY_API_KEY=xxxxxxxxxxxxxxxxxxxxxxx
- CLOUDINARY_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxx
- CLOUDINARY_FOLDER=xxxxxxxxxxxxxxxxxxxxxxx
