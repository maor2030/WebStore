
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const Customer = require("./Model/Schemas/Customer")
const Product = require("./Model/Schemas/Product")
mongoose.set('strictQuery', false);
var path = require('path');


mongoose.connect("mongodb://127.0.0.1:27017")


    const customerRouter = require('./Routes/customers')
    const productRouter = require('./Routes/products')
    const storeRouter = require('./Routes/store')
    const productPageRouter = require('./Routes/prPage')
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname+'/View')))
    app.use('/customers',customerRouter);
    app.use('/products',productRouter);
    app.use('/store',storeRouter);
    app.use('/prPage',productPageRouter);
    
    app.listen(3000)

run()


async function run(){

    const customer = new Customer({Name:"Alon",lastName:"Michaeli",address:"MM",moneySpent:10.0,wishList:["Hello"],shoppingCart:["Hello"],orders:["Hello"],email:"111@gmail.com",password:"1234",creditCards:["Hello"]})
    const customer2 = new Customer({Name:"Ido",lastName: "Shimon",address: "George IV",moneySpent: 1004.4,wishList: ["HogLegacy"],shoppingCart: ["Aleph"],orders:["An Order"],email:"idodi5@gmail.com",password:"213123",creditcards:["334234","43223"]})
    let Products=[];
    for(let i=0;i<30;i++){
      Products.push(new Product({Title:i,Rating:4,Pictures:"data:image/jpeg;base64,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"}))
      Products[i].save();
    }
    
   /*
    await customer.save().then(()=> console.log("Saved Alon"));
    await customer2.save().then(()=>console.log("Saved Ido"))
  */

    console.log(await Customer.count())
    console.log(await Product.count())
    
}


