// Misc
import React, { useState, useRef } from "react";
// DATA ARRAY/OBJECT
import data from "./data";
//CSS
import "./styles/App.scss";
// COMPONENTS
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";

// MAIN APP FUNCTION
function App() {
  // -------------- REF ------------- //
  const audioRef = useRef(null);

  /* -------------- STATES ------------- //
  1. Keeps track and allows changes to song time.
  2. Here we are getting all of the songs and assigning them to a state variable. This returns the array of objects containing all the songs.
  3. Now, we set up a state for the current song as this content will change. We can set the currentSong to the first song in our list by accessing the 0 index of our songs variable.
  4. Acts as a state toggle for Play/Pause
  5. Similar to 4. This toggles and tracks if our library will be shown or hidden.
  */

  // 1.
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  // 2.
  const [songs, setSongs] = useState(data());
  // 3.
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // 4.
  const [isPlaying, setIsPlaying] = useState(false);
  // 5.
  const [libraryStatus, setLibraryStatus] = useState(false);

  return (
    <div className="App">
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song
        isPlaying={isPlaying}
        libraryStatus={libraryStatus}
        currentSong={currentSong}
      />
      <Player
        songs={songs}
        setSongs={setSongs}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        libraryStatus={libraryStatus}
      />
      <Library
        currentSong={currentSong}
        audioRef={audioRef}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
    </div>
  );
}

export default App;
