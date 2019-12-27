import { ThemeProvider } from 'styled-components'
import Header from 'components/theme/Header'
// import theme from 'components/theme'

export default ({ children }) => (
  <ThemeProvider theme={{
      colors: {
        black: '#000',
        white: '#fff'
      }
    }}>
    <Header />
    {children}
  </ThemeProvider>
)