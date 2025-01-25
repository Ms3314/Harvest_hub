
import express, { Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors" // import ImageDetails from "./ImageDetails.js";
import { PrismaClient } from "@prisma/client";
import { authenticateToken } from "./helpers/middleware";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const app = express();
const prisma = new PrismaClient();


app.use(cors());
app.use(cookieParser());
app.use(express.json());



app.get("/" , (req:any , res:any) => {
    console.log("hello world");

    res.status(200).json("hello") ;
})

// this is the route for register
app.post("/register", async (req:any, res:any) => {
    const {
        farmname,
        email,
        password,
        location,
        
    } = req.body;

    // Validate inputs
    if (!password || typeof password !== "string") {
        return res.status(400).json({
            success: false,
            message: "Password is required and must be a valid string",
        });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const data = await prisma.user.create({
            data: {
                farmname,
                email,
                password: hashedPassword,
                location,
            },
        });

        if(!data) {
            res.status(402).json({
                success : false ,
                message : "Error while creating account"
            })
        } 
        res.status(201).json({
            success: true,
            message: "Your account has beem created , login to access the website",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Error creating user: " + error.message,
        });
    }
});

app.use("/login"  ,  async (req , res) => {
    const {email , password} = req.body ;
    const userfound = await prisma.user.findFirst({
        where : {
            email
        }
    })

    if(!userfound) {
        res.status(404).json({
            success : false ,
            message : "The User is not found"
        })
    }
    try {
        // @ts-expect-error
        bcrypt.compare(password, userfound?.password , function(err, response) {
            // res === true
            if(response == true ) {
                const token = jwt.sign({
                    email: email
                }, 'secretkey', { expiresIn: '1h' });    
                res.status(200).json({
                    success : true ,
                    message : "authorization successfull " ,
                    token ,
                })
            }
            else {
                res.status(400).json({
                    success : false ,
                    message : "invalid credentials"
                })
            }
        });
    } catch (error:any) {
        res.status(500).json({
            success : false ,
            message : "internal server error",
            error : error.message,
        })
    }   
    
});





app.post("/api/v1/marketplace/product" ,  authenticateToken , async (req , res)=> {
    console.log("djkshfkjsgfkjdsgfk")
    // @ts-expect-error=><>
    const {id , username} = req.user  // ye hai clien ka id aur username 
    const {name , min_order , Image ,  price } = req.body ;
    try {
        await prisma.product.create({
            data : {
                name ,
                min_order ,
                price ,
                Image , // Add the 'Image' property
                seller: id // Add the 'seller' property
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
