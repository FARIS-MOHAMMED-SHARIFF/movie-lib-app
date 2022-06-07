import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Switch from "./Switch/Switch";
import "./Playlist/Playlist.css"

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

const UpdateModal = ({
  modalIsOpen,
  setModalIsOpen,
  title,
  playlistId,
  isprivate,
}) => {
  const [isToggled, setIsToggled] = useState(isprivate);
  const [myname, setMyName] = useState(title);
  const config = {
    headers: { "x-auth-token": localStorage.getItem("token") },
  };
  const handleUpdatePlaylist = () => {
    setModalIsOpen(false);
    const url = `/playlists/edit/${playlistId}`;
    const res = axios
      .put(
        url,
        {
          name: myname,
          isprivate: isToggled,
        },
        config
      )
      .then((res) => {
        alert("Updated successfully!");
      })
      .catch((res) => {
        alert("Unauthorised action");
      });
      window.location.reload();
  };

  const handleChange = (e) => {
    setMyName(e.target.value);
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      style={customStyles}
    >
      <form className="form_container" onSubmit={handleUpdatePlaylist}>
        <h1>Update Playlist</h1>
        <input
          autocomplete="off"
          type="text"
          placeholder={title}
          name="title"
          onChange={handleChange}
          required
          className="input"
        />
        <span>Private:</span>
        <Switch
          isToggled={isToggled}
          onToggle={() => {
            setIsToggled(!isToggled);
          }}
        />
        <br />
        <button type="submit" className="playlist_btn">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default UpdateModal;
