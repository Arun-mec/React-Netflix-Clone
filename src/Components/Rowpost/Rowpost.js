import React, { useEffect, useState } from 'react'
import axios from '../../axios'
import { imageUrl} from '../../constants/constants'
import './Rowpost.css'

import Post from '../Post/Post'
import { Link } from 'react-router-dom'

function Rowpost(props) {
  useEffect(() => {
    console.log(props)
    axios.get(props.url).then((res)=>{
      console.log(res.data)
      setMovies(res.data.results)
    })
  }, [])
  const [movies, setMovies] = useState([])
  
  return (
    <div className='rowpost'>
      <h2>{props.title}</h2>
      <div className="posters"> 
        {
          movies.map((obj) => {
            return (
              <Link to='/view'>
                <Post url={`${imageUrl+obj.backdrop_path}`} movie={obj} isSmall={props.isSmall} />
              </Link>
            )
          })
        }
      </div>
    </div>

  )
}

export default Rowpost
