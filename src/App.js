import React, { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {

  //Stateknél nem kell frissíteni az oldalt, azért jobb mint a változók
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    //Run code here
    // Ha a [] üres, akkor ez a kód amit itt írunk EGYSZER fog lefutni amikor a komponens betölt
    setUsername(prompt('Please Enter Your Name')) 
  }, [] ) //Condition

  useEffect(() =>{
    //Egyszer fut le amikor a komponens betölt
    //onSnapshot -> ha akármilyen változást talál beledobja a snapshotba
    // A doc a adatbazison belüli document-ek
    //a map-al bejárjuk és kiszedjük a dokumentumokban lévő adatokat
    db.collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    }); 
  }, [])

  const sendMessage = (event) => {
    //...messages -> tartsd meg az összes alap messaget, és tedd hozzá pluszba az inputban lévőket!!!
    event.preventDefault();
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMessages([...messages, {username: username, message: input}]);
    setInput('');
  }

  return (
    <div className="App">
      <img src="https://image.flaticon.com/icons/svg/2950/2950657.svg" width="10%" />
        <h1 className="welcomeText">Szia {username}!  Kezdj el chatelni. 🤙 </h1>
      {/* Form újra tölri az oldalt, ami nem jó nekünk 
      event.preventDefault(); Ezzel működik */}
      <form className="app__form">
        <FormControl className="app__formControl center">
          <InputLabel>Enter a message...</InputLabel>
          <Input className="app__input" value={input} onChange={event => setInput(event.target.value)} />


          <IconButton className="app__iconButton" disabled={!input}  
            variant="contained" 
            color="primary" 
            type='submit' 
            onClick={sendMessage}>
              <SendIcon></SendIcon>
          </IconButton>

          {/* type=submit --> enterrel is megy */}
        </FormControl>
      </form>


      <FlipMove className="messages__box">
      {
        //Bejárja a messages tömböt, és minden egyes elemét kiírja!
        messages.map(({id, message}) => (
          <Message key={id} username={username}  message={message}/>
        ))
      }
      </FlipMove>
      
    </div>
  );
}

export default App;
