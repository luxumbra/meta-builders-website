import MuxVideo from '@mux/mux-video-react'

export default function HeroVideo({ source }: { source: string }): JSX.Element {
  const prefersReductedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  return (
    <MuxVideo
      id='hero-video'
      className='absolute inset-0 z-0 h-full w-full grayscale dark:grayscale-0'
      src={source}
      autoPlay={!prefersReductedMotion}
      loop
      muted
      streamType='on-demand'
    />
  )
}
