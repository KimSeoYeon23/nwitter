import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from 'fbase';
import {onAuthStateChanged, updateProfile, updateCurrentUser} from 'firebase/auth';

function App() {
  console.log(authService.currentUser);
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if(user) {
        user.displayName ??= updateProfile(user, {displayName: 'user'});
        setUserObj(user);
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = async () => {
    await updateCurrentUser(authService, authService.currentUser);
    setUserObj(authService.currentUser);
  }

  return (
    <div className='container mx-auto'>
      {
        init 
        ? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} />
        : "Initializing..."
      }
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
