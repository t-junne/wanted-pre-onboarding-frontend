import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/globalStyle'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
