import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import Cookies from 'universal-cookie';
import { jwtDecode } from "jwt-decode"


export default function GoogleOAuth() {
    const cookies = new Cookies()
  return (
    <div>
        <GoogleOAuthProvider clientId='228878032402-nk85go84v2rn0l3tvk2caa8g3s6ld1oh.apps.googleusercontent.com'>
            <GoogleLogin
            onSuccess={credentialResponse =>{
                const credentialResponseDecode = jwtDecode(credentialResponse.credential)
                cookies.set('email',credentialResponseDecode.email,{
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                })
                //console.log(CredentialResponse);
                cookies.set('nombres',credentialResponseDecode.name,{
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                })
                window.location.hash = '/sesion'
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
        </GoogleOAuthProvider>
      
    </div>
  )
}