import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST'){ 
        return res.status(405).end();
}

const { email, password } = req.body;

const user = await prisma.user.findUnique({ where: { email } });

if (!user) { 
    return res.status(400).json({ error: 'Invalid email or password' });
}

const valid = await bcrypt.compare(password, user.password);

    if(!valid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email},  process.env.JWT_SECRET!, { expiresIn: "1h" });

    res.status(200).json({ token, userId: user.id });
}