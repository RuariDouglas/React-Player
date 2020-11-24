import React from "react";

const Song = ({ currentSong, libraryStatus, isPlaying }) => {
  return (
    <div className={`song-container ${libraryStatus ? "active" : ""}`}>
      <img
        className={`song-cover ${isPlaying ? "rotateSong" : ""}`}
        alt={currentSong.name}
        src={currentSong.cover}
      ></img>
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
