import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'
import { FirebaseContext } from './store/firebaseContext';
import firebase from './Firebase/firebase';
import { ViewPost } from './store/viewPost';
import { User} from './store/userContext'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <User>
        <ViewPost>
            <FirebaseContext.Provider value={{ firebase }}>
                <App />
            </FirebaseContext.Provider>
        </ViewPost>
    </User>
    );