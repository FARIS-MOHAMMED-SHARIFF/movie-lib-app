import axios from 'axios';
import React from 'react'
import "./Movie.css"

const IMG_API = "https://image.tmdb.org/t/p/original/"

const Movie = ({title,poster_path,overview}) => {
  
  const handleAdd = async (e) => {
          e.preventDefault();      
        	const response = await fetch('http://localhost:8080/playlists/add-movie', {
        		method: 'PUT',
        		headers: {
        			'Content-Type': 'application/json',
              'x-auth-token':localStorage.getItem('token')
        		}
        	})
      
        	const data = await response.json();
	};
  return (
    <div className="movie">
        <img src = {poster_path ? IMG_API + poster_path : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
        } alt={title} />
        <div className = "movie-info">
            <h4>{title}</h4>
            <button onClick={handleAdd}>Add</button>
        </div>
    </div>
  )
}

export default Movie