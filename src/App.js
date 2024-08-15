import './App.css';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import Login from './login';

const App = () => {
  const [movie, setMovie] = useState('');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      const docRef = doc(db, 'movies', 'jrD59zATINV4dSUR6dKX');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMovie(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };

    fetchMovie();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const tokenResult = await getIdTokenResult(user);
        console.log(tokenResult);
        setIsAdmin(!!tokenResult.claims.role && tokenResult.claims.role === 'admin');
        setUser(user);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <p>{movie ? movie.title : 'Loading...'}</p>
      <Movies />
      <div>
        {user ? (
          <div>
            <p>Welcome, {user.email}</p>
            {isAdmin && <p>You are an admin.</p>}
            <button onClick={() => auth.signOut()}>Logout</button>
          </div>
        ) : (
          <Login />
        )}
      </div>
      <button onClick={() => console.log(movie)}>Info</button>
    </div>
  );
};

export default App;
