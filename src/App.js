import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase config';
import { useState } from 'react';

firebase.initializeApp(firebaseConfig);

function App(className="App") {
  const [user, setUser] = useState({
    isSignedIn: false,
    name : '',
    photo : '',
    email : '',
  })

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleClick = () => {
  firebase.auth().signInWithPopup(provider)
  .then(result => {
    const {displayName, photoURL, email} = result.user;
    const signedInUser = {
      isSignedIn: true,
      name: displayName,
      photo: photoURL,
      email: email,
    }
    console.log(displayName, photoURL, email);
    console.log(result);
    setUser(signedInUser);
  })
  .catch(err => {
    console.error(err);
    console.log(err.message);
  })

}

const handleSignOut = () =>{
  firebase.auth().signOut()
  .then(result =>{
    const signedOutUser = {
      isSignedIn: false,
      name : '',
      photo : '',
      email : '',
    }
    setUser(signedOutUser);
  })
  .catch(err =>{

  })
}

  return (
    <div>
      { user.isSignedIn ? <button onClick={handleSignOut}>Sign Out</button>:
        <button onClick={handleClick}>Sign in</button>
      }
      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }
    </div>
  );
}

export default App;
