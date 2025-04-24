import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      className="not-found-image"
      alt="not found"
    />
    <h6 className="not-found-heading">Page Not Found</h6>
    <p className="not-found-txt">
      we are sorry, the page you requested could <br /> not be found
    </p>
  </div>
)

export default NotFound
