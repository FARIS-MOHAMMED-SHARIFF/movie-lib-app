import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import DisplayList from "./DisplayList.jsx";
import "./Playlist.css";
import Modal from "react-modal";
import Switch from "../Switch/Switch.jsx";

Modal.setAppElement("#root");
const fetchUrl = "/playlists";
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

const Playlist = ({ location, history }) => {
  const [playlists, setPlaylist] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  // const [data, setData] = useState({ name: "", isprivate: isToggled });
  const [myname, setMyName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: { "x-auth-token": localStorage.getItem("token") },
      };
      axios
        .get(fetchUrl, config)
        .then((res) => {
          console.log(res.data);
          setPlaylist(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const configs = {
    headers: { "x-auth-token": localStorage.getItem("token") },
  };

  const handleCreatePlaylistSubmit = async (e) => {
    e.preventDefault();

    setModalIsOpen(false);
    try {
      const { data: res } = await axios.post(
        "/playlists",
        {
          name: myname,
          isprivate: isToggled,
        },
        configs
      );
      // console.log(playlists);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
    window.location.reload();
    // history.push("/playlists");
  };

  const handleChange = (e) => {
    setMyName(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="cen_btn">
          <button onClick={() => setModalIsOpen(true)} className="playlist_btn">
            Create Playlist
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            style={customStyles}
          >
            <form
              className="form_container"
              onSubmit={handleCreatePlaylistSubmit}
            >
              <h1>Create Playlist</h1>
              <input
                type="text"
                placeholder="Name"
                name="name"
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

              {error && <div className="error_msg">{error}</div>}
              <br />
              <button type="submit" className="playlist_btn">
                Create
              </button>
            </form>
          </Modal>
        </div>
        <div className="row">
          <div>
            {playlists.map((playlist) => (
              <DisplayList
                title={playlist.name}
                id={playlist._id}
                url={`/playlists/${playlist._id}`}
                playlists={playlists}
                setPlaylist={setPlaylist}
                isprivate={playlist.isprivate}
                user={playlist.user}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;

// {
/* <div className = "movie-container"> */
// }
//  {movies.length > 0 &&
//   movies.map((movie) => <Movie key={movie.id} {...movie} />)}
// </div> */}
