import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DisplayList.css";
import UpdateModal from "../UpdateModal";
import "../Playlist/Playlist.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function DisplayList({ title, id, url, playlists, setPlaylist, isprivate }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const config = {
    headers: { "x-auth-token": localStorage.getItem("token") },
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url, config);
      console.log(request.data);
      setMovies(request.data.data);
      //  return request;
    }
    fetchData();
  }, []);

  const handleDelete = (movieid) => {
    const newMovies = movies.filter((movie) => movie.movie_id != movieid);
    setMovies(newMovies);
    const res = axios
      .put(
        "/playlists/remove-movie",
        { playlistId: id, movieId: movieid },
        config
      )
      .then((res) => {
        alert("Deleted successfully!");
      })
      .catch((res) => {
        alert("Unauthorised action");
      });
  };
  // console.log(res.message);

  const handleDeletePlaylist = () => {
    const newPlaylist = playlists.filter((playlist) => playlist._id != id);
    setPlaylist(newPlaylist);
    const res = axios
      .delete(`/playlists/${id}`, config)
      .then((res) => {
        alert("Playlist deleted successfully!");
      })
      .catch((res) => {
        alert("Unauthorised action");
      });
  };
  return (
    <div className="row">
      <div className="playlist_bar">
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <button onClick={() => setModalIsOpen(true)} className="playlist_btn">
            Update
          </button>
          <button onClick={handleDeletePlaylist} className="playlist_btn">
            Delete
          </button>
        </div>
      </div>
      {modalIsOpen ? (
        <UpdateModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          playlistId={id}
          title={title}
          isprivate={isprivate}
        />
      ) : (
        ""
      )}
      <div className="row__posters">
        {movies?.map((movie) => (
          <div className="movie">
            <img
              key={movie}
              className={"list__poster"}
              src={`https://image.tmdb.org/t/p/original/${movie.poster_paths}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h4>{movie.title}</h4>
              <button
                onClick={() => {
                  handleDelete(movie.movie_id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayList;
