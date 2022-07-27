import { Layout } from '~mb/layouts/Default'
import { imgixUrl } from '~mb/lib/constants'
import { ContentSection } from '~mb/sections/index'

import '~mb/styles/index.css'

const meta = {
  title: 'Page not found',
  description:
    'Welcome to the Metaverse. Our Services Help You Navigate this New Paradigm, and Take Your Brand to New Heights',
  permaLink: '',
  previewImageSrc: new URL('social.png', imgixUrl)
}

export default function PageNotFound(): JSX.Element {
  return (
    <Layout content={meta}>
      <ContentSection>
        <h2 className='gradient-text text-shadow-alt text-center font-extrabold tracking-tight text-6xl'>
          Eeesh, 404 error
        </h2>
        <p>
          <span className='font-bold'>What&apos;s a 404 error, ser?</span>
          <br />
          &quot;The page you were looking for doesn&apos;t exist&quot;.
          <br /> Go back to the{' '}
          <a href='/' className='text-pink-300'>
            homepage
          </a>
          .
        </p>
      </ContentSection>
    </Layout>
  )
}
