"use client";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { RiVoiceprintFill, RiVolumeMuteFill } from "react-icons/ri";

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
        setStarted(true);
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
        <div className="col-span-3 h-full flex justify-center">
          {/* <img src="/delivery_image.jpg" className="w-full" /> */}
          <video
            src="/P1033141_1.mp4"
            className="w-full"
            loop
            muted
            ref={videoRef}
          />
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-1 gap-4">
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

type ProfileBlockProps = {
  name: string;
  iconUrl: string;
  audioUrl: string;
  videoUrl?: string;
  sensitivity?: number;
  isMuted?: boolean;
  isVideoOn?: boolean;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
  videoRef?: MutableRefObject<HTMLVideoElement | null>;
};

const ProfileBlock = (props: ProfileBlockProps) => {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const talking = useRef<Array<number>>([]);

  // const [volState, setVolState] = useState<0 | 1 | 2>(0);
  const [averageVol, setCurrentAverageVol] = useState(0);
  const {
    sensitivity = 0,
    isMuted = false,
    isVideoOn = false,
    audioRef,
    videoRef,
    videoUrl,
  } = props;

  useEffect(() => {
    if (isVideoOn) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [isVideoOn, videoRef]);

  useEffect(() => {
    const fn = async () => {
      if (!audioRef.current) {
        throw new Error("audiorefがnull");
      }
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      const analyser = audioCtxRef.current.createAnalyser();

      analyser.fftSize = 2048; // FFTサイズ
      analyser.smoothingTimeConstant = 1;
      // analyser.minDecibels = -90;
      // analyser.maxDecibels = -10;
      const dataArray = new Uint8Array(analyser.fftSize);
      const bufferLength = dataArray.length;
      analyser.getByteTimeDomainData(dataArray);
      if (!sourceRef.current) {
        sourceRef.current = audioCtxRef.current.createMediaElementSource(
          audioRef.current
        );
      }

      sourceRef.current
        .connect(analyser)
        .connect(audioCtxRef.current.destination);

      // draw an oscilloscope of the current audio source

      const timer = setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);

        const a: Array<number> = [];
        for (let i = 0; i < bufferLength; i++) {
          a.push(Math.abs(dataArray[i] / 128.0) + sensitivity);
        }

        const v = Math.max(...a);
        if (talking.current.length < 100) {
          talking.current.push(v);
        } else {
          talking.current.shift();
          talking.current.push(v);
        }
      }, 5);

      const volStateWatch = setInterval(() => {
        if (!audioRef.current?.played) {
          setCurrentAverageVol(0);
          return;
        }
        const arr = talking.current;
        const average = arr.reduce((a, b) => a + b) / arr.length;
        // console.log(average);
        setCurrentAverageVol(average);
      }, 180);

      return () => {
        clearInterval(timer);
        clearInterval(volStateWatch);
      };
    };
    fn();
  }, [sensitivity, audioRef]);

  let volState: 0 | 1 | 2 = 0;
  if (averageVol > 1.1) {
    volState = 2;
  } else if (averageVol > 1.08) {
    volState = 1;
  }

  const iconSize = 95;
  let bgScale = averageVol > 0 ? averageVol * 1.04 : averageVol; // 1.05はまじっくなんばー
  if (bgScale > 1.4) {
    bgScale = 1.4; // デカくなりすぎんように
  }
  if (isMuted) bgScale = 1;
  const bgSize = `${iconSize * bgScale}px`;

  return (
    <div className="bg-gray w-[280px] h-[200px] flex justify-center items-center rounded-lg relative z-10">
      <div className="absolute top-0 right-0">
        {/* <canvas ref={canvasRef} width={30} height={30} /> */}
      </div>
      {!isVideoOn && (
        <div
          className="z-40"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              width: bgSize,
              height: bgSize,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              animation: "pulse 1s ease infinite",
            }}
          ></div>
        </div>
      )}

      {isVideoOn ? (
        <div className="w-full object-cover h-full">
          {videoRef && videoUrl && (
            <video
              className={"h-full object-cover rounded-lg"}
              src={videoUrl}
              ref={videoRef}
              autoPlay={false}
            />
          )}
        </div>
      ) : (
        <img
          className="inline object-cover max-w-[100px] w-ma rounded-full z-50 my-[15%]"
          src={props.iconUrl}
          alt="Profile image"
        />
      )}
      <div className="absolute bottom-0 left-0 w-full items-center">
        <div className="mb-3 px-3 w-full">
          <div className="flex items-center">
            <div className="mr-auto">{props.name}</div>

            <TalkingIndicator num={volState} isMuted={isMuted} />
          </div>
        </div>
      </div>

      <audio src={props.audioUrl} ref={audioRef} hidden autoPlay={false} />
    </div>
  );
};

const TalkingIndicator = ({
  num,
  isMuted,
}: {
  num: number;
  isMuted: boolean;
}) => {
  const T = () => {
    if (isMuted) {
      return <RiVolumeMuteFill size={20} color="#ffffff" />;
    }
    if (num > 0) {
      return <RiVoiceprintFill size={num == 1 ? 15 : 20} />;
    } else {
      return <div></div>;
    }
  };

  let base = "w-[32px] h-[32px] rounded-full flex items-center justify-center";
  if (isMuted) {
    base += " bg-gray2";
  } else {
    if (num == 0) {
      // base += " bg-gray2";
      base += " bg-blue-400";
    } else {
      base += " bg-blue-400";
    }
  }

  return (
    <div className={base}>
      <T />
    </div>
  );
};

const useProfileBlockRef = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return { audioRef, videoRef };
};
