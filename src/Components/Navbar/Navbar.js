import React, { Fragment, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Navbar.css"
import {UserContext} from '../../store/userContext'
import { FirebaseContext } from '../../store/firebaseContext'

function Navbar() {
  const navigate = useNavigate()
  const {user,setUser} = useContext(UserContext)
  const {firebase} = useContext(FirebaseContext)
  const [isDropDown,setIsDropdown] = useState(false)
  const [bgcolor,setBgcolor] = useState(false)

  const changeColor =()=>{
    if(window.scrollY>100){
      setBgcolor(true)
    }else{
      setBgcolor(false)
    }
  }
  window.addEventListener('scroll',changeColor);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      }
  })
  })
  return (
    <div className={bgcolor?'navbar navbar-bg':'navbar'} >
      <img className='navbar-logo' onClick={()=>{navigate('/')}}src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix logo" />
      {user? 
      <Fragment>
      <img className='navbar-avatar' onClick={()=>{setIsDropdown(!isDropDown);}}
      src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png" alt="" />
      {isDropDown && 
      <div className="dropdown" onClick={()=>{setIsDropdown(!isDropDown);}}>
        <div className="userName">{user.displayName}</div>
        <div className="logout" onClick={()=>{
          firebase.auth().signOut()
          navigate('/')
        }}>Logout</div>
        </div>}
      </Fragment>
      : <button className='loginButton' onClick={()=>{navigate('/login')}}>Login</button>  
      }
    </div>
  )
}

export default Navbar
