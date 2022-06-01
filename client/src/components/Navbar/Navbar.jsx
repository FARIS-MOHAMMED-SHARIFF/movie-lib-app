import React  from 'react';
import { NavLink , useNavigate} from 'react-router-dom'
import './Navbar.css'


const Navbar = ( props ) => {

    // const history = useHistory
    const nav = useNavigate(); 
    const handleLogout = () => {
		localStorage.removeItem("token");
    nav("/login");
		// window.location.reload();
    // props.history.push("/");
	};
  return (
    <div className="navbar">
      <div>
      Movie Library
      </div>
      <div className="items">
        <NavLink className = "link" exact activeClassName="active_class" to="/">Home</NavLink>
        <NavLink className = "link" exact activeClassName="active_class" to="/search">Search</NavLink>
        <NavLink className = "link" exact activeClassName="active_class" to="/playlist">Playlist</NavLink>
        <button onClick={handleLogout}>
					Logout
				</button>
      </div>
    </div>
  )
}

export default Navbar