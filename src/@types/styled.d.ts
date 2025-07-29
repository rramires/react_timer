import 'styled-components'
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
	// @typescript-eslint/no-empty-interface
	// eslint-disable-next-line
	export interface DefaultTheme extends ThemeType {}
}
