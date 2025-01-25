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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Middleware for token authentication
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("authentication token is being run");
    try {
        // Step 1: Get the token from the Authorization header
        const { token } = req.body;
        if (!token) {
            return res.status(401).json({ message: 'Access token is missing' });
        }
        try {
            if (!token) {
                throw new Error("Token is missing");
            }
            // @ts-expect-error
            const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY); // Verify token integrity
            // Step 3: Optionally validate the user in the database
            // @ts-expect-error-decoded main dalna
            const email = decoded === null || decoded === void 0 ? void 0 : decoded.email; // Assuming the JWT payload includes `email`
            const result = yield prisma.user.findUnique(email);
            req.user = {
                id: result === null || result === void 0 ? void 0 : result.id,
                username: result === null || result === void 0 ? void 0 : result.email,
            };
        }
        catch (error) {
            throw new Error("Invalid JWT token");
        }
        next();
    }
    catch (err) {
        // @ts-expect-error
        console.error('Authentication error:', err.message);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
});
exports.authenticateToken = authenticateToken;
