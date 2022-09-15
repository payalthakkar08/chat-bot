/* eslint-disable eqeqeq */
import React, { useContext, useState } from 'react';
import {
  collection,
  query,
  where,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/authContext';

function Search() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = async (value) => {
    if (value == '') {
      setUser(null);
    } else {
      const q = query(
        collection(db, 'users'),
        where('displayName', '==', value)
      );
      const querySnapShot = await getDocs(q);
      try {
        querySnapShot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        setError(true);
      }
    }
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combinedId));
      // if there is no chat between two users
      if (!res.exists()) {
        // create chats in chat collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });
        await updateDoc(doc(db, 'userChats', currentUser?.uid), {
          [combinedId + '.userInfo']: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
        await updateDoc(doc(db, 'userChats', user?.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <div className='search'>
      <div className='searchForm'>
        <input
          type='text'
          placeholder='Find a user...'
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      {error && <span>User not found!</span>}
      {user && (
        <div className='userChat' onClick={() => handleSelect()}>
          <img src={user?.photoURL} alt='' />
          <div className='userChatInfo'>
            <span>{user?.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
