import { useGoogleLogin } from '@react-oauth/google';

export default function LoginLogoutButton(){

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => {
          console.log('Success:', tokenResponse);
        },
        onError: () => {
          console.error('Login Failed');
        },
      });

    
    return(
        <button onClick={()=> login()}>
            Log in with Google
        </button>
    );
}
