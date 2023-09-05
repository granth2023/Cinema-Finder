import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

export function authenticate(req: NextApiRequest) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (e) {
        console.error('JWT verification error:', e);
        return null;
    }
}

