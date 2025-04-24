import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {BsSearch, BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const status = {
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  noJobs: 'NO_JOBS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileData: '',
    jobsList: [],
    jobStatus: '',
    profileStatus: '',
    apiEmployementType: [],
    salary: '',
    search: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileStatus: status.inProgress})

    const profileUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(profileUrl, options)
      const data = await response.json()
      if (response.ok) {
        const updatedProfileData = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        }
        this.setState({
          profileData: updatedProfileData,
          profileStatus: status.success,
        })
      } else {
        this.setState({profileStatus: status.failure})
      }
    } catch (err) {
      console.log(`profileError: ${err}`)
    }
  }

  getJobs = async () => {
    const {apiEmployementType, salary, search} = this.state
    console.log(salary)
    this.setState({jobStatus: status.inProgress})
    const jobUrl = `https://apis.ccbp.in/jobs?employment_type=${apiEmployementType.join(
      ',',
    )}&minimum_package=${salary}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MjMwNjU1MzJ9.D13s5wN3Oh59aa_qtXMo3Ec4wojOx0EZh8Xr5C5sRkU'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(jobUrl, options)
      if (response.ok) {
        const data = await response.json()

        const jobs = data.jobs.map(job => ({
          id: job.id,
          companyLogoUrl: job.company_logo_url,
          employmentType: job.employment_type,
          jobDescription: job.job_description,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          title: job.title,
        }))

        this.setState({jobsList: jobs, jobStatus: status.success})
        if (jobs.length === 0) {
          this.setState({jobStatus: status.noJobs})
        }
      } else {
        this.setState({jobStatus: status.failure})
      }
    } catch (err) {
      console.log(`Job Error: ${err}`)
    }
  }

  renderJobs = jobby => {
    const {
      id,
      title,
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
    } = jobby

    return (
      <Link to={`jobs/${id}`}>
        <li className="render-job-container">
          <div className="render-job-logo-container">
            <img
              src={companyLogoUrl}
              className="render-job-logo"
              alt="company logo"
            />
            <div className="render-job-employee-container">
              <h6 className="render-job-title">{title}</h6>
              <div className="render-job-rating-container">
                <FaStar className="rating-star" />
                <p className="render-job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="render-job-work-container">
            <div className="render-job-location-type-container">
              <div className="render-job-location-container">
                <MdLocationOn className="location-icon" />
                <p className="small-txt"> {location}</p>
              </div>

              <div className="render-job-location-container">
                <BsBriefcaseFill className="location-icon" />
                <p className="small-txt"> {employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnum}</p>
          </div>

          <h6 className="render-job-description">Description</h6>
          <p className="small-txt">{jobDescription}</p>
        </li>
      </Link>
    )
  }

  onSearchJob = event => {
    this.setState({search: event.target.value})
  }

  onClickSearchButton = () => {
    this.getJobs()
  }

  jobSearchBar = () => (
    <div className="job-search-container">
      <input
        className="job-search"
        type="search"
        placeholder="Search"
        onChange={this.onSearchJob}
      />
      <button
        className="job-search-button"
        type="button"
        onClick={this.onClickSearchButton}
        data-testid="searchButton"
      >
        <BsSearch />
      </button>
    </div>
  )

  successProfile = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} className="profile-image" alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  retryProfile = () => {
    this.getProfile()
  }

  failureProfile = () => (
    <div className="retry-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.retryProfile}
      >
        Retry
      </button>
    </div>
  )

  onFilterEmployementType = event => {
    const empType = event.target.value
    const isChecked = event.target.value
    console.log(isChecked)
    this.setState(prevState => {
      if (!prevState.apiEmployementType.includes(empType) && isChecked) {
        return {
          apiEmployementType: [...prevState.apiEmployementType, empType],
        }
      }
      return {
        apiEmployementType: prevState.apiEmployementType.filter(
          type => type !== empType,
        ),
      }
    }, this.getJobs)
  }

  employmentType = employeType => {
    const {label, employmentTypeId} = employeType

    return (
      <li className="employmentType-checkbox-container">
        <input
          type="checkbox"
          id={label}
          value={employmentTypeId}
          onChange={this.onFilterEmployementType}
        />
        <label className="employmentType-checkbox-value" htmlFor={label}>
          {label}
        </label>
      </li>
    )
  }

  onFilterSalaryRange = event => {
    const salaryPackage = event.target.value
    this.setState({salary: salaryPackage}, this.getJobs)
  }

  salaryRange = salary => {
    const {label, salaryRangeId} = salary

    return (
      <li className="employmentType-checkbox-container">
        <input
          type="radio"
          id={label}
          value={salaryRangeId}
          name="salary"
          onChange={this.onFilterSalaryRange}
        />
        <label className="employmentType-checkbox-value" htmlFor={label}>
          {label}
        </label>
      </li>
    )
  }

  retryJobs = () => {
    this.getJobs()
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
      <button className="retry-button" type="button" onClick={this.retryJobs}>
        Retry
      </button>
    </div>
  )

  renderNoJobs = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="failure-view-image"
        alt="no jobs"
      />
      <h6 className="failure-view-txt">No Jobs Found</h6>
      <p className="failure-view-txt">
        We could not find any jobs. Try
        <br /> other filters.
      </p>
    </div>
  )

  isLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#fff" width="50" height="50" />
    </div>
  )

  jobSuccess = () => {
    const {jobsList} = this.state
    return (
      <ul className="jobs-list-container">
        {jobsList.map(each => this.renderJobs(each))}
      </ul>
    )
  }

  jobFilters = () => (
    <>
      <hr className="seperator" />
      <div className="employmentType-container">
        <h3 className="employmentType-heading">Type Of Employment</h3>
        <ul className="employmentType-list-container">
          {employmentTypesList.map(each => this.employmentType(each))}
        </ul>
      </div>
      <hr className="seperator" />

      <div className="employmentType-container">
        <h3 className="employmentType-heading">Salary Range</h3>
        <ul className="employmentType-list-container">
          {salaryRangesList.map(each => this.salaryRange(each))}
        </ul>
      </div>
    </>
  )

  profileSwitchStatus = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case status.success:
        return this.successProfile()
      case status.inProgress:
        return this.isLoader()
      case status.failure:
        return this.failureProfile()
      default:
        return null
    }
  }

  jobSwitchStatus = () => {
    const {jobStatus} = this.state

    switch (jobStatus) {
      case status.success:
        return this.jobSuccess()
      case status.inProgress:
        return this.isLoader()
      case status.failure:
        return this.renderJobFailure()
      case status.noJobs:
        return this.renderNoJobs()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          {this.jobSearchBar()}
          {this.profileSwitchStatus()}
          {this.jobFilters()}
          {this.jobSwitchStatus()}
        </div>
      </>
    )
  }
}

export default Jobs
