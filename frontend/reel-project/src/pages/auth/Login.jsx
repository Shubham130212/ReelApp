import React from 'react'
import '../../styles/global.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

export default function Login(){
  
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const form=e.currentTarget;
    const email=form.email.value.trim();
    const password=form.password.value;
    console.log(email,password);

    
    const payload = {  email, password };
    console.log('login payload', payload);

    if ( !email || !password) {
      console.error('Validation failed: missing required fields', { email, hasPassword: !!password });
      return;
    }

    try{
      const response=await axios.post("http://localhost:7000/api/auth/login",payload,{withCredentials:true})
      const { token, user_type } = response.data.user || {}
      if (token) {
        localStorage.setItem('token', token)
      }
      console.log('response', user_type)
      if(user_type==='user'){
        navigate('/')
      }
      else if(user_type==='food_partner'){
        navigate('/food-partner/create-food-partner')
      }
    }
    catch(err){
      if (err.response) {
        console.error('signup error', err.response.status, err.response.data);
      } else {
        console.error('signup error', err.message);
      }
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
        </div>
        <p className="auth-sub">Sign in to continue to your account.</p>

        <form aria-label="login form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">Sign in</button>
          </div>

          <div className="meta">Don't have an account? <a href="/user/register">Register</a></div>
        </form>
      </div>
    </div>
  )
}
