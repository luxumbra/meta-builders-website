import { useImageOnLoad } from 'usehooks-ts'


export function HeroImage(): JSX.Element {
  const { handleImageOnLoad } = useImageOnLoad()
  // const { isDarkMode } = useDarkMode()
  // const widths = [450, 768, 1366, 1920]
  // const sizes = '100vw'
  // const deviceXs = useMediaQuery('(min-width: 0px)')
  // const deviceSm = useMediaQuery('(min-width: 640px)')
  // const deviceMd = useMediaQuery('(min-width: 1024px)')
  // const deviceLg = useMediaQuery('(min-width: 1280px)')
  // const deviceXl = useMediaQuery('(min-width: 1536px)')


  return (
    <picture className="relative inset-0 w-screen h-screen m-auto opacity-100 dark:opacity-50" >
      <img
        className='fixed inset-0 h-screen w-screen object-cover filter blur-lg'
        src='assets/images/synthwave-outrun-fallback.jpg'
        alt='Thumbnail: Synthwave landscape with a Metaverse city in the distance'
        loading='eager'
        />

      <img
        className='fixed inset-0 h-screen w-screen object-cover filter grayscale invert dark:grayscale-0 dark:invert-0'
        // eslint-disable-next-line react/jsx-handler-names
        onLoad={handleImageOnLoad}
        src='assets/images/synthwave-outrun-1920.png'
        alt='Synthwave landscape with a Metaverse city in the distance'
        width={1920}
        height={1080}
      />
    </picture>
  )
}
