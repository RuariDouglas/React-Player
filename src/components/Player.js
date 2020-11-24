//----------------- IMPORTS -----------------//
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  songs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  libraryStatus,
}) => {
  //----------------- EVENT HANDLERS -----------------//
  // #. FORMAT TIME
  // This formats the start time & duration for display.
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  // #. RANGE DRAGGER
  // This syncs and tracks our drag handler with the the position of the song vs the position of the handler.
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  // #. PLAY/PAUSE
  /* - When we click play this function evaluates if our 'isPlaying' tracker variable is set to false or true and proceeds accordingly. See Core-Concept notes on useRef and 'current'. */
  /* - After this has been evaluated and executed we change the state of 'isPlaying' by passing in !isPlaying, we are saying "Set this to the opposite of the current value of 'isPlaying'. */
  const playSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // #. CURRENT TIME/DURATION
  /* - Because this is an event handler, we utilise the 'e' (event) property. Within this property we can access the currentTime of an audio file, we do this and assign the value to a variable.  */
  /* - Using the same logic we store the duration time of the audio file as well. */
  /* -  */
  /* - Then we just have to change the state of songInfo. So again we call on setSongInfo({}), passing in firstly the existing ...songInfo, then we update our songInfo properties by passing in these variables as values of properties. Notice for duration we have only declare one value, that's because if your property name and value match you can declare just the single name  */
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const animation = Math.round((current / duration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  // #. AUTO-PLAY
  // This triggers autoplay when the song changes by checking to see if 'isPlaying' is true.
  const autoPlayHandler = () => {
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  // #. SKIP TRACK HANDLER
  /* - This controls the back and forwards buttons on the player. By passing in a -1 or 1 as an argument in our controls, we use this to set what the next index target is.
  - We check to see if the first or last index is reached in order to continue cycling through the songs.
  */
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    } else if (newIndex >= songs.length) {
      newIndex = 0;
    }
    setCurrentSong(songs[newIndex]);
  };

  // #. ADD STYLES
  const trackAnimation = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };

  return (
    <div className={`player ${libraryStatus ? "active" : ""}`}>
      <div className="time-control">
        {/* #. Just like in the hours calculator, we simply call on our time format function and pass in the variable */}
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            /* 2. This event fires when the range dragger position changes */
            onChange={dragHandler}
            type="range"
          />
          <div className="animate-track" style={trackAnimation}></div>
        </div>
        {/* #. Again */}
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(-1)}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          // #. On our play button, we pass in our playSongHandler as a click event
          onClick={playSongHandler}
          className="play"
          size="2x"
          // To change the icon we can simply pass in a ternary operator to determine which one should be displayed.
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(1)}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        // #. The onTimeUpdate Event fires everytime there is a time change in the audiofile.
        onTimeUpdate={timeUpdateHandler}
        /* #. onLoadedMetaData is an event that will fire when the component has mounted (audio file loads up) and will immediately send the song data to our function to present  */
        onLoadedMetadata={timeUpdateHandler}
        /* #. This event fires when a song is changed and negates us having to hit play on each new song */
        onLoadedData={autoPlayHandler}
        onEnded={() => skipTrackHandler(1)}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
