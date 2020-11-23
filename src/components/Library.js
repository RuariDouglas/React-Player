import React from "react";
import LibrarySong from "./LibrarySong";
const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "shown" : ""}`}>
      <h1>Library</h1>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              setCurrentSong={setCurrentSong}
              songs={songs}
              song={song}
              id={song.id}
              key={song.id}
              audioRef={audioRef}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
