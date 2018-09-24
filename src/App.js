import React, { Component } from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import firebase from "./lib/firebase"
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core"
import blue from "@material-ui/core/colors/blue"
import { createGlobalStyle } from "styled-components"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import withUserContext from "./utils/withUserContext"

const theme = createMuiTheme({
  palette: {
    primary: blue
  }
})

const GlobalStyle = createGlobalStyle`
  html, body, body>#root, #root>div {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  article, aside, figcaption, figure, footer, header, main, nav, section {
    display: block;
  }
  h1, h2, h3 {
    margin: 0;
  }
`

class App extends Component {
  componentDidMount() {
    this.authListener()
  }

  authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.setUser(user)
        // TODO: redirect to dashboard route
      } else {
        this.props.logout()
        // TODO: redirect to login route
      }
    })
  }

  render() {
    const { user } = this.props
    return (
      <MuiThemeProvider theme={theme}>
        <GlobalStyle />
        {/* <BrowserRouter>
          <React.Fragment>
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
            </Switch>
          </React.Fragment>
        </BrowserRouter> */}
        {user ? <Dashboard /> : <Login />}
      </MuiThemeProvider>
    )
  }
}

export default withUserContext(App)
