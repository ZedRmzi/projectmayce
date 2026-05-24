import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch (err) {
      const code = err?.code ?? '';
      if (code === 'auth/unauthorized-domain') {
        setError('This domain is not authorised in Firebase. Add it under Authentication → Settings → Authorised domains.');
      } else if (code === 'auth/operation-not-allowed') {
        setError('Email/Password sign-in is not enabled. Enable it in Firebase → Authentication → Sign-in method.');
      } else if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        setError('Incorrect email or password.');
      } else {
        setError(`Login failed: ${code || err?.message || 'unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='font-PassionsConflict text-[2rem] text-[#3B1524]'>Admin Login</h2>
          <button
            onClick={onClose}
            className='text-[#3B1524] text-2xl font-bold leading-none hover:text-[#E82E88] transition-colors'
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col font-Noto'>
          <label className='text-sm text-[#3B1524]'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='admin@example.com'
            required
          />
          <label className='text-sm text-[#3B1524]'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className='text-red-500 text-sm -mt-4 mb-4'>{error}</p>}
          <input
            id='submit'
            type='submit'
            value={loading ? 'Signing in...' : 'Sign In'}
            disabled={loading}
            className='cursor-pointer'
          />
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
