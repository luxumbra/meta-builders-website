import { CSSProperties } from 'react'

import Imgix from 'react-imgix'
import { useImageOnLoad } from 'usehooks-ts'

import { buildImgUrl } from '~mb/lib/helpers'

export function HeroImage(): JSX.Element {
  const { handleImageOnLoad, css } = useImageOnLoad()
  const widths = [450, 800, 1200]
  const sizes = '100vw'


  return (
    <picture className="relative w-full h-screen m-auto" >
      <Imgix
        className='h-full w-full object-cover'
        src={buildImgUrl('synthwave-outrun-1920.png', 'assets/images')}
        width={1200}
        height={800}
        sizes={sizes}
        htmlAttributes={{
          alt: 'Synthwave landscape with a Metaverse city in the distance',
        }}
        imgixParams={{
          fit: "crop",
          fm: "png"
        }}
      />
      {/* <img
        className='absolute inset-0 h-full w-full object-cover'
        src={buildImgUrl('synthwave-outrun-1920.png', 'assets/images')}
        alt='Thumb: The ridged surface of the moon'
        />
      <img
        className='absolute inset-0 h-full w-full object-cover'
        // eslint-disable-next-line react/jsx-handler-names
        onLoad={handleImageOnLoad}
        src={buildImgUrl('synthwave-outrun-1920.png', 'assets/images')}
        alt='The ridged surface of the moon'
      /> */}
    </picture>
  )
}
