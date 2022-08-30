
import { Icon } from "@iconify/react";
import type { ButtonProps } from "react-daisyui";
import { Button } from "react-daisyui"

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
  const modeIcon = isDark ? 'ic:baseline-dark-mode' : 'ic:baseline-light-mode'
  return (
    <div className="tooltip tooltip-info tooltip-bottom" role="tooltip" data-tip="⚠️ Light mode is WIP">
    <Button
      aria-label='Toggle dark/light mode'
      onClick={onHandleClick}
      variant='link'
      className='border-0 bg-transparent hover:border-0 hover:bg-transparent'
    >
      <Icon icon={modeIcon} className='delay-0 text-2xl animate-spin scale-100 transition-all origin-[right_center] duration-500  text-slate-600 hover:text-orange-400 dark:text-violet-300 dark:hover:text-blue-500 text-shadow-alt-teal dark:hover:text-shadow-alt-teal' />
      </Button>
      </div>
  )
}
