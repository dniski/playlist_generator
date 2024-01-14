import { useState, useEffect} from 'react'
import styles from './index.module.css'
import spotifyLogo from './assets/social.png'


function App() {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const [playlistLength, setPlaylistLength] = useState(0); 
  const [playlist, setPlaylist] = useState("");
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash.substring(1).split("&").find((elem) => elem.startsWith("access_token")).split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);

  const spotifyLogin = () => {
    const clientId = '2dfa0bd8422646c5b4a759b9b42398ed';
    const redirectUri = "http://localhost:5173/";
    const scopes = ['playlist-modify-public'];
    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
    window.location = url;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const generatedPlaylist = await generatePlaylist();
    setPlaylist(generatedPlaylist);
    console.log("returned from server: ", generatedPlaylist);
  }

  const generatePlaylist = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({playlistName: playlistName, playlistDescription: playlistDescription, playlistLength: playlistLength})
    } )
    const data = await response.json();
    return data.response;
  } 


  return(
    <main className={styles.main}>
    <img  src={spotifyLogo} alt="" className={styles.icon}/>
      { token? (
        <>
      
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
        <pre>{playlist}</pre>

      </form>
      </>
      ) : (
        <>
          <h3>Generate music playlist with AI: </h3>
          <button onClick={spotifyLogin}>Log In To Start</button>
        </>
      )}
    </main>
  )
}

export default App
