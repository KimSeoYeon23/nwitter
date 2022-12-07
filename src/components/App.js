import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

function App() {
  console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }
      setInit(true);
    });
  }, [init]);

  return (
    <>
      {
        init 
        ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
        : "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
