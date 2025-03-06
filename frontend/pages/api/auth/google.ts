import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
  email?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your client's domain
  res.setHeader('Access-Control-Allow-Methods', 'POST');

  const googleCallbackUrl = 'http://localhost:3000'
  const googleClientId = '698125770982-9i0lb2253n05l876koe3k7pktg6t4bsk.apps.googleusercontent.com'
  const googleSignInUrl = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleCallbackUrl}&prompt=consent&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile&access_type=offline`;
  // if (req.method !== 'POST') {
  //   return res.status(405).json({ success: false, message: 'Method not allowed' });
  // }

  const { token } = req.body;
  console.log(req)
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token not provided' });
  }

  try {
    const google_response = await fetch(googleSignInUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!google_response.ok) {
      return res.status(400).json({ success: false, message: 'Invalid access token' });
    }
    console.log(google_response)
    const res_json_google = await google_response.json();
    const code = await res_json_google.url;
    const backend_response = await fetch('http://localhost:8000/dj-rest-auth/google/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({'code': code})
    })
    if (!backend_response.ok) {
      return res.status(400).json({ success: false, message: 'Server Error' });

    }
    // if (userData.email && userData.email.endsWith('@stonybrook.edu')) {
    //   return res.status(200).json({ success: true, message: 'Login successful', email: userData.email });
    // } else {
    //   return res.status(403).json({ success: false, message: 'Access denied: not a SBU school account' });
    // }
  } catch (error) {
    console.error('Error verifying access token:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}
