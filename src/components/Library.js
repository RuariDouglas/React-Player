import React from "react";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
const Library = ({
  currentSong,
  songs,
  setCurrentSong,
  libraryStatus,
  setLibraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "shown" : ""}`}>
      <div className="library-head">
        <h1>Library</h1>
        <button onClick={() => setLibraryStatus(!libraryStatus)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <LibrarySong
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
              songs={songs}
              song={song}
              id={song.id}
              key={song.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Library;
