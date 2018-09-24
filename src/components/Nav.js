import React from "react"
import styled from "styled-components"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton
} from "@material-ui/core"

import MenuIcon from "@material-ui/icons/Menu"

import UserContext from "../UserContext"
import Login from "./Login"

const Title = styled(Typography)`
  && {
    flex-grow: 1;
  }
`
const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Title variant="title" color="inherit">
          Halo
        </Title>
        <UserContext.Consumer>
          {({ user, logout }) => (
            <React.Fragment>
              {user ? (
                <Button onClick={logout} color="inherit">
                  Выйти
                </Button>
              ) : (
                <Button
                  onClick={() => this.props.history.push("/login")}
                  color="inherit"
                >
                  Вход
                </Button>
              )}
            </React.Fragment>
          )}
        </UserContext.Consumer>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
