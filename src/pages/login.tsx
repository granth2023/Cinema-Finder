import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import  Link  from 'next/link';
import { useRouter } from 'next/router';
type FormData = {
    email: string;
    password: string;
}

type ResponseData = {
  error?: string;
};

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const response = await axios.post('/api/auth/login', formData);
        console.log('Login response:', response.data);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isLoggedIn', 'true');

        const userId = response.data?.userId;
        if (userId) {
            localStorage.setItem('userId', userId.toString());
        } else {
            console.error('User ID not found in response');
        }

        if (!router.isBusy) {
            console.log('Redirecting to home...');
            await router.push('/');
            console.log('Redirected');
        } else {
            console.log('Router is busy');
        }
    } catch (err) {
        const errorResponse = (err as AxiosError<ResponseData>).response;
        setError(errorResponse?.data?.error || "An error occurred during login.");
        console.error('Login error:', err);
    }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleInputChange} />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleInputChange} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Log In
            </button>
          </div>
        </form>
        <div className="mt-6">
          <p className="text-center">
            Not a user? <Link href="/signup" className="text-indigo-600 hover:text-indigo-500">Sign up here</Link>
          </p>
        </div>
      </div>
    </div>
  );
  }