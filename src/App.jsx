import { useState } from 'react'
import './App.css'

import { DrumTiles } from './assets/data'

function App() {
  const [type, setType] = useState('')
  const [volume, setVolume] = useState("50")
  const [audioVolume, setAudioVolume] =useState('0.5');

  let letters = [];
  for(let i=0; i<DrumTiles.length; i++){
    let {letter} = DrumTiles[i];
    letters.push(letter);
  }

  function handleKeyPress (e){
    let key = e.key.toUpperCase();
    const sourceFinder = (letter) => letter===key;
    let index = letters.findIndex(sourceFinder);
    if(index<0){
      return;
    }
   audioCreation(index);
  }

  function audioCreation(index){
    console.log(audioVolume);
    let audio = new Audio(DrumTiles[index].src);
    audio.volume=audioVolume;
    audio.play();
    document.getElementById(DrumTiles[index].id).style.backgroundColor ='#E4CC37';
    setType(DrumTiles[index].id); 
  }

  function handleKeyUp(e){
    let key = e.key.toUpperCase();
    const sourceFinder = (letter) => letter===key;
    let index = letters.findIndex(sourceFinder);
    if(index<0){
      return;
    }
    document.getElementById(DrumTiles[index].id).style.backgroundColor ='#0072BB';
  }



  return (
    <>
    <div id='wrapper' tabIndex= '0'    
            onKeyDown={(e)=>{
                        handleKeyPress(e);
                      }}
                onKeyUp={(e)=>{
                  handleKeyUp(e);
                }}>
      <div id= "drum-machine">
            <div id='title'>
                <h1> Emojica Fabulous drum Machine</h1>
            </div>
            <div id='tileSpace' tabIndex='0'>
              {DrumTiles.map((drum) => (
                <div  key={drum.letter} className={drum.className} id={drum.id} 
             
               
                onClick={()=>{
                  setType(drum.id);
                  let audio = new Audio(drum.src);
                  audio.volume = audioVolume;
                  audio.play();
                }
                }
               >
                  {drum.letter}
                  <audio src={drum.src} type={drum.type} />
                </div>
              ))}
            </div>
            <div id='display'>
              {type}
            </div>
            <div id="controls">
              <div id='volume-slider'>
                <input max="1" min="0" step="0.01" type='range' name='volume' defaultValue='0.5' onChange={(e)=>{
                  let volume = Math.floor(e.target.value * 100)
                  setVolume(volume)
                  setAudioVolume(e.target.value);
                }}/>
                <label htmlFor='volume'>Volume: {volume} </label>
              </div>
            </div>
      </div>
    </div>
      
    </>
  )
}

export default App
