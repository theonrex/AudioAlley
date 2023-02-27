import Switch from "rc-switch";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactJkMusicPlayer = dynamic(() => import("react-jinke-music-player"), {
  ssr: false,
});
import { MusicData } from "./MusicData";

const Play = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");

  useEffect(() => {
    async function fetchData() {
      const items = await MusicData();
      setNfts(items);
      setLoadingState("loaded");
    }
    fetchData();
  }, []);

  const audioList1 = nfts.map((nft) => ({
    name: nft.name,
    singer: nft.owner,
    cover: nft.image,
    musicSrc: nft.fileUrl,
  }));

  const options = {
    preload: false,
    defaultPlayMode: "order",
    mode: "full",
    autoPlay: false,
    responsive: false,
  };

  const [unmount, setUnmount] = useState(false);
  const [params, setParams] = useState({
    ...options,
  });

  const audioRef = useRef({});

  const handleGetAudioInstance = (audio) => {
    audioRef.current = audio;
  };

  const updateParams = (newParams) => {
    setParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  const renderCustomUI = () => {
    return (
        <>
            
      
        <button type="button" onClick={() => audioRef.current.play()}>
          play
        </button>
        <button type="button" onClick={() => audioRef.current.pause()}>
          pause
        </button>
      </>
    );
  };

  if (loadingState === "not-loaded") {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="settings">
        <div>{renderCustomUI()}</div>
      </section>
      {loadingState === "loaded" && (
        <ReactJkMusicPlayer
          audioLists={audioList1}
          {...params}
          getAudioInstance={handleGetAudioInstance}
        />
      )}
    </>
  );
};

export default Play;
