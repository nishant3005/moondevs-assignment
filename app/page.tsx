'use client';

import { useState } from 'react';
import { setToken } from '@/redux/auth/auth.slice';
import useAuthSession from '../hooks/useAuthSession';
import { useAppDispatch } from '@/redux/store';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAuthSession();

  console.log(user);

  const handleLogin = async () => {
    try {
      console.log('Login attempt:', { username, password });
      const response = await axios.post('/api/login', { username, password });
      console.log('Login response:', response);
      const { token } = response.data;
      dispatch(setToken(token));
      toast.success('Login successful');
    } catch (error) {
      console.error('Login failed', error);
      toast.error(error.response?.data?.error || 'Login failed');
    }
  };

  const handleSignUp = async () => {
    try {
      console.log('Sign-up attempt:', { username, password });
      const response = await axios.post('/api/signup', { username, password });
      console.log('Sign-up response:', response);
      const { token } = response.data;
      dispatch(setToken(token));
      toast.success('Sign-up successful');
    } catch (error) {
      console.error('Sign-up failed', error);
      toast.error(error.response?.data?.error || 'Sign-up failed');
    }
  };

  // console.log(username);
  // console.log(password);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {user ? (
          <div>
            <h2 className="text-xl font-bold">Welcome, {user.username}</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center">
              {isSigningUp ? 'Sign Up' : 'Login'}
            </h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 mt-4 border rounded-md text-black"
            />
            <button
              onClick={isSigningUp ? handleSignUp : handleLogin}
              className="w-full px-4 py-2 mt-6 font-bold text-white bg-blue-500 rounded-md"
            >
              {isSigningUp ? 'Sign Up' : 'Login'}
            </button>
            <button
              onClick={() => setIsSigningUp(!isSigningUp)}
              className="w-full px-4 py-2 mt-2 font-bold text-blue-500 border rounded-md"
            >
              {isSigningUp ? 'Switch to Login' : 'Switch to Sign Up'}
            </button>
          </div>
        )}
        <div className="mt-6 p-4 border rounded-md text-black bg-gray-50">
          <h3 className="text-lg font-semibold">
            The hook should be usable like this:{' '}
          </h3>
          <pre className="mt-2 p-2 text-gray-500 bg-gray-100 rounded-md">
            <code>
              {`const { user } = useAuthSession();
if (user) {
  console.log('User:', user.username);
}`}
            </code>
          </pre>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default HomePage;
