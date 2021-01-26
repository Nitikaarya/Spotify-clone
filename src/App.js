import React, { useEffect } from 'react';
import SpotifyWebApi from "spotify-web-api-js"; 
import { useStateValue } from './StateProvider';
import Player from './Player';
import { getTokenFromUrl } from './spotify';
import './App.css';
import Login from './Login';

const spotify = new SpotifyWebApi();

function App() {
  const [{user, token }, dispatch] = useStateValue();

  // Run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token) {
      dispatch({
        type: "SET_TOKEN",
        token: _token,
      })
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch({
          type: "SET_USER",
          user: user,
        });
      });
      
  spotify.getUserPlaylists().then((playlists) => { 
    dispatch({
      type: "SET_PALYLISTS",
        playlists:playlists,  
      });
    });

      spotify.getPlaylist('37i9dQZEVXcQghL6pZCJWp').then(response => 
      dispatch ({
        type: "SET_DISCOVER_WEEKLY",
        discover_weekly: response,
      })
    );
  }
  }, []);

  return (
    <div className="App">
      {/*spotify logo  */}
      {/*login  with spotify button*/}
      {
        token ? (
          <Player Spotify={spotify}/>
        ) : (
          <Login/>
        )
      }
    </div>
  );
}
export default App; 