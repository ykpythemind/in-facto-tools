"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { RiVoiceprintFill, RiVolumeMuteFill } from "react-icons/ri";
import { BsDisplay } from "react-icons/bs";
import { useProfileBlockRef, ProfileBlock } from "./ProfileBlock";

export const Main = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const { audioRef: audioRef1 } = useProfileBlockRef();
  const { audioRef: audioRef2 } = useProfileBlockRef();
  const { audioRef: audioRef3, videoRef: videoRef3 } = useProfileBlockRef();
  const { audioRef: audioRef4 } = useProfileBlockRef();

  const [started, setStarted] = useState(false);
  const [video3On, setVideo3On] = useState(false);
  const [video3Muted, setVideo3Muted] = useState(true);

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
          audioRef2.current.currentTime = seconds;
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
      audioRef2.current?.play();
      audioRef3.current?.play();
      audioRef4.current?.play();
    }
  }, [started, videoRef, audioRef1, audioRef2, audioRef3, audioRef4]);

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (started) {
        setCurrentTime((t) => t + 5);
      }
    }, 5);

    return () => {
      clearInterval(timer);
    };
  }, [started]);

  useEffect(() => {
    if (currentTime > 1000) {
      setVideo3On(true);
    }
    if (currentTime > 900) {
      setVideo3Muted(false);
    }
  }, [currentTime]);

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
          {/* <img src="/delivery_image.jpg" className="w-full" /> */}
          <video
            src="/P1033141_1.mp4"
            className="w-full rounded-lg"
            loop
            muted
            ref={videoRef}
          />

          <div className="mt-10">
            <div className="rounded-lg bg-gray2 p-4 flex items-center">
              <BsDisplay size={26} />
              <div className="ml-5">
                ykpy さんの画面が全員に共有されています
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-1 gap-4 justify-center">
            <ProfileBlock
              name="ykpyt"
              iconUrl="/ykp.png"
              audioUrl="/talk-osd.mp3"
              audioRef={audioRef1}
            />
            <ProfileBlock
              name="osd"
              iconUrl="https://avatars.githubusercontent.com/u/65229525?v=4"
              audioUrl="/talk-osd2.mp3"
              sensitivity={-0.1}
              audioRef={audioRef2}
              isMuted
            />
            <ProfileBlock
              name="osd2"
              iconUrl="https://avatars.githubusercontent.com/u/65229525?v=4"
              audioUrl="/talk-osd3.mp3"
              sensitivity={-0.1}
              isVideoOn={video3On}
              isMuted={video3Muted}
              videoRef={videoRef3}
              audioRef={audioRef3}
              videoUrl="/20230709_tyousahoukoku_rokehan.mp4"
            />
            <ProfileBlock
              name="遠嶋"
              iconUrl="https://github.com/tontoko.png"
              audioUrl="/talk-osd2.mp3"
              sensitivity={-0.1}
              audioRef={audioRef4}
            />
          </div>
        </div>
      </div>
    </main>
  );
};
