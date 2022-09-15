import React, { useState } from 'react';
import addAvatar from '../img/addAvatar.png';
import { useNavigate, Link } from 'react-router-dom';
import { auth, storage, db } from '../firebase.js';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import logo from '../img/chatBOT.jpg';

const Register = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {});
            setLoading(false);
            navigate('/');
          } catch (err) {
            setError(true);
          }
        });
      });
    } catch (err) {
      setError(true);
    }
  };

  const onImageChange = (e) => {
    const [file] = e.target.files;
    setImg(URL.createObjectURL(file));
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <img src={logo} alt='' className='logo' />
        <span className='title'>
          Register here to always connected with your friends
        </span>
        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Name' />
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <input
            type='file'
            id='file'
            className='hideFile'
            onChange={onImageChange}
            accept='image/gif, image/jpeg, image/png'
          />
          <label htmlFor='file'>
            <img src={img ? img : addAvatar} alt='' />
            {!img && <span>Add an avatar</span>}
            {img && (
              <span
                onClick={() => {
                  setImg('');
                }}>
                Change an Avatar
              </span>
            )}
          </label>
          <button>
            {loading ? <i class='fa fa-spinner fa-spin'></i> : 'Sign Up'}
          </button>
          {error && <span className='error'>Something went wrong! </span>}
        </form>
        <p>
          Do you have an account? <Link to='/login'>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
