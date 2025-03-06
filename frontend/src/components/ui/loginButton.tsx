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
    scope: [
      "openid",
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    onSuccess: async (tokenResponse) => {

      console.log('hello?')
      console.log('Token response:', tokenResponse);

      try {
        // Send the access token to the server for verification
        const res = await fetch('http://localhost:3000/api/auth/google', {
          method: 'POST',
          credentials: 'include',
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
          <Button onClick={(e) => {setUser(null); e.preventDefault()}}>Logout</Button>
          <p>Welcome, {user.name} ({user.email})!</p>
        </div>
      ) : (
        <Button onClick={(e) => {login(); e.preventDefault()}} className='w-full'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Log in with Google
          </Button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
