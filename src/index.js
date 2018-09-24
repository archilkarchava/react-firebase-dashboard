import "babel-polyfill"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import UserStore from "./UserStore"

ReactDOM.render(
  <UserStore>
    <App />
  </UserStore>,
  document.getElementById("root")
)
registerServiceWorker()
