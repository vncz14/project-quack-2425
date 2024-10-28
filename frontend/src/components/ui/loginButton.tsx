'use client';

import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { Button } from "@/components/ui/button";

type UserData = {
  email: string;
  name: string;
};

export default function LoginLogoutButton() {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Token response:', tokenResponse);

      try {
        // Send the access token to the server for verification
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });

        const data = await res.json();

        if (data.success) {
          // Store user data and reset error
          setUser({ email: data.email, name: data.name });
          setError(null);
          console.log('Login successful:', data);
        } else {
          setError(data.message || 'Login failed, please try again.');
          setUser(null); // Clear any previous user data
        }
      } catch (err) {
        console.error('Error during login:', err);
        setError('Something went wrong.');
      }
    },
    onError: (error) => {
      setError('Login failed, please try again.');
      console.error('Error during login:', error);
    },
  });

  return (
    <div>
      {user ? (
        <div>
          <Button onClick={() => setUser(null)}>Logout</Button>
          <p>Welcome, {user.name} ({user.email})!</p>
        </div>
      ) : (
        <Button onClick={() => login()}>Log in with Google</Button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
