import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMessage: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccessFully = JwtToken => {
    const {history} = this.props
    history.replace('/')
    Cookies.set('jwt_token', JwtToken, {expires: 30})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok) {
        this.onSubmitSuccessFully(data.jwt_token)
      } else {
        this.setState({errorMessage: data.error_msg})
      }
    } catch (err) {
      console.log(err)
    }
    this.setState({username: '', password: ''})
  }

  render() {
    const {username, password, errorMessage} = this.state
    return (
      <div className="login-container">
        <div className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <form className="form" onSubmit={this.onSubmitLoginForm}>
            <label htmlFor="username" className="input-label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              className="login-inputs"
              placeholder="Username"
              onChange={this.onChangeUserName}
              value={username}
              aria-label="Enter your username"
            />

            <label htmlFor="password" className="input-label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              className="login-inputs"
              placeholder="Password"
              onChange={this.onChangePassword}
              value={password}
              aria-label="Enter your password"
            />

            <button type="submit" className="login-button">
              Login
            </button>
            {errorMessage && <p className="login-error-msg">{errorMessage}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
