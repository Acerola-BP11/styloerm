const { createTheme, ThemeProvider } = require("@mui/material");

const darkTheme = createTheme({
    palette: {
      mode: 'dark'
    }
  })

export default function DarkTheme({ children }){
    return(
        <ThemeProvider theme={darkTheme}>
            {children}
        </ThemeProvider>
    )
}