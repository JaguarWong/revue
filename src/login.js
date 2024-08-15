import React, { useState } from 'react';
import { login, signup } from './auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await login(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await signup(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {error && <p>{error}</p>}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Login;
