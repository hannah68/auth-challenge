import React from 'react'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
        <h1>This is a Home page</h1>
        <Link to='/user/register'>
            <button>Register</button>
        </Link>
    </div>
  )
}

export default Home