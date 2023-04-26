import { Button } from '@mui/material';
import React from 'react'
import  './Login.css';
import { auth, provider } from '../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';

const Login = () => {

  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user; // signed in user info
      dispatch(login({ // Data is provided by Google API
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoURL
      }))
    }).catch((error) => {
      alert(error.message);
    });

  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://blog.logomyway.com/wp-content/uploads/2021/02/gmail-logo.jpg" alt="gmail"></img>
        <Button variant='contained' color="primary" onClick={signIn}>Login</Button>
      </div>
    </div>
  )
}

export default Login;