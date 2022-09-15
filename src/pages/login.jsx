import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import logo from '../img/chatBOT.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password).then((res) => {
        if (res) {
          setLoading(false);
          navigate('/');
        }
      });
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <img src={logo} alt='' className='logo' />
        <span className='header'>Welcome back!</span>
        <span className='title'>
          Login with your creadentials to start connecting with your friends.
        </span>
        <form onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' />
          <input type='password' placeholder='Password' />
          <button>
            {loading ? <i class='fa fa-spinner fa-spin'></i> : 'Sign In'}
          </button>
          {error && (
            <span className='error'>
              The email address or password you entered isn't connected to an
              account.
            </span>
          )}
        </form>
        <p>
          You don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
