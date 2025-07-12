import React, { useState } from 'react'

const LoginForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-4'>
            <input type="email" placeholder='Email' className='w-full border px-3 py-2 rounded-xl' value={email} onChange={(e)=> setEmail(e.target.value)} required />
            <input type="password" placeholder='Password' className='w-full border px-3 py-2 rounded-xl' value={password} onChange={(e)=> setPassword(e.target.value)} required />
            <button type="submit" className='w-full bg-green-700 text-white py-2 rounded-xl hover:bg-lime-700'>Login</button>
        </form>
    )
}

export default LoginForm
