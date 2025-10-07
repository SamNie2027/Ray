import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // POST /auth/login
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.status === 404) throw new Error('Invalid credentials');
      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('Login error:', err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // POST /users
  const signUp = async (email, password, name, username) => {
    setLoading(true);
    try {
      const res = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, username }),
      });

      if (!res.ok) throw new Error('Registration failed');
      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error('Sign up error:', err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside an AuthProvider');
  return ctx;
};
