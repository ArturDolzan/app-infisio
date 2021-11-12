import React from 'react'
import './App.css'
import "react-image-gallery/styles/css/image-gallery.css"
import Main from './main/main'
import { HashRouter } from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const theme = createMuiTheme({
  neutral: {
    main: '#5c6ac4',
  },
  palette: {
    primary: {
      light: '#596BCF',
      main: '#232EAE',
      dark: '#0D154D',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
})

function App() {
  return (
    
    <MuiThemeProvider theme = { theme }>
        <HashRouter>
          <Main/>
        </HashRouter>
     </MuiThemeProvider>
  )
}

export default App;
