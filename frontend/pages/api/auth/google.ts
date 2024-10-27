import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
  email?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Token not provided' });
  }

  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return res.status(400).json({ success: false, message: 'Invalid access token' });
    }

    const userData = await response.json();

    if (userData.email && userData.email.endsWith('@stonybrook.edu')) {
      return res.status(200).json({ success: true, message: 'Login successful', email: userData.email });
    } else {
      return res.status(403).json({ success: false, message: 'Access denied: Unauthorized domain' });
    }
  } catch (error) {
    console.error('Error verifying access token:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
