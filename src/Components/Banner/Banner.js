import React, { useContext, useEffect, useState } from 'react'
import axios from '../../axios'
import {API_KEY,imageUrl} from '../../constants/constants'
import YouTube from 'react-youtube'
import './Banner.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../store/userContext'
import { FirebaseContext } from '../../store/firebaseContext'
import Post from '../Post/Post'
import { Fragment } from 'react'

function Banner() {
  const navigate = useNavigate()
  const [movie, setMovie] = useState()
  const [urlId, seturlId] = useState('')
  const [isVideo,setIsvideo] = useState(false)
  const {user} = useContext(UserContext)
  const {firebase}  = useContext(FirebaseContext)
  const [movieList,setMovieList] = useState([]) 
  const [isMymovies,setMymovies] = useState(false)
  
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((res)=>{
      //console.log(res.data.results[0]);
      const index = Math.floor(Math.random() * res.data.results.length)
      setMovie(res.data.results[index])
    })  
  }, [])
  console.log(movieList);
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      //https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const getMymovies = () =>{
    setMymovies(!isMymovies);
    firebase.firestore().collection('movielist').where('user','==',user.uid).onSnapshot((snapshot)=>{
    const movies = snapshot.docs.map((movie)=>{
        return movie.data()
      })
      setMovieList(movies)
    })
      //setMovieList(movies)
  }
  const movieTrailer = (movie_id)=>{
    //console.log(movie_id)
    axios.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`).then((res)=>{
      //console.log(res.data.results[0].key)
      if (res.data.results.length !== 0) {
        seturlId(res.data.results[0].key)

      }else{
        console.log("Url is not available");
      }
    })
  }
  return (
    <Fragment>
      <div className="banner" style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }}>
        <div className="content">
          <h1 className='movie-name'>{movie ? movie.original_title : ''}</h1>
          <div className="banner-buttons">
            <button className="button" onClick={() => { movieTrailer(movie.id); setIsvideo(!isVideo) }}> Play </button>
            <button className="button" onClick={() => { user ? getMymovies() : navigate('/login') }}> My list </button>
          </div>
          <h1 className='movie-description'>{movie ? movie.overview : ''}</h1>
        </div>
        <div className="fade-bottom">
        </div>
        {(urlId && isVideo) && <YouTube videoId={urlId} opts={opts} />}
      </div>

      {
        (user && isMymovies) &&
        <div className='rowpost'>
          <h2>My List</h2>
          <div className="posters">
            {
              movieList.map((movie) => {
                const elem = { id: movie.movie }
                return (
                  <Link to='\view'>
                    <Post url={movie.imageUrl} movie={elem} />
                  </Link>
                )
              })
            }
          </div>
        </div>
      }
    </Fragment>
  )
}

export default Banner


