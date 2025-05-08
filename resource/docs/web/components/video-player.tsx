"use client";
import { mergeRefs } from "@/hooks/use-merged-ref";
import * as React from "react";
import { cn } from "@/utils/cn";
import { Svg, type SvgProps } from "@/ui/svg";

export interface UseVideoPlayerProps {
  autoPlay?: boolean;
}
export function useVideoPlayer(options: UseVideoPlayerProps = {}) {
  const { autoPlay = false } = options;

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(autoPlay);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  React.useEffect(() => {
    const videoElement = videoRef.current;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    if (videoElement) {
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("pause", handlePause);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  return { videoRef, isPlaying, togglePlayPause };
}

export interface VideoPlayerProps extends React.ComponentPropsWithoutRef<"video"> {
  source?: string | string[];
  classNames?: { video?: string; playPause?: string; overlay?: string };
}

export const VideoPlayer = React.forwardRef<React.ElementRef<"video">, VideoPlayerProps>((_props, ref) => {
  const { source, className, classNames, autoPlay, ...props } = _props;
  const { videoRef, isPlaying, togglePlayPause } = useVideoPlayer({ autoPlay });
  return (
    <>
      <video ref={mergeRefs(videoRef, ref)} autoPlay={autoPlay} className={cn("[&~button]:hover:opacity-100", className, classNames?.video)} {...props} />

      <span className={cn("absolute inset-0 z-5 dark:bg-[linear-gradient(transparent_50%,_rgba(0,0,0,0.5)_100%)] [&~button]:hover:opacity-100", classNames?.overlay)} />

      <button
        {...{
          type: "button",
          onClick: togglePlayPause,
          className: cn("opacity-0 hover:opacity-100", classNames?.playPause),
          style: {
            position: "absolute",
            border: "none",
            placeItems: "center",
            cursor: "pointer",
            borderRadius: "9999px",
            transition: "all 0.3s ease-in",
            boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px",
            zIndex: "8"
          }
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
        <span className="sr-only hidden">Player Controls</span>
      </button>
    </>
  );
});
VideoPlayer.displayName = "VideoPlayer";

export const PauseIcon = (props: SvgProps) => {
  return (
    <Svg currentFill="fill" {...props}>
      <path d="M9 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
      <path d="M17 4h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2z" />
    </Svg>
  );
};

export const PlayIcon = (props: SvgProps) => {
  return (
    <Svg currentFill="fill" {...props}>
      <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
    </Svg>
  );
};

// ---
// title: Video Player
// description: A wrapper component for playing video content with default controls and styling, supporting various formats and customization options.
// date: 2025-01-05
// summary: A customizable video player component for embedding and playing video content.
// component: true
// links:
//   doc: https://
//   # related:
//   #   - label: label
//   #     link: https://
// ---
