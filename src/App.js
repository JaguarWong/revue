import './App.css';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the import path as needed

// function App() {
//   return (
//     <div className="App">
//       <p>Hello</p>
//     </div>
//   );
// }

const App = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    // Function to fetch the document
    const fetchTitle = async () => {
      // Replace 'movies' with your collection name and 'docId' with your document ID
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

  return (
    <div>
      <h1>{title ? title : 'Loading...'}</h1>
    </div>
  );
};

export default App;
