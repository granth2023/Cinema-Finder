import { useState } from 'react';
import axios from 'axios';

export default function SignupPage(){
    const [formData, setFormData] = useState({ email: '', name: '', password: '', });
    const [error, setError] = useState<string | null>(null);

    const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

};

const handleSumbit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    try { 
        const response = await axios.post('/api/auth/signup', formData);
    }