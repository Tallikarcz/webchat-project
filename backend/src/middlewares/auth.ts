import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate (req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).userId = (decoded as any).id;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" });
    }
}