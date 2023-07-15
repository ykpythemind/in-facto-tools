"use client";
import { MutableRefObject, useRef, useState, useEffect } from "react";
import { RiVolumeMuteFill, RiVoiceprintFill } from "react-icons/ri";

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

export const ProfileBlock = (props: ProfileBlockProps) => {
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

  const iconSize = 110;
  let bgScale = averageVol > 0.1 ? averageVol * 1.09 : averageVol; // 1.05はまじっくなんばー
  bgScale = averageVol > 1.1 ? averageVol * 1.2 : bgScale; // 1.05はまじっくなんばー
  if (bgScale > 1.8) {
    bgScale = 1.8; // デカくなりすぎんように
  }
  if (averageVol < 0.08 || averageVol === 0) {
    bgScale = 1;
  }
  if (isMuted) bgScale = 1;

  let bgSizePx = Math.floor(iconSize * bgScale);
  const bgSize = `${bgSizePx}px`;

  return (
    <div className="bg-gray w-[320px] h-[200px] flex justify-center items-center rounded-lg relative z-10">
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
              muted
              ref={videoRef}
              autoPlay={false}
            />
          )}
        </div>
      ) : (
        <img
          className="inline object-cover w-[120px] w-ma rounded-full z-50 my-[15%]"
          src={props.iconUrl}
          alt="Profile image"
        />
      )}
      <div className="absolute bottom-0 left-0 w-full items-center">
        <div className="mb-3 px-3 w-full">
          <div className="flex items-center">
            <div className="mr-auto text-xl">{props.name}</div>

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
      return <RiVolumeMuteFill size={24} color="#ffffff" />;
    }
    if (num > 0) {
      return <RiVoiceprintFill size={num == 1 ? 18 : 24} />;
    } else {
      return <div></div>;
    }
  };

  let base = "w-[38px] h-[38px] rounded-full flex items-center justify-center";
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

export const useProfileBlockRef = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return { audioRef, videoRef };
};
