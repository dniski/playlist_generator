import { useState } from 'react'
import styles from './index.module.css'
import spotifyLogo from './assets/social.png'
function App() {
  const [count, setCount] = useState(0)
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistLength, setPlaylistLength] = useState(0); 

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!", playlistName + " \n " + playlistDescription + " \n" + playlistLength);
  }

  return(
    <main className={styles.main}>
      <img  src={spotifyLogo} alt="" className={styles.icon}/>
      <h3>Generate music playlist with AI: </h3>

      <form action="" onSubmit={onSubmit}>

        <input type="text" 
          name='playlist-name' 
          placeholder="Name your playlist: "
          onChange={(e) => setPlaylistName(e.target.value)}/>

        <input type="text" 
          name="playlist-description" 
          placeholder="Describe your playlist:"
          onChange={(e) =>  setPlaylistDescription(e.target.value)}/>

        <input type="number" 
          name="playlist-length" 
          min="5" 
          max="30" 
          placeholder="Playlist length (5-30)"
          onChange={(e) => setPlaylistLength(e.target.value)}/>

        <input type="submit" value="Generate!"/>

      </form>
    </main>
  )
}

export default App
