import {BsBriefcaseFill} from 'react-icons/bs'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimiliarJobs = props => {
  const {similiarJob} = props
  console.log(similiarJob)
  const {
    companyLogoUrl,
    title,
    employmentType,
    jobDescription,
    location,
    rating,
  } = similiarJob
  return (
    <div>
      <div className="render-job-container">
        <div className="render-job-detail-logo-container">
          <img
            src={companyLogoUrl}
            className="render-job-detail-logo"
            alt="similar job company logo"
          />
          <div className="render-job-detail-employee-container">
            <h6 className="medium-txt">{title}</h6>
            <div className="render-job-rating-container">
              <FaStar className="rating-star" />
              <p className="medium-txt">{rating}</p>
            </div>
          </div>
        </div>
        <br />

        <h6 className="similiar-job-description">Description</h6>

        <p className="medium-txt mb-3">{jobDescription}</p>
        <br />

        <div className="render-job-location-type-container">
          <div className="render-job-location-container">
            <MdLocationOn className="location-icon" />
            <p className="medium-txt"> {location}</p>
          </div>

          <div className="render-job-location-container">
            <BsBriefcaseFill className="location-icon" />
            <p className="medium-txt"> {employmentType}</p>
          </div>
        </div>
        <br />
      </div>
    </div>
  )
}

export default SimiliarJobs
