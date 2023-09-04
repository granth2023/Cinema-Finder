import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

function authenticate(req: NextApiRequest) {
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

// Example of how to use the middleware inside an API endpoint:
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const userData = authenticate(req);
    if (!userData) {
        return res.status(403).json({ error: 'Not authenticated' });
    }

    // Continue with the logic for authenticated users...
    // ... 
}
