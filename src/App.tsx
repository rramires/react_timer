import { ThemeProvider } from "styled-components"
import { defaultTheme } from "./styles/themes/default"
import { GlobalStyle } from "./styles/global"
import { Button } from "./components/Button"


export function App() {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <h1>Hello World!!!</h1>

      <Button />
      <Button variant="primary"/>
      <Button variant="secondary"/>
      <Button variant="danger"/>
      <Button variant="success"/>

      <GlobalStyle/>
    </ThemeProvider>
  )
}
