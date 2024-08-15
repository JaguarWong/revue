import './App.css';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './login';

const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchTitle = async () => {
      const docRef = doc(db, 'movies', 'jrD59zATINV4dSUR6dKX');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
      } else {
        console.log('No such document!');
      }
    };

    fetchTitle();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>{title ? title : 'Loading...'}</h1>
      <div>
        {user ? (
          <div>
            <h1>Welcome, {user.email}</h1>
            <button onClick={() => auth.signOut()}>Logout</button>
          </div>
        ) : (
          <Login />
        )}
      </div>
      <button onClick={() => console.log(user)}>User</button>
    </div>
  );
};

export default App;
