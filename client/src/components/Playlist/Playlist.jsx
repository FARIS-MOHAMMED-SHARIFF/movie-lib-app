import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import Row from '../Row/Row';
import DisplayList from './DisplayList';
// import DisplayList from './DisplayList';

const fetchUrl = "/playlists/"

const Playlist = () => {
	
	const [playlists, setPlaylist] = useState([]);

	useEffect(() => {
		const config = {
			headers: { 'x-auth-token' :  localStorage.getItem('token') }
		};

		axios.get(fetchUrl, config)
		.then(res => {
			console.log(res.data)
			console.log(res.data.name)
			setPlaylist(res.data)
		})
		.catch(err => {
			console.log(err)
		})    
  }, []); 
  return (
	  <div class="container">
	  <header>
          <button >
			Create Playlist
          </button>
        </header>     
        {/* <div className = "movie-container">
        {/* {movies.length > 0 &&  */}
            {/* //   movies.map((movie) => <Movie key={movie.id} {...movie} />)} */}
        {/* </div> */}
		<div className="row" >
			<div>
			{playlists.map( playlist => (
				<DisplayList title={playlist.name}   fetchUrl="/playlists/:id={playlist._id}"/>
			))}
			</div>
		</div>
	</div>
  )
}

export default Playlist

// fetchUrl="https://api.themoviedb.org/3/movie/{movie_id}?api_key=094a3d803bdc4b5dd9242156577eda89&language=en-US"
