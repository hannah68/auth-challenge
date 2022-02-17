import {useState} from 'react'
const apiUrl = 'http://localhost:4000';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState({
    username: '',
    password: ''
  })


  // handle change input=================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  // handle register form ================================
  const handleRegisterForm = async (e) => {
    e.preventDefault();

		const { username, password } = user;

		const res = await fetch(`${apiUrl}/user/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		const data = await res.json();
		navigate("/user/login", { replace: true });
	};

  return (
    <form onSubmit={handleRegisterForm}>
        <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={user.username} 
            onChange={handleChange} 
        />
        <br />
        <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={user.password} 
            onChange={handleChange} 
        />
        <br />
        <button type="submit">Submit</button>
    </form>
  )
}

export default RegisterForm