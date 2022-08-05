import React, { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../../store/firebaseContext'

import './Signup.css'
function Signup() {
    const navigate = useNavigate()
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [mailalert,setMailAlert] = useState('')
    const {firebase} = useContext(FirebaseContext)

    const handleSubmit =(e)=>{
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
            result.user.updateProfile({
                displayName: username
            }).then(()=>{
                firebase.firestore().collection('users').add({
                    id: result.user.uid,
                    username: username
                })
                alert('User updated successfully')
                navigate('/')
            }).catch((err)=>{alert(err.message); navigate(0)})
        }).catch((err)=>{alert(err.message); navigate(0)})
    }
    const emailValidate = () => {
        const email_regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
        if (!email_regex.test(email)) {
            setMailAlert("Email id is not valid")
        } else {
            setMailAlert('')
        }
    }
    return (
        <div className="signupParentDiv">
            <div className="signupChildDiv">
                <div className="signupSection">
                    <div className="headerSection">
                        <span>Sign Up</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="emailSection">
                            <input 
                            type="text"
                            name="email" 
                            placeholder="Username" 
                            defaultValue="Arun"
                            value={username} onChange={(e)=>{setUsername(e.target.value)}} required/>
                        </div>
                        <div className="emailSection">
                            <input 
                            type="email" 
                            name="email" 
                            placeholder="Email address or Phone number"
                            defaultValue="Arun"
                            value={email} onChange={(e)=>{emailValidate();
                            setEmail(e.target.value)}} required/>
                        {mailalert && <span className="emailAlert">{mailalert}</span>}
                        </div>
                        <div className="passwordSection">
                            <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            defaultValue="Arun"
                            value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                        </div>
                        <div className="submitSection">
                            <button className="submitButton">Sign Up</button>
                        </div>
                        <div className="footersection"> 
                            <span className="signinText">Already have an account?<span className="signinLink" onClick={()=>{navigate('/login')}}> Signin</span></span><br />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup