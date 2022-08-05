import React from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import Banner from '../../Components/Banner/Banner';
import Rowpost from '../../Components/Rowpost/Rowpost';
import Footer from '../../Components/Footer/Footer';
import {trendingMovies,netflixOriginals,actionMovies,comedyMovies,romanceMovies,horrorMovies,documentaries} from '../../urls'

function Home() {
    return (
        <div className='app'>
            <Navbar />
            <Banner />
            <Rowpost url={trendingMovies} title="Trending" />
            <Rowpost url={netflixOriginals} title="Netflix originals" />
            <Rowpost url={actionMovies} title="Action" isSmall />
            <Rowpost url={comedyMovies} title="Comedy" isSmall />
            <Rowpost url={romanceMovies} title="Romance" isSmall />
            <Rowpost url={horrorMovies} title="Horror" isSmall />
            <Rowpost url={documentaries} title="Documentaries" isSmall />
            <Footer />
        </div>
    )
}

export default Home
