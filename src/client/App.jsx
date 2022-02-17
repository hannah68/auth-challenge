import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Register from './component/Register';
import Login from './component/Login';
import Movie from './component/Movie';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/register' element={<Register/>} />
        <Route path='/user/login' element={<Login/>} />
        <Route path='/movie' element={<Movie/>}/>
      </Routes>
    </div>
  );
}

export default App;