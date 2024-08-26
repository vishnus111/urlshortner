import  { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
      const user = { email, password };
      dispatch(login(user));
      navigate('/');
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
   <div className='d-flex justify-content-center mt-5 '>
     <div className="login-page w-50 p-5 bg-white border shadow-lg">
     
      <form onSubmit={handleSubmit} >
      <h2>Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Login
        </button>
      </form>
    </div>
   </div>
  );
}

export default LoginPage;
