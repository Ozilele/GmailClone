import React, { useEffect, useState } from 'react';
import './App.css';
import { RouterProvider,createBrowserRouter, Outlet } from "react-router-dom"; 
import Header from './components/Header';
import MainBox from './components/MainBox';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import MailScreen from './components/MailScreen';
import MailPopup from './components/MailPopup';
import { useDispatch, useSelector } from 'react-redux';
import { selectMailPopupInfo } from './features/mailSlice';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { selectAppTheme } from './features/appMode';
import StarredEmails from './components/StarredEmails';


const MainRouteLayout = () => {

  const popupWindowIsOpen = useSelector(selectMailPopupInfo);
  const theme = useSelector(selectAppTheme);

  return (
    <div className="app" id={theme}>
      <Header/>
      <div className="app__body" id={theme}>
        <Sidebar/>
        <Outlet/>
        {popupWindowIsOpen && <MailPopup/>}
      </div>
    </div>
  )
}

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainRouteLayout/>,
      children:[
        {
          path: "/",
          element: <MainBox/>
        },
        {
          path: "/mail/:id",
          element: <MailScreen/>
        },
        {
          path: "/starred",
          element: <StarredEmails/>
        }
      ]
    },
  ]);

  const loginRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login/>
    }
  ]);

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if(userAuth) { // user is logged in(Google sets behind the scenes cookies, auth etc.)
        dispatch(login({ 
          displayName: userAuth.displayName,
          email: userAuth.email,
          photoUrl: userAuth.photoURL,
        }));
      } else {
        dispatch(logout());
      }
    })
  }, []);


  let appRouter = user ? router : loginRouter;

  return (
    <RouterProvider router={appRouter}/>
  );
}

export default App;
