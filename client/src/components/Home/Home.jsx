import React from 'react'
import requests from '../../requests'
import Banner from '../Banner/Banner'
import Row from '../Row/Row'

const Home = () => {
  return (
    <div>
        <Banner />
        <Row title="Trending"  isLargeRow fetchUrl={requests.fetchTrending} />
        <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
        <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
        <Row title="Adventure Movies" fetchUrl={requests.fetchAdventureMovies} />
    </div>
  )
}

export default Home