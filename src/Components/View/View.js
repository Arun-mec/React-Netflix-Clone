import React, { useEffect } from 'react'
import './View.css'
import { useNavigate } from 'react-router-dom'
import Rowpost from '../../Components/Rowpost/Rowpost'
import { useState } from 'react'
import { useContext } from 'react'
import { ViewpostContext } from '../../store/viewPost'
import { API_KEY, imageUrl } from '../../constants/constants'
import axios from '../../axios'
import Youtube from 'react-youtube'
import { UserContext } from '../../store/userContext'
import { FirebaseContext } from '../../store/firebaseContext'
function View() {
    const navigate = useNavigate()
    const [showRelated,setShowRelated] = useState(false)
    const {firebase} = useContext(FirebaseContext)
    const {viewMovie} = useContext(ViewpostContext)
    const [videoUrl, setVideoUrl] = useState('')
    const [isVideo, setIsVideo] = useState('')
    const {user} = useContext(UserContext)
    useEffect(()=>{
        setShowRelated(false)
    },[])
    const movieTrailer = (movie_id)=>{
        axios.get(`/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US`).then((res) => {
            setVideoUrl(res.data.results[0].key)
            //console.log(res.data.results[0].key)
    })
    }
    const addMovie = (movie_id) =>{
        firebase.firestore().collection('movielist').add({
            movie:movie_id,
            user:user.uid,
            imageUrl : `${imageUrl+ viewMovie.backdrop_path}`
        }).then(()=>{
            console.log("This movie has been added to the list")
            alert("This movie has been added to the list")
        }).catch((err)=>{alert(err.message);})
    }
    
    const opts = {
        height: '650',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    return (
        <div className="parentViewDiv">
            <div className="topSection">
                <div className="leftSection">
                    <div className="headingSection">{viewMovie.original_title}</div>
                    <div className="imdbSection">
                        <button className="episodesButton" onClick={()=>{movieTrailer(viewMovie.id); setIsVideo(!isVideo)}}>Show trailer</button>
                        <span>Popularity {viewMovie.popularity}</span>
                    </div>
                    <div className="descSection">{viewMovie.tagline}</div>
                    <div className="secDescSection">{viewMovie.overview}</div>
                    <div className="buttonSection">
                        <button className="watchButton">Start your subscription and watch now</button>
                        <button className="plusButton" onClick={()=>{user? addMovie(viewMovie.id): navigate('/login')}}>+</button>
                    </div>
                </div>
                <div className="rightSection">
                    <img src={`${imageUrl+ viewMovie.backdrop_path}`} alt=""/>
                </div>
            </div>
            { (videoUrl && isVideo) &&
            <div className="youtube">
                <Youtube  videoId={videoUrl} opts={opts}></Youtube>
            </div>
            }
            <div className="midSection">
                <div className="related" onClick={()=>{setShowRelated(!showRelated);}}>Related Posts</div>
                <div className="details">Reviews</div>
            </div>

            {showRelated &&
            <div className="bottomSection">
                <Rowpost url={`/movie/${viewMovie.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`} isSmall></Rowpost>
            </div> 
            }
        </div>

    )
}

export default View