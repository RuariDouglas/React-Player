import React from "react";

const LibrarySong = ({ song, songs, setCurrentSong, id, setSongs }) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
  };

  const updatedSongs = () => {
    setSongs(
      songs.map((targetSong) => {
        return {
          ...targetSong,
          active: targetSong.id === song.id,
        };
      })
    );
  };
  return (
    <div
      // We can add classes if conditions are passed, directly in the event handler
      className={`library-song ${song.active ? "selected" : ""}`}
      onClick={() => {
        songSelectHandler();
        updatedSongs();
      }}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
