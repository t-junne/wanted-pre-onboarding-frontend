import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html {}
body {
  color: #525252;
  #App {
    width: 100vw;
    height: 100vh;
  }
}
input {
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
}
button {
  cursor: pointer;
  background: none;
  border: none;
}
ul {
  list-style: none;
}
`
export default GlobalStyle
