import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

function App() {
  console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [init]);

  return (
    <>
      {
        init 
        ? <AppRouter isLoggedIn={isLoggedIn}/>
        : "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}

export default App;
