
import {  Route, Routes } from 'react-router-dom';
import Search from '../Search/Search';
import Home from '../Home/Home';
import Playlist from '../Playlist/Playlist';
import Navbar from '../Navbar/Navbar';

const Main = () => {
  return (
      <>
        {/* <Navbar /> */}
        <div className="app">
            <Routes>
                <Route exact path="/"  element = {<Home />} />
                <Route path="/search" element = {<Search />} />
                <Route path="/playlist" element = {<Playlist />} />
            </Routes>
        </div> 
      </>
  )
}

export default Main