import React, {  useState } from "react";
import "./Movie.css";
import CustomModal from "../CustomModal";

const IMG_API = "https://image.tmdb.org/t/p/original/";

const Movie = ({ id, title, poster_path }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const movieDetails = {
    movie_id: id,
    title: title,
    poster_paths: poster_path,
  };

  return (
    <div className="movie">
      <img
        src={
          poster_path
            ? IMG_API + poster_path
            : "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1459&q=80"
        }
        alt={title}
      />
      <div className="movie-info">
        <h4>{title}</h4>
        <button onClick={() => setModalIsOpen(true)}>Add</button>
      </div>
      {modalIsOpen ? (
        <CustomModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          movieDetails={movieDetails}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Movie;
