import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StartPage from './components/StartPage';
import PlayPage from './components/PlayPage';

function App() {
  const [page, setPage] = useState("start");
  const [player,setPlayer] = useState(null);

  console.log("APP", page, player);

  return (
    <>
      {
        page == "start" && player == null
        ? <StartPage setPlayer={setPlayer} setPage={setPage} />
        : null
      }
      {
        page == "play" && player != null
        ? <PlayPage player={player} setPage={setPage} setPlayer={setPlayer} />
        : null
      }
    </>
  )
}

export default App
