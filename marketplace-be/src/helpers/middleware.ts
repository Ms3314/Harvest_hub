import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
import { ErrorRequestHandler, NextFunction } from "express";
const prisma = new PrismaClient();

// Middleware for token authentication
export const authenticateToken = async (req:any, res:any, next:any) => {
  console.log("authentication token is being run")
    try {
      // Step 1: Get the token from the Authorization header
      const {token} = req.body ;
  
      if (!token) {
        return res.status(401).json({ message: 'Access token is missing' });
      }
      
            try {
                if (!token) {
                    throw new Error("Token is missing");
                }
                // @ts-expect-error
                const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify token integrity
                // Step 3: Optionally validate the user in the database
                // @ts-expect-error-decoded main dalna
                const email = decoded?.email; // Assuming the JWT payload includes `email`
                const result = await prisma.user.findUnique(email)
                req.user = {
                    id: result?.id,
                    username: result?.email,
                  };
            } catch (error) { 
                throw new Error("Invalid JWT token")
            } 
          
          next();
    } catch (err) {
        // @ts-expect-error
      console.error('Authentication error:', err.message);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };