import { Navigate, Route, Routes } from "react-router-dom";
import Search from "../Search/Search";
import Home from "../Home/Home";
import Playlist from "../Playlist/Playlist";
import Navbar from "../Navbar/Navbar";

const Main = () => {
  const loggedIn = localStorage.getItem("token");
  return (
    <>
      {loggedIn && <Navbar />}
      <div className="app">
        <Routes>
          {loggedIn && <Route exact path="/" element={<Home />} />}
          <Route path="/" element={<Navigate replace to="/login" />} />
          {loggedIn && <Route path="/search" element={<Search />} />}
          <Route path="/search" element={<Navigate replace to="/login" />} />
          {loggedIn && <Route path="/playlist" element={<Playlist />} />}
          <Route path="/playlist" element={<Navigate replace to="/login" />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
