
import type { ButtonProps } from "react-daisyui";
import { Button } from "react-daisyui"
import { MdDarkMode, MdLightMode } from "react-icons/md"

import type { UseDarkModeType } from "~mb/lib/hooks";
import { useDarkMode } from "~mb/lib/hooks"


// eslint-disable-next-line @typescript-eslint/no-type-alias
export type DarkModeButtonProperties = ButtonProps & {
  properties: ButtonProps
}

/**
 * DarkModeButton - *Toggle Dark Mode*
 *
 * Allows a user to toggle Dark Mode.
 *
 * @returns JSX.Element
 */
export function ButtonDarkMode(): JSX.Element {
  const { theme, toggleTheme }: UseDarkModeType = useDarkMode()
  const isDark: boolean = theme === 'dark'
  const onHandleClick = (): void => toggleTheme()
  const ModeIcon = isDark ? MdDarkMode : MdLightMode
  return (
    <Button
      aria-label='Toggle dark/light mode'
      onClick={onHandleClick}
      variant='link'
      className='border-0 bg-transparent hover:border-0 hover:bg-transparent'
    >
      <ModeIcon className='delay-0 text-3xl scale-0 transition-all origin-[right_center] duration-500 -ml-8  text-slate-600 hover:text-slate-700 dark:text-pink-100' />
    </Button>
  )
}
