import { useState } from 'react'
import axiosInstance from '../api/axiosInstance';

const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLogin = async () => {
        try {
            const res = await axiosInstance.post(`/auth/login`, {
                email: form.email,
                password: form.password,
            });
            if (res.status === 200) {
                localStorage.setItem('user', JSON.stringify(res?.data?.user));
                window.location.href = '/shop';
            };
        } catch (err: any) {
            console.error(err?.response?.data?.err);
        }
    };
    return (
        <>
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 text-black">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input onChange={(e) => handleChange('email', e.target.value)} value={form.email} id="email" name="email" type="email" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="you@example.com" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input onChange={(e) => handleChange('password', e.target.value)} value={form.password} id="password" name="password" type="password" required minLength={6} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="At least 6 characters" />
                        </div>
                        <button onClick={handleLogin} className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Login</button>
                    </div>

                    <p className="text-center text-sm mt-4">
                        Don't have an account? <a href="/auth/sign-up" className="text-blue-600 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login