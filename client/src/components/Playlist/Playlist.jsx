import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DisplayList from './DisplayList.js';
import "./Playlist.css"

const fetchUrl = "/playlists";

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
		})
		.catch(err => {
			console.log(err)
		})    
  }, []); 
  return (
	  <div className="container">
		  	<div className='cen_btn'>
				<button className="playlist_btn">
					Create Playlist
				</button>
		  	</div>
			<div className="row" >
				<div>
					{playlists.map( playlist => (
						<DisplayList title={playlist.name}   url={`/playlists/${playlist._id}`} />
					))}
				</div>
			</div>
		</div>
  )
}

export default Playlist;

{/* <div className = "movie-container"> */}
        //  {movies.length > 0 && 
            //   movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        // </div> */}