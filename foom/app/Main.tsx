"use client";
import { useEffect, useRef, useState } from "react";
import { RiVoiceprintFill } from "react-icons/ri";

export const Main = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-base text-white">
      <div className="w-full grid grid-cols-4 gap-6">
        <div className="col-span-3">
          {/* <img src="/delivery_image.jpg" className="w-full" /> */}
          <video
            src="/P1033141_1.mp4"
            className="w-full"
            autoPlay
            loop
            muted
            ref={videoRef}
          />
        </div>
        <div className="col-span-1">
          <div className="grid grid-rows-1 gap-4">
            {/* <ProfileBlock name="ykpyt" iconUrl="/ykp.png" audioUrl="" /> */}
            <ProfileBlock
              name="osd"
              iconUrl="https://avatars.githubusercontent.com/u/65229525?v=4"
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
  sensitivity?: number;
};

const WIDTH = 30;
const HEIGHT = 30;

const ProfileBlock = (props: ProfileBlockProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const talking = useRef<Array<number>>([]);

  const [volState, setVolState] = useState<0 | 1 | 2>(0);
  const { sensitivity = 0 } = props;

  useEffect(() => {
    const fn = async () => {
      if (!audioRef.current) {
        throw new Error("audiorefがnull");
      }
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      await audioRef.current?.play();
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
        const arr = talking.current;
        const average = arr.reduce((a, b) => a + b) / arr.length;
        console.log(average);
        if (average > 1.1) {
          setVolState(2);
        } else if (average > 1.08) {
          setVolState(1);
        } else {
          setVolState(0);
        }
      }, 300);

      return () => {
        clearInterval(timer);
        clearInterval(volStateWatch);
      };
    };
    fn();
  }, [sensitivity]);

  return (
    <div className="bg-gray flex justify-center items-center rounded-lg py-[15%] relative">
      <div className="absolute top-0 right-0">
        {/* <canvas ref={canvasRef} width={30} height={30} /> */}
      </div>
      <img
        className="inline object-cover max-w-[100px] w-ma rounded-full"
        src={props.iconUrl}
        alt="Profile image"
      />
      <div className="absolute bottom-0 left-0 w-full items-center">
        <div className="mb-3 px-3 w-full">
          <div className="flex">
            <div className="mr-auto">{props.name}</div>

            <TalkingIndicator num={volState} />
          </div>
        </div>
      </div>

      <audio src="/talk-osd.mp3" ref={audioRef} hidden />
    </div>
  );
};

const TalkingIndicator = ({ num }: { num: number }) => {
  const T = () => {
    if (num > 0) {
      return <RiVoiceprintFill size={num == 1 ? 10 : 16} />;
    } else {
      return <div></div>;
    }
  };

  let base = "w-[26px] h-[26px] rounded-full flex items-center justify-center";
  if (num == 0) {
    // base += " bg-gray2";
    base += " bg-blue-400";
  } else {
    base += " bg-blue-400";
  }

  return (
    <div className={base}>
      <T />
    </div>
  );
};
