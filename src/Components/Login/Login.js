import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../../store/firebaseContext';
import './Login.css'

function Login() {
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const { firebase } = useContext(FirebaseContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                navigate('/')
            })
            .catch((error) => {
                alert(error.message)
            });
    }
    return (
        <div className="loginParentDiv">
            <div className="loginChildDiv">
                <div className="loginSection">
                    <div className="headerSection">
                        <span>Sign In</span>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="emailSection">
                            <input 
                            type="text" 
                            name="email" 
                            placeholder="Email address or Phone number"
                            value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="passwordSection">
                            <input 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={password} onChange={(e)=>setPassword(e.target.value)} />
                        </div>
                        <div className="submitSection">
                            <button className="submitButton" >Sign In</button>
                        </div>
                        <div className="footersection">
                            <span className="signinText">New to Netflix? <span className="signinLink" onClick={() => { navigate('/signup') }}>
                                Signup Now</span></span><br /><br />
                            <span className="signinText">Do you want to signup with phone number? <span className="signinLink" onClick={() => { navigate('/phone') }}>
                                Signup using Phone number</span></span><br />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login