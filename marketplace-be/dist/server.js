"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors")); // import ImageDetails from "./ImageDetails.js";
const client_1 = require("@prisma/client");
const middleware_1 = require("./helpers/middleware");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    console.log("hello world");
    res.status(200).json("hello");
});
// this is the route for register
app.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { farmname, email, password, location, } = req.body;
    // Validate inputs
    if (!password || typeof password !== "string") {
        return res.status(400).json({
            success: false,
            message: "Password is required and must be a valid string",
        });
    }
    const hashedPassword = bcryptjs_1.default.hashSync(password, 8);
    try {
        const data = yield prisma.user.create({
            data: {
                farmname,
                email,
                password: hashedPassword,
                location,
            },
        });
        if (!data) {
            res.status(402).json({
                success: false,
                message: "Error while creating account"
            });
        }
        res.status(201).json({
            success: true,
            message: "Your account has beem created , login to access the website",
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user: " + error.message,
        });
    }
}));
app.use("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userfound = yield prisma.user.findFirst({
        where: {
            email
        }
    });
    if (!userfound) {
        res.status(404).json({
            success: false,
            message: "The User is not found"
        });
    }
    try {
        // @ts-expect-error
        bcryptjs_1.default.compare(password, userfound === null || userfound === void 0 ? void 0 : userfound.password, function (err, response) {
            // res === true
            if (response == true) {
                const token = jsonwebtoken_1.default.sign({
                    email: email
                }, 'secretkey', { expiresIn: '1h' });
                res.status(200).json({
                    success: true,
                    message: "authorization successfull ",
                    token,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "invalid credentials"
                });
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message,
        });
    }
}));
app.post("/api/v1/marketplace/product", middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("djkshfkjsgfkjdsgfk");
    // @ts-expect-error=><>
    const { id, username } = req.user; // ye hai clien ka id aur username 
    const { name, min_order, Image, price } = req.body;
    try {
        yield prisma.product.create({
            data: {
                name,
                min_order,
                price,
                Image, // Add the 'Image' property
                seller: id // Add the 'seller' property
            }
        });
        res.status(200).json({
            success: true,
            message: "the item has been added successfully "
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occured" + error.message
        });
    }
}));
app.get("/api/v1/marketplace/product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.product.findMany();
        res.status(200).json({
            success: true,
            message: "the data is here ",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "an error occured" + error.message
        });
    }
}));
app.delete("/api/v1/marketplace/product", middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productid } = req.body;
    try {
        const data = yield prisma.product.delete({
            where: {
                id: productid
            }
        });
        if (!data) {
            res.status(404).json({
                success: false,
                message: "an error deleting the product"
            });
        }
        res.status(200).json({
            success: true,
            message: "the updated data is her ",
            data,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error" + error.message
        });
    }
}));
app.patch("/api/v1/marketplace/product", middleware_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, min_order, Image, sellerid, price, price_text, productid } = req.body;
    try {
        const data = yield prisma.product.update({
            where: {
                id: productid
            },
            data: {
                name,
                min_order,
                sellerid,
                price,
                price_text,
                Image, // Add the 'Image' property
                seller: sellerid // Add the 'seller' property
            }
        });
        if (!data) {
            res.status(404).json({
                success: false,
                message: "Error while updating the data"
            });
        }
        res.status(200).json({
            success: true,
            message: "The data has been updated succesfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error" + error.message
        });
    }
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
