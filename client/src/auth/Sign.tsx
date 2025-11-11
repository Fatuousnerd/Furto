import { useState } from "react"
import axiosInstance from "../api/axiosInstance";

const Sign = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errMesg, setErrMrsg] = useState('');

    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    };

    const handleSign = async () => {
        try {
            const res = await axiosInstance.post('/auth/create', {
                username: form.username,
                email: form.email,
                password: form.password,
            });
            if (res.status == 201) return window.location.href = '/auth/login';
        } catch (err: any) {
            console.error('Error...', err?.response?.data?.err);
            setErrMrsg(err?.response?.data?.err);
        }
    };

    return (
        <>
            <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 text-black">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-6 text-center">Create an account</h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Full name</label>
                            <input id="name" onChange={(e) => handleChange('username', e.target.value)} value={form.username} name="name" type="text" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Your name" />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                            <input id="email" onChange={(e) => handleChange('email', e.target.value)} value={form.email} name="email" type="email" required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="you@example.com" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
                            <input id="password" onChange={(e) => handleChange('password', e.target.value)} value={form.password} name="password" type="password" required minLength={6} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="At least 6 characters" />
                        </div>

                        <div>
                            <label htmlFor="confirm" className="block text-sm font-medium mb-1">Confirm password</label>
                            <input id="confirm" name="confirm" type="password" required minLength={6} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Repeat your password" />
                        </div>

                        <button onClick={handleSign} className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">Sign up</button>
                    </div>

                    <p className="text-center text-sm mt-4">
                        Already have an account? <a href="/auth/login" className="text-blue-600 hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Sign