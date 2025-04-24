import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {IoLogOutOutline} from 'react-icons/io5'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="website-logo"
          alt="website logo"
        />
      </Link>
      <div className="small-device-headers">
        <Link to="/">
          <IoMdHome className="header-icons" />
        </Link>

        <Link to="/jobs">
          <BsBriefcaseFill className="header-icons" />
        </Link>
        <button className="logout-button" type="button" onClick={onLogout}>
          <IoLogOutOutline className="header-icons" />
        </button>
      </div>

      <ul className="large-device-header">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/jobs">Jobs</Link>
        </li>
        <li>
          <button className="logout-button" type="button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default withRouter(Header)
