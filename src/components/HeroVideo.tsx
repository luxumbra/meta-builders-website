import MuxVideo from "@mux/mux-video-react";

export default function HeroVideo({source}: {source: string}): JSX.Element {
  return (
    <MuxVideo
      id="hero-video"
      className="absolute inset-0 w-full h-full z-0"
      src={source}
      autoPlay
      loop
      muted
      streamType="on-demand"
    />
  );
}