import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  findJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <Link to="/jobs">
            <button className="find-job-button" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </>
    )
  }
}

export default withRouter(Home)
