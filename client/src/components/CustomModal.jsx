import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./Playlist/Playlist.css"

const CustomModal = ({ modalIsOpen, setModalIsOpen, movieDetails }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      colour: "#e50914",
    },
  };

  const [userPlaylists, setUserPlaylists] = useState([]);
  const [movieData, setMovieData] = useState({});
  const config = {
    headers: { "x-auth-token": localStorage.getItem("token") },
  };
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get("/playlists/userplaylist", config);
      setUserPlaylists(request.data.data);
      console.log(request);
      //  return request;
    }
    fetchData();
  }, []);

  const handleAddToPlaylist = async (e) => {
    e.preventDefault();
    setModalIsOpen(false);
    console.log("tHIS IS MOVIEDATA");
    console.log(movieData);
    await axios
      .put("/playlists/add-movie", movieData, config)
      .then((response) => {
        console.log("Successful");
      })
      .catch((err) => {
        console.log(err);
        // const data = await response.json();
      });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setMovieData({
      playlistId: e.target.value,
      movies: { ...movieDetails },
    });
    console.log(movieData);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
    >
      <form className="form_container" onSubmit={handleAddToPlaylist}>
        <h1>Add to Playlist</h1>
        <label for="lists">Select playlist:</label>
        <select id="lists" onChange={handleChange}>
          <option hidden disabled selected value>
            select
          </option>
          {userPlaylists?.map((list) => (
            <option value={list._id}>{list.name} </option>
          ))}
        </select>
        <p>
        <button type="submit" className="playlist_btn">
          Add
        </button>
        </p>
      </form>
    </Modal>
  );
};

export default CustomModal;
