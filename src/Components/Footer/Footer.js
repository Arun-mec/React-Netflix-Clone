import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Footer.css'
function Footer() {
    const navigate = useNavigate();
  return (
    <div>
        <div className="footerParentDiv">
        <div className="footerChildDiv">
            <div className="childTopDiv">
                <span className="qns">Questions? Call 000-800-040-1843</span>
            </div>
            <div className="childBottomDiv">
                <div className="optionsrow">
                    <div className="options"><span onClick={()=>{alert("Sorry, this feature hasn't implemented yet");}}>FAQ</span></div>
                    <div className="options"><span onClick={()=>{alert("Sorry, this feature hasn't implemented yet");}}>Help Center</span></div>
                    <div className="options"><span onClick={()=>{alert("Sorry, this feature hasn't implemented yet");}}>Terms of service</span></div>
                    <div className="options"><span onClick={()=>{alert("Sorry, this feature hasn't implemented yet");}}>Privacy</span></div>
                    <div className="options"><span onClick={()=>{alert("Sorry, this feature hasn't implemented yet");}}>Cookie Preferences</span></div>
                    <div className="options"><span onClick={()=>{alert("Sorry, this feature hasn't implemented yet");}}>Corporate Information</span></div>
                </div>
            </div>
            <div className="childButtonDiv">
                <div className= "button">
                    <span>English</span>
                </div>
                <div className= "button" onClick={()=>{navigate('/')}}>
                    <span>Homepage</span>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Footer