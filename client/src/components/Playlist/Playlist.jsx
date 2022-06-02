import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayList from './DisplayList';

const fetchUrl = "/playlists"

const Playlist = () => {
	
	const [playlists, setPlaylist] = useState([]);

	useEffect(() => {
		const config = {
			headers: { 'x-auth-token' :  localStorage.getItem('token') }
		};

		axios.get(fetchUrl, config)
		.then(res => {
			console.log(res.data)
			// console.log(res.data.name)
			setPlaylist(res.data)
			// console.log(playlists)
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
				<DisplayList title={playlist.name}   fetchUrl={`/playlists/${playlist._id}`} />
			))}
			</div>
		</div>
	</div>
  )
}

export default Playlist

