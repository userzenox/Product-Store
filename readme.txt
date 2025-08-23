
< Set-UP >

First create frontend and backend folder .

then in terminal write npm init -y - to create a package.json file  -- it will be used while deploying our application

without cd into backend 
in the root dirctory install differnt packages
 cmd - npm i express dotenv cors helmet morgan @neondatab
ase/serverless @arcjet/node 


create folder in backend that is server.js
and in package.json change the main from index.js to backend/server.js


then in package.json - in the scripts add "dev" : "node backend/server.js"  so that it will run on npm run dev


-- for differnt get request we make differnet files to avoid overcrowding 

  like when you are building a ecommerce website then their are so many routes like products , buy ,sell ,  add to cart etc  so for each we make a different files.



 <create route in different page >
    create a folder routes which contains different routing areas

 first define and import the routes.
    import productRoutes from "./routes/productRoutes.js"

  call the specific routes file :-
    app.use("/api/products" , productRoutes)
    
  defining - import express from "express";
             const router = express.Router();
             export default router;  

but even in each specipic routes we need to do get ,post delete .. requests.
like in productRoute - we need to get all products , create or delete a products , -

so we create another folder controllers - and do the same as routes



<Database>

we are using Postgre SQL as our database and it is provided by "neon" 



<Security >
 - for Security we use ARCJET 


 get various online images: unsplash 
     : \https://unsplash.com/s/photos/earbuds 