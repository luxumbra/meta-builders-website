
import { Helmet } from 'react-helmet';

export interface SeoProperties {
  title?: string;
  description?: string;
  permalink?: string;
  previewImageSrc?: URL;
}
export default function Seo({ title, description, permalink, previewImageSrc }: SeoProperties): JSX.Element {
  const metaTitle = `${title ?? Seo.defaultProps.title} - Meta-Builders`
  const metaLink = permalink ?? Seo.defaultProps.permalink
  const previewImgUrl = previewImageSrc ?? Seo.defaultProps.previewImageSrc

  return (
    <Helmet>
      <link rel="canonical" href={metaLink} />

      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={previewImgUrl.pathname} />
      <meta property="og:url" content={metaLink} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Meta-Builders" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImgUrl.pathname} />
      <meta name="twitter:url" content={metaLink} />
      <meta name="twitter:site" content="@metabuilders" />
    </Helmet>
  )
}

Seo.defaultProps = {
  title: 'Welcome to the Metaverse',
  description: 'Meta-Builders is a community of builders who build in the Metaverse.',
  permalink: 'https://metabuilders.luxumbra.dev/',
  previewImageSrc: new URL('social.png', 'https://metabuilders.luxumbra.dev'),
}