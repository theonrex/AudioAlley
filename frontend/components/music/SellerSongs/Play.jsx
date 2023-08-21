

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
const ReactJkMusicPlayer = dynamic(() => import("react-jinke-music-player"), {
  ssr: false,
});
import { MusicData } from "./MusicData";

const Demo = () => {
  const [songs, setSongs] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  const [selectedSongIndex, setSelectedSongIndex] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const items = await MusicData();
      setSongs(items);
      setLoadingState("loaded");
    }
    fetchData();
  }, []);

  const audioList1 = songs.map((song) => ({
    name: song.name,
    singer: song.artistName,
    cover: song.image,
    musicSrc: song.fileUrl,
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
  const [isPlaying, setIsPlaying] = useState(false);

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

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSongClick = (index) => {
    setSelectedSongIndex(index);
    setIsPlaying(true);
  };

  const renderCustomUI = () => {
    return (
      <>
        <audio ref={audioRef} src={songs[selectedSongIndex]?.fileUrl} />
        <button
          type="button"
          onClick={togglePlayPause}
          className="togglePlayPause"
        >
          {isPlaying ? (
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB/klEQVR4nO2ay0rDQBRAs9K6UCpo604/RhRB0aWt3yAV/0LrQlEQt36Ctqh/UMS1fa58bMS69lE8cmEWQaZpkibNTOiBQqDJJYeZ3Nw7E8cZk1KAWWALKANVoAF8AF/qJ8d19Z+cswlkHRMAJoEd4A7oERy55gYoSiwnAYEpYB94JTpegD0gMyqJNaBDfLSB1bin0Qmj41JGPmqJPPDA6LkHclFJLKnhToqW3MOwEvMqjSZNB1gIK5FJaDp5TbPgKRo4xzxOw6RYU1kJkmabmEvb10tTvbFNp+RnNKRUMJ1nzwdfFYCB6RNr6HMHUPASkSrWFpGqVz/Rs0jkB5jRBZOmCItEhHVdsCPsEznUBZMW1DaRK10wqTJtE2nognUtFHnTBZOVDttEPlMt0k3L1GpaKFJPdfotWyhykOoSJWtZ0fitLRpVwFuLRCpaCRWwaJHIdlpa3Ym+IkpGlvZNZ9dTwjUqJiyT9qPle8VR9icwk19g2ZeES+YM8zgOJOGaYrJwbAq1gQ+4h8ycQdsK+VAS/zZ6QrfBEdAEFoeScMnkEppmNdlsikRCsxkqmWMUXMS69y77EzFPtUbgFDvk6JRUqRAVT/LGTuoLCBEqqO5S1mKDItdUpAAMnVqjRnoDYEOWMYFr9QHNu+ujGjl+lPZUOjtpioDpyG9kjGMGfyi/9/5JKvTGAAAAAElFTkSuQmCC" />
          ) : (
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2WO0oEQRBAB0wNTAz8rJh5BEMRI0HFUyi6H69gaGqmKAaGGq96BNHEzBFvYOasgbC7PGkooRGsru7pRYN9MDAMXfOompruKoox/w1gAWgDd0AJfMhVyrMW0MgpnANOgQFhhsAVsFhXug30iKcCtlKlB5JBKi62k5LpsIbUl9syB+YTy6uVfdYiviA/Z5ZfJtS9q9K5MQxcJTVxJ/QGb+0ycB8hb2riW6tY1k8AO8CbQdzVxK8xYi9uEjgEPpXQUhNXKWIvfgl4+CW0GrX4MUX8kiIGpoCjQKmfczfXbo7malnFwArwhJ09TdwwbCBrwDVx9NUNROTn5OdElXoHf7C7I3gHZoJika8bJw7Lsbhpkv7Yt+sOAu0o6TfuEE8suyvvRlEHYBo4ls60ZHlp/qYRk0kTuHG7kEwpPbnvAvvBX2ZM8Qd8AZFR0smzUhZQAAAAAElFTkSuQmCC" />
          )}
        </button>
      </>
    );
  };



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

export default Demo;

