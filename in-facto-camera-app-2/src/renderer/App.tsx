import Slider from '@mui/material/Slider';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fixSecond = 20;
const seekValueMax = 100;

const pad = (num: number) => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

const Hello = () => {
  const [viewState, setViewState] = useState<'loading' | 'video'>('loading');
  const [videoReady, setVideoReady] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [seekValue, setSeekValue] = useState(seekValueMax);
  const [totalDuration, setTotalDuration] = useState(1);

  const [onChanging, setOnchanging] = useState(false);
  const [currentTimeCache, setCurrentTimeCache] = useState(0);

  const handleSeekChange: ComponentProps<typeof Slider>['onChange'] = (
    e,
    value
  ) => {
    if (!videoRef.current) return;

    setOnchanging(true);

    console.log(value);
    const pos = value as number; // hack

    setSeekValue(pos);
    if (pos === seekValueMax) {
      // live mode
      videoRef.current.currentTime = videoRef.current.duration - fixSecond;
    } else {
      const percentage = pos / 100;
      const time = (videoRef.current.duration - fixSecond) * percentage;
      videoRef.current.currentTime = time;
    }

    setOnchanging(false);
  };

  useEffect(() => {
    const fn = async () => {
      await sleep(1500);
      setViewState('video');
    };

    fn();
  }, []);

  useEffect(() => {
    if (viewState === 'video' && videoRef.current) {
      videoRef.current.play();
      videoRef.current.onloadeddata = () => {
        if (!videoRef.current) return;

        setTotalDuration(videoRef.current.duration);
        videoRef.current.currentTime = videoRef.current.duration - fixSecond;
        setVideoReady(true);
      };
    }
  }, [viewState]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (onChanging) return;
      if (!videoRef.current) return;

      const current = videoRef.current.currentTime;
      setCurrentTimeCache(current);

      if (current > totalDuration - fixSecond) {
        setSeekValue(seekValueMax);
      } else {
        setSeekValue(Math.floor((current / (totalDuration - fixSecond)) * 100));
      }
    }, 100);

    return () => clearInterval(timer);
  }, [onChanging, totalDuration]);

  if (viewState === 'loading') {
    return (
      <div>
        <div id="loading">
          <div>
            <div className="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const backTime = Math.floor(totalDuration - fixSecond - currentTimeCache);
  let backTimeStr = backTime.toString();

  if (backTime > 60) {
    let min = Math.floor(backTime / 60);
    const sec = backTime % 60;
    backTimeStr = `${pad(min)}:${pad(sec)}`;
  } else {
    backTimeStr = `00:${pad(backTime)}`;
  }

  if (backTimeStr.includes('-')) {
    backTimeStr = backTimeStr.replace('-', '');
  }

  const isLivemode = seekValue === seekValueMax;
  const stat = isLivemode ? '  LIVE  ' : `-${backTimeStr}`;

  return (
    <div id="video">
      {/* <div className="control">
        <div className="control-live">LIVE</div>

        <div id="control-time">10:00</div>
      </div> */}

      {videoReady && (
        <div id="slider">
          <div id="sliderIn">
            <div className="f">
              <Slider
                step={0.1}
                min={0}
                max={seekValueMax}
                aria-label="Seek"
                value={seekValue}
                onChange={handleSeekChange}
                color="secondary"
              />
              <div className={`stat ${isLivemode ? 'livemode' : ''}`}>
                {stat}
              </div>
            </div>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        id="videoElm"
        no-controls="true"
        style={{ width: '100%', height: '100%' }}
      >
        <source src="file:///Users/ykpythemind/Movies/20221105-dogeza/long-dogeza-for-camera-app.mp4" />
      </video>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
