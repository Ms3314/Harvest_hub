
import express, { Response } from "express";
import cookieParser from "cookie-parser";
// import ImageDetails from "./ImageDetails.js";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./helpers/middleware";

const app = express();
const prisma = new PrismaClient();


app.use(cookieParser());
app.use(express.json());



app.get("/" , (req:any , res:any) => {
    console.log("hello world");

    res.status(200).json("hello") ;
})



// app.get("/api/v1/signin" , (req , res) => {
//     const {password , email } = req.body ;

// })
// app.get("/api/v1/signup")


// for the middle ware we are just gonna use 

app.post("/api/v1/marketplace/product" ,  authenticateToken , async (req , res)=> {
    const {id , username} = req.user  // ye hai clien ka id aur username 
    const {name , min_order , Image , sellerid , price , price_text} = req.body ;
    try {
        await prisma.product.create({
            data : {
                name ,
                min_order ,
                sellerid ,
                price ,
                price_text ,
                Image, // Add the 'Image' property
                seller: sellerid // Add the 'seller' property
            }
        })  
        res.status(200).json({
            success : true ,
            message : "the item has been added successfully "
        })
    } catch (error:any) {
        res.status(500).json({
            success : false ,
            message : "An error occured" + error.message
        })
    }
    

})
app.get("/api/v1/marketplace/product" ,async  (req , res) => {
    try {
        const data = await prisma.product.findMany()
        res.status(200).json({
            success : true  ,
            message : "the data is here " ,
            data, 
        })
    } catch (error : any) {
        res.status(500).json({
            success : false ,
            message : "an error occured" + error.message
        })
    }
})
app.delete("/api/v1/marketplace/product" , authenticateToken , async (req , res) => { 
    const {productid} = req.body ;
    try {
        const data = await prisma.product.delete({
            where : {
                id : productid
            }
        })
        if(!data) {
            res.status(404).json({
                success : false ,
                message : "an error deleting the product"
            })
        }
        res.status(200).json({
            success : true  ,
            message : "the updated data is her " ,
            data, 
        })
    } catch (error:any) {
        res.status(500).json({
            success : false ,
            message : "internal server error" + error.message
        })
    }   
})


app.patch("/api/v1/marketplace/product" , authenticateToken , async (req , res) => {
    const {name , min_order , Image , sellerid , price , price_text , productid} = req.body ;
    
    try {
        const data = await prisma.product.update({
            where : {
                id : productid
            } ,
            data : {
                name ,
                min_order ,
                sellerid ,
                price ,
                price_text ,
                Image, // Add the 'Image' property
                seller: sellerid // Add the 'seller' property
            }
        })  
        if(!data) {
            res.status(404).json({
                success : false ,
                message : "Error while updating the data"
            })
        }

        res.status(200).json({
            success : true ,
            message : "The data has been updated succesfully"
        })
    } catch (error:any) {
        res.status(500).json({
            success : false ,
            message : "Server Error" + error.message
        })
    }
    


})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
