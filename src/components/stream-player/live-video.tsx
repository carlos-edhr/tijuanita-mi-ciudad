"use client";
//@ts-nocheck
import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client";
import { useRef, useState, useEffect } from "react";
import { useEventListener } from "usehooks-ts";
import { FullscreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-control";
// import { toggleFullscreenAll } from "./toggleFullScreenAll";

interface LiveVideoProps {
  participant: Participant;
}

function isIphone() {
  return /iPhone/i.test(navigator.userAgent);
}

function makeIphoneFullscreen() {
  const div = document.getElementById("fullscreenDivOnIphone");
  if (div) {
    div.style.display = "block";
  }
}

function exitIphoneFullscreen() {
  const div = document.getElementById("fullscreenDivOnIphone");

  if (div) {
    div.style.display = "flex";
  }
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);
  const documentRef = useRef<Document>(document);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }
  };

  useEffect(() => {
    onVolumeChange(0);
  }, []);

  const toggleFullscreen = () => {
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      // console.log("User is not on an iPhone.");
      wrapperRef.current.requestFullscreen();
      // if (!isIphone()) {
      //   console.log("User is on an iPhone.");
      //   makeIphoneFullscreen();
      // }
    }
  };

  const handleFullScreenChange = () => {
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  };

  // FIX: Use document ref with proper null check
  useEventListener("fullscreenchange", handleFullScreenChange, documentRef);

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current);
      }
    });

  //react logic for iPhone case
  const [isIphoneFullscreen, setIphoneIsFullscreen] = useState(false);
  const toggleFullscreenIphone = () => {
    if (isIphoneFullscreen) {
      exitIphoneFullscreen();
    } else {
      // wrapperRef.current.requestFullscreen();
      makeIphoneFullscreen();
    }
  };

  const handleFullScreenChangeIphone = () => {
    setIphoneIsFullscreen(!isIphoneFullscreen);

    // Confirm that CSS property is added
    // console.log("Added fullscreenDivOnIphone property");
  };

  //@ts-expect-error event listener for iPhone fullscreen change
  useEventListener("click", handleFullScreenChangeIphone, wrapperRef);

  // useTracks([Track.Source.Camera, Track.Source.Microphone])
  //   .filter((track) => track.participant.identity === participant.identity)
  //   .forEach((track) => {
  //     if (videoRef.current) {
  //       track.publication.track?.attach(videoRef.current);
  //     }
  //   });

  // If user is using an iPhone iOS - Safari Mobile Web version
  if (isIphone()) {
    // console.log("User is on an iPhone.");

    return (
      <div
        id={isIphoneFullscreen ? "fullscreenDivOnIphone" : ""}
        ref={wrapperRef}
        className="relative h-full flex"
      >
        <video ref={videoRef} width="100%" />

        <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
          <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
            <VolumeControl
              onChange={onVolumeChange}
              value={volume}
              onToggle={toggleMute}
            />
            <FullscreenControl
              isFullscreen={isIphoneFullscreen}
              onToggle={toggleFullscreenIphone}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      // id="fullscreenDivOnIphone"
      ref={wrapperRef}
      className="relative h-full flex"
    >
      <video ref={videoRef} width="100%" />

      <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
        <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            value={volume}
            onToggle={toggleMute}
          />
          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  );
};
