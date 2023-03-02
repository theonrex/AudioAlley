import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactJkMusicPlayer = dynamic(() => import("react-jinke-music-player"), {
  ssr: false,
});

const MusicID = () => {
  const [songs, setSongs] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);



  const audioList1 = songs.map((nftData) => ({
    name: nftData.name,
    singer: nftData.artistName,
    cover: nftData.image,
    musicSrc: nftData.fileUrl,
  }));

  console.log(audioList1);

  const options = {
    preload: false,
    defaultPlayMode: "order",
    mode: "full",
    autoPlay: false,
    responsive: false,
  };

  const [params, setParams] = useState({
    ...options,
  });
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef({});
  console.log(audioRef);

  const handleGetAudioInstance = (audio) => {
    audioRef.current = audio;
  };




  const handleSongClick = (index) => {
    setSelectedSongIndex(index);
    setIsPlaying(true);
  };


  if (loadingState === "not-loaded") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="settings">
        {/* <div>{renderCustomUI()}</div> */}
      </section>
      {loadingState === "loaded" && (
        <ReactJkMusicPlayer
          audioLists={audioList1}
          {...params}
          getAudioInstance={handleGetAudioInstance}
          onClickAudioList={(item, index) => handleSongClick(index)}
        />
      )}
    </>
  );
};

export default MusicID;
