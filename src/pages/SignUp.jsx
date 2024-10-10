import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginImage from "../assets/Website/login.png"; // Use the same image as Login

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!username || !email || !password || !confirmPassword) {
        setError('All fields are required.');
        return;
    }

    // Password match validation
    if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    // Save user data to local storage
    const userData = { username, password }; // You can also save email if needed
    localStorage.setItem('userData', JSON.stringify(userData));

    // After successful sign-up, navigate to the login page
    navigate('/');
};

    

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={LoginImage} alt="Sign Up" />
            </div>

            <div className='bg-gray-100 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-4' onSubmit={handleSignUp}>
                    <h2 className='text-5xl font-bold text-center py-4'>Create Account</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className='flex flex-col py-2'>
                        <label>Username</label>
                        <input className="border py-2" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Email</label>
                        <input className='border py-2' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input className='border py-2' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Confirm Password</label>
                        <input className='border py-2' type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className='border w-full my-5 px-2 bg-indigo-500 text-white'>Sign Up</button>
                    <div className='flex justify-between'>
                        <p className='flex items-center'>
                            Already have an account? <span className='ml-1 text-indigo-500 cursor-pointer' onClick={() => navigate('/')}>Log In</span>
                        </p>
                    </div>            
                </form>
            </div>
        </div>
    );
};

export default SignUp;
