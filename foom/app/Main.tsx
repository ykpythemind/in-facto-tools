"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { RiVoiceprintFill, RiVolumeMuteFill } from "react-icons/ri";
import { BsDisplay } from "react-icons/bs";
import { useProfileBlockRef, ProfileBlock } from "./ProfileBlock";

const lastAudioOnMilliSec = 87 * 1000;

export const Main = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { audioRef: audioRef1 } = useProfileBlockRef();
  const { audioRef: dummyRef, videoRef: videoRefLast } = useProfileBlockRef();
  const { audioRef: audioRef3 } = useProfileBlockRef();
  const { audioRef: audioRef4 } = useProfileBlockRef();

  const [started, setStarted] = useState(false);
  const [lastVideoOn, setlastVideoOn] = useState(false);
  const [video2Muted, setVideo2Muted] = useState(true);
  const [video3Muted, setVideo3Muted] = useState(true);
  const [video4Muted, setVideo4Muted] = useState(true);

  const [lastAudioStarted, setLastAudioStarted] = useState(false);

  useEffect(() => {
    const listener = function (event) {
      // console.log("event.key: " + event.key);
      if (event.key === "!") {
        setStarted(true);
      }
      if (event.key === "@") {
        const sec = prompt("seconds");
        if (sec) {
          const seconds = Number(sec);
          setCurrentTime(seconds * 1000);
          videoRef.current.currentTime = seconds;
          audioRef1.current.currentTime = seconds;
          // audioRef2.current.currentTime = seconds;
          audioRef3.current.currentTime = seconds;
          audioRef4.current.currentTime = seconds;
        }
      }
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    if (started) {
      videoRef.current?.play();
      audioRef1.current?.play();
      // audioRef2.current?.play();
      // audioRef3.current?.play();
      // audioRef4.current?.play();
    }
  }, [started, videoRef, audioRef1, audioRef3, audioRef4]);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // setCurrentTime((t) => t + 5);
      if (videoRef.current.currentTime > lastAudioOnMilliSec / 1000) {
        setLastAudioStarted(true);
      }
    }, 5);

    return () => {
      clearInterval(timer);
    };
  }, [started]);

  // useEffect(() => {
  //   if (currentTime > lastAudioOnMilliSec) {
  //     setLastAudioStarted(true);
  //   }
  // }, [currentTime, videoRef]);

  useEffect(() => {
    if (lastAudioStarted) {
      videoRef.current.pause();
      setlastVideoOn(true);

      setTimeout(() => {
        videoRefLast?.current.play();
      }, 800);

      setTimeout(() => {
        setVideo4Muted(false);
      }, 400);
      setTimeout(() => {
        setVideo3Muted(false);
      }, 1400);
      audioRef3.current?.play();
      audioRef4.current?.play();
    }
  }, [lastAudioStarted, videoRef, audioRef3, audioRef4]);

  const onClickStart = () => {
    setStarted(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-base text-white">
      {!started && (
        <div className="absolute top-0" onClick={onClickStart}>
          start
        </div>
      )}
      <div className="w-full h-full grid grid-cols-4 gap-6 place-content-stretch">
        <div className="col-span-3 h-full flex flex-col justify-center ">
          <video
            src="/kari_last_embed_video.mp4"
            className="w-full rounded-lg"
            loop
            muted
            ref={videoRef}
          />

          <div className="mt-10">
            <div className="rounded-lg bg-gray2 p-4 flex items-center">
              <BsDisplay size={26} />
              <div className="ml-5">
                西山 さんの画面が全員に共有されています
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-1 gap-5 justify-center">
            <ProfileBlock
              name="西山"
              iconUrl="/a.jpg"
              audioUrl="/nishiyama_full.mp3"
              audioRef={audioRef1}
              sensitivity={0.05}
            />
            <ProfileBlock
              name="柳瀬 和寿"
              iconUrl="/nishiyama.png"
              sensitivity={0.07}
              audioRef={dummyRef}
              videoRef={videoRefLast}
              isMuted={video2Muted}
              isVideoOn={lastVideoOn}
              videoUrl="/yanase_last_2.mov"
            />
            <ProfileBlock
              name="髙橋"
              audioUrl="/takahashi_1.m4a"
              iconUrl="/d.jpg"
              sensitivity={0.07}
              isMuted={video3Muted}
              audioRef={audioRef3}
            />
            <ProfileBlock
              name="Tomita"
              iconUrl="/tomita.jpeg"
              audioUrl="/tomita_1.m4a"
              sensitivity={0.07}
              isMuted={video4Muted}
              audioRef={audioRef4}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
