import React, { Component } from "react"
import firebase from "../lib/firebase"
import styled from "styled-components"
import { Paper, TextField, Button, Switch } from "@material-ui/core"
import withUserContext from "../utils/withUserContext"

const OuterWrapper = styled.div`
  background-color: #e6f1fc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  overflow: hidden;
`

const Form = styled.form`
  text-align: center;
  margin: 30px;
  @media screen and (min-width: 768px) {
    width: 320px;
  }
`

const Input = styled(TextField)`
  && {
    margin-bottom: 20px;
  }
`

const StyledButton = styled(Button)`
  && {
    margin: 0 10px;
  }
`

const Container = styled(Paper)`
  @media screen and (max-width: 768px) {
    min-width: 100%;
  }
`

class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: {
      email: "",
      password: ""
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  login(e) {
    e.preventDefault()
    this.setState({ errors: { email: "", password: "" } })
    const { email, password } = this.state
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.props.setUser(res.user)
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  signup(e) {
    e.preventDefault()
    this.setState({ errors: { email: "", password: "" } })
    const { email, password } = this.state
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then()
      .then()
      .catch(error => {
        this.handleError(error)
      })
  }

  handleError(error) {
    if (/auth\/email-already-in-use/.test(error.code)) {
      this.setState({ errors: { email: "Email уже зарегистрирован." } })
    }
    if (/auth\/invalid-email/.test(error.code)) {
      this.setState({ errors: { email: "Неверный формат email." } })
    }
    if (/auth\/user-not-found/.test(error.code)) {
      this.setState({
        errors: { email: "Пользователь с такими данными не зарегистрирован." }
      })
    }
    if (/auth\/wrong-password/.test(error.code)) {
      this.setState({ errors: { password: "Неверный пароль." } })
    }
    if (/auth\/weak-password/.test(error.code)) {
      this.setState({
        errors: { password: "Пароль должен содержать минимум 6 знаков." }
      })
    }
    if (/auth\/password/.test(error.code)) {
      console.log("TCL: Login -> signup -> error", error)
      this.setState({ errors: { password: error.message } })
    }
  }

  render() {
    const { email, password, errors } = this.state
    return (
      <OuterWrapper>
        <Container>
          <Form onSubmit={e => this.login(e)}>
            <Input
              type="email"
              name="email"
              onChange={e => this.handleChange(e)}
              value={email}
              error={!!errors.email}
              helperText={!!errors && errors.email}
              label="Email"
              fullWidth
              autoFocus
            />
            <Input
              type="password"
              name="password"
              onChange={e => this.handleChange(e)}
              value={password}
              error={!!errors.password}
              helperText={!!errors && errors.password}
              label="Пароль"
              fullWidth
            />
            <StyledButton
              onClick={e => this.signup(e)}
              type="submit"
              variant="outlined"
              color="primary"
            >
              Зарегистрироваться
            </StyledButton>
            <StyledButton type="submit" variant="contained" color="primary">
              Войти
            </StyledButton>
          </Form>
        </Container>
      </OuterWrapper>
    )
  }
}

export default withUserContext(Login)
