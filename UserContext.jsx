import React,{createContext, useState} from 'react'
import run from '../gemini';
 export const datacontext=createContext()

function UserContext({children}){
let [speaking,setSpeaking]=useState(false)
let [prompt,setprompt]=useState("listening...")
let [response,setResponse]=useState(false)

  function speak(text){
    let text_speak=new SpeechSynthesisUtterance(text)
    text_speak.volume=1;
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.lang="en-GB";
    window.speechSynthesis.speak(text_speak)
  }
   
 async function aiResponse(prompt){
  let text = await run(prompt)
  let newText=text.split("**")&&text.split("*")&&text.replace("google","Arbaz Alam")&&text.replace("Google","Arbaz Alam")
  setprompt(newText)
  speak(newText)
  setResponse(true)
  setTimeout(()=>{
    setSpeaking(false)
  },5000)
  
 }

  let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition=new speechRecognition()
  recognition.onresult=(e)=>{
    let currentIndex=e.resultIndex 
    let transcript=e.results[currentIndex][0].transcript
    setprompt(transcript)
    takeCommand(transcript.toLowerCase())
  }

  function takeCommand(command){
    if(command.includes("open") && command.includes("youtube")){
      window.open("https://www.youtube.com/","_blank")
      speak("Sure sir")
      setprompt("opening Youtube...")
      setTimeout(()=>{
        setSpeaking(false)
      },5000)
    } else if(command.includes("open") && command.includes("google")){
      window.open("https://www.google.com/","_blank")
      speak("sure sir")
      setprompt("opening google...")
      setTimeout(()=>{
        setSpeaking(false)
      },5000)
    } else if(command.includes("open") && command.includes("instagram")){
      window.open("https://www.instagram.com/","_blank")
      speak("opening instagram")
      setprompt("opening instagram...")
      setTimeout(()=>{
        setSpeaking(false)
      },5000)
    } else if (command.includes("song")) {
      const trendingSongs = [
        "https://www.youtube.com/watch?v=hXtq-Bbvq4E", // Replace with real trending URLs
        "https://www.youtube.com/watch?v=-2RAq5o5pwc",
        "https://www.youtube.com/watch?v=Y-FLQzB4n3g&list=RDMM&start_radio=1&rv=-2RAq5o5pwc",
        "https://www.youtube.com/watch?v=lBvbNxiVmZA&list=RDMM&index=2",
        "https://www.youtube.com/watch?v=mcukmuDZy9U&list=RDMM&index=6",
        "https://www.youtube.com/watch?v=oSHzUD-uqKY"

      ];
    
      const randomIndex = Math.floor(Math.random() * trendingSongs.length);
      const selectedSong = trendingSongs[randomIndex];
    
      window.open(selectedSong, "_blank");
      speak("Sure sir, playing a song.");
      setprompt("Playing a trending song...");
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    }
    else if (command.includes("date") || command.includes("time")) {
      const now = new Date();
      
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      
      const dateTime = now.toLocaleString("en-GB", options);
      
      speak("The current date and time is " + dateTime);
      setprompt("The current date and time is: " + dateTime);
      
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    }
    
    else{
      aiResponse(command)
    }
  }


  let value={
     recognition,
     speaking,
     setSpeaking,
     prompt,
     setprompt,
     response,
     setResponse
  }
  return(
    <div>
      <datacontext.Provider value={value}>
      {children}
      </datacontext.Provider>
    </div>
  )
}

export default UserContext;