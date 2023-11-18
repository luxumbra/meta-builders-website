import { Icon } from '@iconify/react'
import { DateTime } from 'luxon'
import { HashLink } from 'react-router-hash-link'
import { v4 as uuid } from 'uuid'

import { useScrollReveal } from '~mb/hooks/animation'

export const links = [
  {
    url: 'https://meta-builders.com/',
    description: "Meta-Builders' official website",
    icon: 'mdi:home'
  },
  {
    url: 'https://www.youtube.com/channel/UCEnYtm1vjjbFajROeIsRofA',
    description: 'Meta-Builders on GitHub',
    icon: 'mdi:youtube'
  },
  {
    url: 'https://discord.gg/metabuilders',
    description: 'Meta-Builders on Discord',
    icon: 'mdi:discord'
  },
  {
    url: 'https://twitter.com/meta_builders',
    description: 'Meta-Builders on Twitter',
    icon: 'mdi:twitter'
  }
]

export function CopyrightNotice(): JSX.Element {
  const dt = DateTime.local()
  const currentYear = dt.year

  return (
    <p className='leadIn gradient-text invisible text-xs xl:self-end'>
      Copyright &copy; {currentYear} Meta-Builders
    </p>
  )
}

export function Footer(): JSX.Element {
  const elementId = '.leadIn'
  const triggerId = '#footer'

  useScrollReveal(elementId, triggerId)

  return (
    <footer
      id='footer'
      className='pointer-events-none relative z-10 hidden  h-32 w-full flex-col items-center justify-center overflow-y-hidden lg:flex lg:h-48 2xl:h-64'
    >
      <div className='footer-main leadIn  pointer-events-auto invisible w-3/4'>
        <HashLink
          to='/#home'
          className='text-shadow-alt font-display font-black text-sm'
        >
          <strong className='gradient-text'>Meta-Builders</strong>
        </HashLink>
      </div>
      <div className='footer-aside pointer-events-auto flex w-3/4 flex-col items-center justify-between lg:flex-row'>
        <CopyrightNotice />

        <ul className='mb-urls relative grid w-full grid-cols-4 gap-4 lg:w-1/4'>
          {links.map(link => (
            <li key={uuid()} className='leadIn invisible'>
              <a
                className='text-shadow-alt-sm dark:text-shadow-alt-sm-teal group inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-violet-800 p-2 hover:animate-pulse dark:border-teal-200 2xl:h-16 2xl:w-16 2xl:p-3'
                href={link.url}
                target='_blank'
                rel='noreferrer'
              >
                <span className='sr-only'>{link.description}</span>
                <Icon
                  className='h-full w-full text-violet-800  transition-colors text-6xl dark:text-teal-300 '
                  icon={link.icon}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
