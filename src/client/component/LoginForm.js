import {useState} from 'react'
const apiUrl = 'http://localhost:4000';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
  
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

	
    // handle login form ================================
    const handleLoginForm = async (e) => {
		e.preventDefault();

		const { username, password } = user;

		const res = await fetch(`${apiUrl}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		});
		const data = await res.json();

		localStorage.setItem('user token', data);

        if(data.error){
            setErrorMessage('Invalid Username or password, try again');
			navigate("/user/login", { replace: true });
        }else{
			navigate("/movie", { replace: true });
		}
		cleanForm();
	};

	const cleanForm = () => {
        setUser({
            username: '',
        	password: ''
        })
    }
  
    return (
		<>
			<form onSubmit={handleLoginForm}>
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
				<button type="submit">login</button>
			</form>
            {errorMessage && <p>{errorMessage}</p>}
		</>
	);
}

export default LoginForm