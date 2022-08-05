import React,{Fragment, useContext, useEffect} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import LoginPage from './Pages/Login/Login'
import SignupPage from './Pages/Signup/Signup';
import PhoneLogin from './Pages/Phone/Phone';
import ViewPage from './Pages/View/View';
import { FirebaseContext } from './store/firebaseContext';
import { UserContext } from './store/userContext';

function App() {
  const {firebase} = useContext(FirebaseContext);
  const {setUser} = useContext(UserContext);

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user);
    })
  })
  
  return (
    <Fragment>
      <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/phone' element={<PhoneLogin />} />
                <Route path='/view' element={<ViewPage />} />
            </Routes>
        </BrowserRouter>
    </Fragment>

    )
};

export default App;