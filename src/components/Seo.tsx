/* eslint-disable react/no-danger */

import { Helmet } from 'react-helmet-async';

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
  const metaDescription = description ?? Seo.defaultProps.description

  return (
    <Helmet prioritizeSeoTags>
      <link rel="canonical" href={metaLink} />
      <script
        dangerouslySetInnerHTML={
          {
            __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "e2zzfb0rlh");`
          }
      }
      />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={previewImgUrl.pathname} />
      <meta property="og:url" content={metaLink} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Meta-Builders" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={previewImgUrl.pathname} />
      <meta name="twitter:url" content={metaLink} />
      <meta name="twitter:site" content="@metabuilders" />
    </Helmet>
  )
}

Seo.defaultProps = {
  title: 'Welcome to the Metaverseee',
  description: 'Meta-Builders is a community of builders who build in the Metaverse.',
  permalink: 'https://meta-builders.com/',
  previewImageSrc: new URL('social.png', 'https://meta-builders.com'),
}