import React,{ useContext} from 'react'
import './Post.css'
import axios from '../../axios'
import {API_KEY} from '../../constants/constants'
import { Fragment } from 'react'
import { ViewpostContext } from '../../store/viewPost'

function Post(props) {

    const {setviewMovie} = useContext(ViewpostContext)
    const getMovie = (movie_id) => {
        axios.get(`/movie/${movie_id}?api_key=${API_KEY}&language=en-US`).then((res) => {
            setviewMovie(res.data)
            console.log(res.data)
        })
    }

    
    return (
        <Fragment>
            <div className="parent">
                <img alt="Poster" className={props.isSmall ? 'smallposter' : 'poster'} src={props.url}
                onClick={()=>{getMovie(props.movie.id)}} />
                
            </div>
        </Fragment>

    )
}   

export default Post
