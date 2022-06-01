// import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Playlist from './components/Playlist/Playlist';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';

const App = () => {
  const loggedIn = localStorage.getItem("token");
  return (
    <>
	{loggedIn && <Navbar />}
    <Routes>
			{loggedIn && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route exact path="/"  element = {<Home />} />
			<Route path="/search" element = {<Search />} />
            <Route path="/playlist" element = {<Playlist />} />
	</Routes>
    </>
	);
};

export default App;
