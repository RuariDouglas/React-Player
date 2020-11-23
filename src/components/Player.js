import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
}) => {
  // EVENT HANDLERS //
  // PLAY/PAUSE
  const playSongHandler = () => {
    /* - When we click play this function evaluates if our 'isPlaying' tracker variable is set to false or true and proceeds accordingly. See Core-Concept notes on useRef and current
    After this has been evaluated and executed we change the state of 'isPlaying' by passing in !isPlaying, we are saying "Set this to the opposite of the current value of 'isPlaying'. */
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };
  //---------------------------------
  // CURRENT TIME/DURATION
  const timeUpdateHandler = (e) => {
    /* - Because this is an event handler, we utilise the 'e' (event) property. Within this property we can access the currentTime of an audio file, we do this and assign the value to a variable.  */
    /* - Using the same logic we store the duration time of the audio file as well. */
    /* - Then we just have to change the state of songInfo. So again we call on setSongInfo({}), passing in firstly the existing ...songInfo, then we update our songInfo properties by passing in these variables as values of properties. Notice for duration we have only declare one value, that's because if your property name and value match you can declare just the single name  */
    const current = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime: current, duration: duration });
  };
  //---------------------------------
  // FORMAT TIME
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  //---------------------------------
  // RANGE DRAGGER
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  //---------------------------------
  // AUTO-PLAY
  const autoPlayHandler = () => {
    /* This event is triggered on the audio tag "onLoadedData" */
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div className="player">
      <div className="time-control">
        {/* Just like in the hours calculator, we simply call on our functions and pass in the variable */}
        <p>{getTime(songInfo.currentTime)}</p>
        <input
          min={0}
          max={songInfo.duration}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        <p>{getTime(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" size="2x" icon={faAngleLeft} />
        <FontAwesomeIcon
          // On our play button, we pass in our playSongHandler as a click event
          onClick={playSongHandler}
          className="play"
          size="2x"
          // To change the icon we can simply pass in a ternary operator to determine which one should be displayed.
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        // The onTimeUpdate Event fires everytime there is a time change in the audiofile.
        onTimeUpdate={timeUpdateHandler}
        /* onLoadedMetaData is an event that will fire when the component has mounted (audio file loads up) and will immediately send the song data to our function to present  */
        onLoadedMetadata={timeUpdateHandler}
        onLoadedData={autoPlayHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
