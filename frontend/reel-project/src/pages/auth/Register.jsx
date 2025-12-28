import React from 'react'
import '../../styles/global.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register(){

  const navigate = useNavigate();

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const form = e.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const role = form.role.value;

    const user_type = role;

    const payload = { name, email, password, user_type };
    console.log('signup payload', payload);

    if (!name || !email || !password) {
      console.error('Validation failed: missing required fields', { name, email, hasPassword: !!password });
      return;
    }

    try {
     const response=await axios.post('http://localhost:7000/api/auth/signup', payload,{withCredentials:true});
     console.log('response',response.data);
     navigate("/user-login");
    } catch (err) {
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
          <h1 className="auth-title">Create account</h1>
        </div>
        <p className="auth-sub">Start your journey with a simple account.</p>

        <form aria-label="register form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" placeholder="John Appleseed" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@company.com" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="At least 8 characters" />
          </div>

          <div>
            <label htmlFor="role">Account type</label>
            <select id="role" name="role" defaultValue="user">
              <option value="user">👤 User</option>
              <option value="food_partner">🍽️ Food Partner</option>
            </select>
          </div>

          <div className="actions">
            <button type="submit" className="btn btn-primary">Sign up</button>
          </div>

          <div className="meta">Already have an account? <a href="/user/login">Sign in</a></div>
        </form>
      </div>
    </div>
  )
}
