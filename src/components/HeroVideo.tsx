import MuxVideo from "@mux/mux-video-react";

import { useDarkMode } from "~mb/lib/hooks";

export default function HeroVideo({ source }: { source: string }): JSX.Element {
  const { isDarkMode } = useDarkMode();

  return (
    <MuxVideo
      id="hero-video"
      className="absolute inset-0 w-full h-full z-0 grayscale dark:grayscale-0"
      src={source}
      autoPlay
      loop
      muted
      streamType="on-demand"
    />
  );
}