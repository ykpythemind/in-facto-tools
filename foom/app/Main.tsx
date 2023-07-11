"use client";
import { useEffect, useRef } from "react";

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
};

const WIDTH = 30;
const HEIGHT = 30;

const ProfileBlock = (props: ProfileBlockProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

  useEffect(() => {
    const fn = async () => {
      if (!audioRef.current) {
        throw new Error("audiorefがnull");
      }
      if (!canvasRef.current) {
        throw new Error("canvasがnull");
      }

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }

      await audioRef.current?.play();
      const analyser = audioCtxRef.current.createAnalyser();

      analyser.fftSize = 256; // FFTサイズ
      analyser.maxDecibels = 80;
      analyser.minDecibels = 20; // 最小値
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

      const canvasCtx = canvasRef.current.getContext("2d");

      function draw() {
        requestAnimationFrame(draw);

        if (!canvasCtx) return;
        if (!canvasRef.current) return;

        analyser.getByteTimeDomainData(dataArray);

        let hasTalk = false
        for (let i = 0; i < bufferLength; i++) {
          const v =
        }

        canvasCtx.fillStyle = "rgb(200, 200, 200)";
        canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = "rgb(0, 0, 0)";

        canvasCtx.beginPath();

        var sliceWidth = (WIDTH * 1.0) / bufferLength;
        var x = 0;

        for (let i = 0; i < bufferLength; i++) {
          var v = dataArray[i] / 128.0;
          var y = (v * HEIGHT) / 2;

          if (i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(canvasRef.current.width, canvasRef.current.height / 2);
        canvasCtx.stroke();
      }

      draw();
    };
    fn();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      throw new Error("objectがnull");
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("context取得失敗");
    }
    // 黒い長方形を描画する
    // ctx.fillStyle = "#000000";
    // ctx.fillRect(0, 0, ctx.canvas.width / 2, ctx.canvas.height / 2);
  }, []);

  return (
    <div className="bg-gray flex justify-center items-center rounded-lg py-[15%] relative">
      <div className="absolute top-0 right-0">
        <canvas ref={canvasRef} width={30} height={30} />
      </div>
      <img
        className="inline object-cover max-w-[100px] w-ma rounded-full"
        src={props.iconUrl}
        alt="Profile image"
      />
      <div className="absolute bottom-0 left-0">
        <div className="ml-3 mb-3">{props.name}</div>
      </div>

      <audio src="/aa.m4a" ref={audioRef} hidden />
    </div>
  );
};
