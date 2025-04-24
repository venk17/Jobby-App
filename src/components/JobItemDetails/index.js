import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLinkExternal} from 'react-icons/go'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimiliarJobs from '../SimiliarJobs'
import './index.css'

const status = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    companyLife: {},
    jobSkills: [],
    similiarJobs: [],
    apiStatus: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: status.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiurl = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiurl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobDetails = {
        id: data.job_details.id,
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employementType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: (data.job_details.life_at_company = {
          imageUrl: data.job_details.life_at_company.image_url,
          description: data.job_details.life_at_company.description,
        }),
        skills: data.job_details.skills.map(each => ({
          name: each.name,
          imageUrl: each.image_url,
        })),
      }

      const updatedSimiliarJobs = data.similar_jobs.map(similiar => ({
        id: similiar.id,
        companyLogoUrl: similiar.company_logo_url,
        employmentType: similiar.employment_type,
        jobDescription: similiar.job_description,
        location: similiar.location,
        rating: similiar.rating,
        title: similiar.title,
      }))
      // console.log(updatedSimiliarJobs)
      this.setState({
        jobDetails: updatedJobDetails,
        companyLife: updatedJobDetails.lifeAtCompany,
        jobSkills: updatedJobDetails.skills,
        similiarJobs: updatedSimiliarJobs,
        apiStatus: status.success,
      })
    } else {
      this.setState({apiStatus: status.failure})
    }
  }

  renderJobSkills = skill => {
    const {name, imageUrl} = skill

    return (
      <li className="skill-container">
        <img src={imageUrl} className="skill-image" alt={name} />
        <p className="medium-txt">{name}</p>
      </li>
    )
  }

  onLifeAtCompany = () => {
    const {companyLife} = this.state
    const {description, imageUrl} = companyLife

    return (
      <>
        <h6 className="medium-txt">Life at Company</h6>
        <br />
        <p className="medium-txt">{description}</p>
        <br />
        <img src={imageUrl} className="company-image" alt="life at company" />
      </>
    )
  }

  isLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" width="50" height="50" />
    </div>
  )

  retryJobDetails = () => {
    this.getJobDetails()
  }

  renderJobDetails = () => {
    const {jobDetails, jobSkills} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employementType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobDetails

    return (
      <div className="render-job-container">
        <div className="render-job-detail-logo-container">
          <img
            src={companyLogoUrl}
            className="render-job-detail-logo"
            alt="job details company logo"
          />
          <div className="render-job-detail-employee-container">
            <h6 className="medium-txt">{title}</h6>
            <div className="render-job-rating-container">
              <FaStar className="rating-star" />
              <p className="medium-txt">{rating}</p>
            </div>
          </div>
        </div>
        <div className="render-job-work-container">
          <div className="render-job-location-type-container">
            <div className="render-job-location-container">
              <MdLocationOn className="location-icon" />
              <p className="medium-txt"> {location}</p>
            </div>

            <div className="render-job-location-container">
              <BsBriefcaseFill className="location-icon" />
              <p className="medium-txt"> {employementType}</p>
            </div>
          </div>
          <p className="salary">{packagePerAnnum}</p>
        </div>

        <div className="render-job-detail-url-container">
          <h6 className="medium-txt">Description</h6>

          <a
            href={companyWebsiteUrl}
            target="_blank"
            rel="noreferrer"
            className="company-website-url"
          >
            Visit <GoLinkExternal />
          </a>
        </div>
        <p className="medium-txt">{jobDescription}</p>
        <br />
        <h6 className="medium-txt">Skills</h6>
        <br />
        <ul className="skill-list-container">
          {jobSkills.map(each => this.renderJobSkills(each))}
        </ul>
        {this.onLifeAtCompany()}
      </div>
    )
  }

  renderJobFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="failure-view-image"
        alt="failure view"
      />
      <h6 className="failure-view-txt">Oops! Something Went Wrong</h6>
      <p className="failure-view-txt">
        We cannot seem to find the page
        <br /> you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.retryJobDetails}
      >
        Retry
      </button>
    </div>
  )

  successProfile = () => {
    const {similiarJobs} = this.state
    return (
      <>
        <div className="jobs-container">{this.renderJobDetails()}</div>
        <h1 className="similiar-jobs-heading">Similar Jobs</h1>
        <ul className="similiar-jobs-list-container">
          {similiarJobs.map(job => (
            <SimiliarJobs key={job.id} similiarJob={job} />
          ))}
        </ul>
      </>
    )
  }

  jobItemDetailsSwitchStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case status.success:
        return this.successProfile()
      case status.inProgress:
        return this.isLoader()
      case status.failure:
        return this.renderJobFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.jobItemDetailsSwitchStatus()}
      </>
    )
  }
}

export default JobItemDetails
