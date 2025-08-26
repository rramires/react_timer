import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
// Router
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CyclesContextProvider } from './contexts/CyclesContext'

//import { MainComponent } from './ContextSample'

export function App() {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<CyclesContextProvider>
					<Router />
				</CyclesContextProvider>
			</BrowserRouter>
			<GlobalStyle />
		</ThemeProvider>
	)
	// return <MainComponent />
}
