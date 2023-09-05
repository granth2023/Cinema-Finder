import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    const { email, name, password } = req.body;

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10); // changed from 'password' to 'hashedPassword'

    try {
        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: hashedPassword, // use 'password'
            }
        });
        
        // For this example, I'm not returning the hashed password
        // Modify as needed for your use-case
        delete (user as any).password; // changed from 'hashedPassword' to 'password'

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'An error occurred while processing your request.' });
    }
}
