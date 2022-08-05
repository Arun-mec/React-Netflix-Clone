import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Phone.css'
import { FirebaseContext } from '../../store/firebaseContext';
import { Fragment } from 'react';
function Phone() {
    const navigate = useNavigate();
    const {firebase} = useContext(FirebaseContext)
    const [expandForm,setExpandForm] = useState(false)
    const [phone,setPhone] = useState('')
    const [username,setUsername] = useState('')
    const [otp,setOtp] = useState('')
    const handleSubmit = (e)=>{
        e.preventDefault();
        var applicationVerifier = new firebase.firebase.auth.RecaptchaVerifier(
            'recaptcha-container');
            // setExpandForm(true)
        firebase.auth().signInWithPhoneNumber(phone, applicationVerifier)
            .then(function (confirmationResult) {
                setExpandForm(true)
                window.confirmationResult = confirmationResult;
            })
            .catch(function (error) {
                alert(error.message)
            });
    }
    const verifyOTP = (value) =>{
        if (value.length === 6){
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(value).then((result)=>{
                result.user.updateProfile({
                    displayName: username
                }).then(()=>{
                    firebase.firestore().collection('users').add({
                        id: result.user.uid,
                        username: username
                    })

                    alert('User updated successfully')
                    navigate('/')
                }).catch((err)=>{alert(err.message) ; navigate(0);})
            }).catch((err)=>{alert(err.message); navigate(0);})
        }
    }
    
    return (
        <div className="phoneParentDiv">
            <div className="phoneChildDiv">
                <div className="phoneSection">
                    <div className="headerSection">
                        <span>Sign In</span>
                    </div>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="phoneSection">
                            <input type="text"
                                name="email"
                                placeholder="Enter the phone number"
                                value={phone} onChange={(e) => { setPhone(e.target.value); }} required />
                        </div>
                        
                        {expandForm &&
                        <Fragment>
                        <div className="phoneSection">
                            <input type="text"
                                name="username"
                                placeholder="Enter the username"
                                value={username} onChange={(e) => { setUsername(e.target.value); }} required />
                        </div>

                        <div className="otpSection">
                            <input type="text" 
                            name="otp" 
                            placeholder="Enter the OTP"
                            defaultValue="Arun" 
                            value={otp} onChange={(e)=>{ setOtp(e.target.value); verifyOTP(e.target.value);}}
                            />
                        </div>
                        </Fragment>
                        }
                        {!expandForm &&
                        <div className="submitSection">
                            <div id="recaptcha-container"></div>
                            <button className="submitButton">Sign In</button>
                        </div>
                        }
                        <div className="footersection">
                            <span className="signinText">New to Netflix? <span className="signinLink" onClick={() => { navigate('/signup') }}>
                                Signup Now</span></span><br /><br />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Phone

