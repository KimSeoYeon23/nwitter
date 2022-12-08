import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';
import {getAuth, onAuthStateChanged, updateProfile} from 'firebase/auth';

function App() {
  console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        user.displayName ??= updateProfile(user, {displayName: 'user'});
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, [init]);

  return (
    <div className='container'>
      {
        init 
        ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/>
        : "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
