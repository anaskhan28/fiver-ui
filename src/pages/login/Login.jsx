import React, { useState } from 'react'
import './Login.scss';
import axios from '../../utils/baseurl.js';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.post("/auth/login", {
        username,
        password
      })
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      navigate("/")

      console.log(res.data)

    } catch(error){
      setError(error.response.data);
      console.log(error)
    }

  }
  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input type="text" name='username' placeholder='anas' onChange={(e) => setUsername(e.target.value)} />

        <label htmlFor="">Password</label>
        <input type="password" name='password' placeholder='12345' onChange={(e) => setPassword(e.target.value)}/>
        <button type='submit'>Login</button>

        {error && error}
      </form>
    </div>
  )
}

export default Login