const express = require("express")
const route = express.Router();
const {upload,randomName,fromS3,deleteFromS3, toS3} = require('../Utils/ImageUtils');
const CAR_DB = require("../Schemas/CarsSchema");
const BRAND_DB = require("../Schemas/BrandSchema");
const USERDB = require("../Schemas/userSchema");



route.get("/brands", async function(req,res){
    const data = await BRAND_DB.find();
    for(const single of data ){
            single.logo  = await fromS3(single.logo);
    }
    console.log('inside brands endpoint');
    console.log(data );
    res.json(data);
});

route.get("/brand/:brand", async function(req,res){
    const data = await BRAND_DB.findOne().where("name").equals(req.params.brand);
    data.logo = fromS3(data.logo);
    console.log(`data for ${req.params.brand} is`,data);
    res.json(data);
});

route.get("/cars", async function(req,res){
    const limit = 15;
    const data = await CAR_DB.find().skip(req.query.page * limit ).limit(limit).select('-address -meters -featureDescription -featureIcon');
    const count  = await CAR_DB.count() / limit ;
    for(const info of data){
        info.image = await fromS3(info.image);
    }
    const addCount = {payload:data,count : Math.ceil(count)}
    res.json(addCount);
});

route.get("/cars/:brand", async function(req,res){
    const limit = 15;
    const data = await CAR_DB.find().where("brand").equals(req.params.brand)
    .skip(req.query.page * limit ).limit(limit).select('-address -meters -featureDescription -featureIcon');
    const count  = await CAR_DB.where("brand").equals(req.params.brand).count() / limit ;
    for(const info of data){
        info.image = await fromS3(info.image)
    }
    const addCount  = {payload:data,count:Math.ceil(count)}
    res.json(addCount);
});

route.get("/car/:id", async function(req,res){
    const data = await CAR_DB.findOne({_id:req.params.id});
    logoString = await BRAND_DB.findOne({name:data.brand}).select("logo");
    data.logo = await fromS3(logoString.logo);
    data.image = await fromS3(data.image);
    res.json(data);
});

route.get("/cart", async function(req,res){
    try {
        console.log("this is the request user object");
        if(req.user != null){
            const cartItems = await USERDB.findOne({name:req.user._doc.name}).populate("cart").select("cart");
            for(const info of cartItems.cart){
                info.image = await fromS3(info.image)
            }
            // data.image = await fromS3(data.image);
            console.log("cartItems",cartItems?.cart)
            res.send(cartItems);
            return
        }
        res.send({cart:[]})

    } catch (error) {
        console.log(error);
    }
});

route.post("/cart",  async function(req,res){
    console.log(req.isAuthenticated(),"user is authorised");
    if(req.user != null){
    try{
        console.log(req.body);
        const cartItems = await USERDB.findOne({name:req.user._doc.name}).select("cart");
        const itemExist = await cartItems?.cart?.find(function(anItem){
            console.log("anItem",String(anItem));
           return String(anItem) == req.body.cartItem
        })
        if (itemExist) {
               return res.send(cartItems);
        }else{
            const newCart =  await USERDB.findOneAndUpdate({name:req.user._doc.name},
             {$push:{"cart":req.body.cartItem}},{new:true}).select("cart");
             console.log("this is the result of the new cart",newCart);
            res.send(newCart);
            return
        }
    }catch(error){
     console.log(error);
    }
}else{

    res.send(401);
    return
}
})

route.post("/brand", upload.single("image"), async function(req,res){
    const logoName  = randomName();
    const buffer = req.file.buffer;
    const mimetype = req.file.mimetype;
    if(!buffer){
        console.log("no buffer");
    return res.send("no buffer")
}
    await toS3(logoName,buffer, mimetype);
    await BRAND_DB.create({name:req.body.name ?? "N/A",
                            logo:logoName ?? "N/A"
    });
    res.send('data has been entered')
});

route.post("/car", upload.single("image"), async function(req,res){
    const name  = randomName();
    const buffer = req.file.buffer;
    const mimetype = req.file.mimetype;
    await toS3(name,buffer, mimetype);
    const body = req.body
    await  CAR_DB.create({brand:req.body?.brand,
                     name:body?.name,
                     image:name,
                     year:body?.year,
                     price:body?.price,
                     address:body?.address,
                     meters:body.meters,

                     features:[req.body.features]});


    res.send('data has been entered')
})

route.delete('/car/:carid',async function(req,res){
    // await deleteFromS3(req.body.imageUrl);
    await CAR_DB.deleteOne().where("_id").equals(req.params.carid);
    res.send("car deleted");
})

route.delete('/brand/:brandImage',async function(req,res){
    console.log(req.params.brandImage);
    await deleteFromS3(req.params.brandImage);
    await BRAND_DB.deleteMany().where("name").equals(req.params.brandImage);
    res.send("brand deleted");
})

route.delete('/car/:carImage',async function(req,res){
    console.log(req.params.carImage);
    await deleteFromS3(req.params.carImage);
    await CAR_DB.deleteOne().where("image").equals(req.params.carImage);
    res.send("brand deleted");
})

route.delete("/cart/:id", async function(req,res){
    try{
        console.log("id",req.params.id);
        const newCart =  await USERDB.findOneAndUpdate({name:req.user._doc.name},
         {$pull:{"cart":req.params.id}},{new:true});
        res.send(newCart);
     }catch(error){
         return console.log(error);
     }
})

module.exports = route