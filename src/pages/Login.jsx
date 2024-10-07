import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/Website/login.png";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();
    
        // Retrieve stored user data from local storage
        const storedUserData = JSON.parse(localStorage.getItem('userData'));
    
        // Simple validation logic
        const isValidLogin =
            storedUserData &&
            storedUserData.username === username &&
            storedUserData.password === password;
    
        if (isValidLogin) {
            console.log('Navigating to /home');
            navigate('/home');
        } else {
            alert("Invalid login credentials");
        }
    };
    

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block'>
                <img className='w-full h-full object-cover' src={LoginImage} alt="" />
            </div>

            <div className='bg-gray-200 flex flex-col justify-center'>
                <form className='max-w-[400px] w-full mx-auto bg-white p-4' onSubmit={handleLogin}>
                    <h2 className='text-5xl font-bold text-center py-4'>Welcome to ReadShelf</h2>
                    <div className='flex flex-col py-2'>
                        <label>Username</label>
                        <input
                            className="border p-2"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col py-2'>
                        <label>Password</label>
                        <input
                            className="border p-2"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='border w-full my-5 px-2 bg-indigo-500 text-white'>
                        Sign In
                    </button>
                    <div className='flex justify-between'>
                        <p className='flex items-center'>
                            <input className='mr-2' type="checkbox" />Remember Me
                        </p>
                        <p className='cursor-pointer text-indigo-500' onClick={() => navigate('/signup')}>
                            Create an Account
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
