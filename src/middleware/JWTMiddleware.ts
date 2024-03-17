import { Request, Response, NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class JWTMiddleware {
    private static JWT_SECRET = process.env.JWT_SECRET;

    private blacklist: string[] = [];

    public static async VerifyToken(req: Request, res: Response, next: NextFunction) {
        const headers = req.headers as IncomingHttpHeaders;
        const authHeader = headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const token = authHeader.split(' ')[1];

        if (!JWTMiddleware.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT secret not configured' });
        }
        try {
            jwt.verify(token, JWTMiddleware.JWT_SECRET);
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    public static async VerifyTokenTry(req: Request, res: Response, next: NextFunction) {
        next();
    }

    public static async GenerateToken(data: any): Promise<string> {
        console.log(JWTMiddleware.JWT_SECRET);

        if (!JWTMiddleware.JWT_SECRET) {
            throw new Error('JWT secret not configured');
        }
        return jwt.sign(data, JWTMiddleware.JWT_SECRET, { expiresIn: '2h' });
    }

    async addToBlacklist(token: string): Promise<void> {
        this.blacklist.push(token);
    }

    async isTokenRevoked(token: string): Promise<boolean> {
        return this.blacklist.includes(token);
    }
}

export default JWTMiddleware;
