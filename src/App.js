import React, { useState } from 'react'
import './styles.css'

export default function ListingAd({ store }) {
  const PHONE_NUMBER_REGEX = /(\b8\d{3}(?:\s?\d{4,5})?\b)/

  const {
    pic,
    title,
    address,
    description,
    psf_min,
    psf_max,
    subprice_label,
    availabilities_label,
    project_type,
    ownership_type,
    year,
  } = store

  const [click, setClick] = useState(false)
  const [clickedNumber, setClickedNumber] = useState(null)
  const [descriptionButton, setDescriptionButton] = useState('See description')

  const handleClick = () => {
    setClick(!click)
    setDescriptionButton(click ? 'See description' : 'Close description')
  }

  const handleNumber = (phoneNumber) => {
    setClickedNumber(phoneNumber)
  }

  function censorLastDigits(phoneNumber, censored) {
    if (censored) {
      const firstFourDigits = phoneNumber.slice(0, 4)
      const censoredDigits = phoneNumber.slice(4).replace(/\d/g, '*')
      return firstFourDigits + censoredDigits
    } else {
      return phoneNumber
    }
  }

  const formattedDescription = description
    .split(PHONE_NUMBER_REGEX)
    .map((words, index) => {
      const wordsIsPhoneNumber = PHONE_NUMBER_REGEX.test(words)

      if (wordsIsPhoneNumber) {
        const phoneNumber = words
        const isClicked = phoneNumber === clickedNumber
        const censoredNumber = censorLastDigits(phoneNumber, !isClicked)

        return (
          <React.Fragment key={index}>
            <a
              className="phone-number-styling"
              onClick={() => handleNumber(phoneNumber)}>
              {censoredNumber}
            </a>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment key={index}>
            {words.split('\n').map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </React.Fragment>
        )
      }
    })

  const perSquareFoot = `$${psf_min.toLocaleString()} - $${psf_max.toLocaleString()} psf`
  const propertiesType = `${project_type} · ${year} · ${ownership_type}`

  return (
    <div className="property-card">
      <div className="ribbon">Launching Soon</div>
      <div className="property-image-container">
        <div className="image-overlay">
          <div className="carousel">
            <img
              src="/chevron-left.svg"
              alt="chevron"
              width={17}
              height={32}
              style={{ margin: '16px' }}
            />
            <img
              src="/chevron-right.svg"
              alt="chevron"
              width={17}
              height={32}
              style={{ margin: '16px' }}
            />
          </div>
        </div>
        <img className="property-image" src={pic} alt={title} />
      </div>
      <div className="property-content">
        <div className="property-header">
          <div className="property-details">
            <div className="property-title-container">
              <img src="/building-icon.svg" width={40} height={40} />
              <div className="header-styling">
                <p className="property-title">{title}</p>
                <p className="property-address">{address}</p>
              </div>
            </div>
            <div className="property-type-container">
              <p className="property-type">{propertiesType}</p>
              <p className="availabilities-label">{availabilities_label}</p>
            </div>
          </div>
          <div className="property-price">
            <p className="price-psf">{perSquareFoot}</p>
            <p className="price-sublabel">{subprice_label}</p>
          </div>
        </div>
        {click && (
          <div>
            <hr />
            <div className="description-styling">{formattedDescription}</div>
          </div>
        )}
        <div className="button-container">
          <button
            id="button-text"
            onClick={handleClick}
            className="button-styling">
            {descriptionButton}
          </button>
        </div>
      </div>
    </div>
  )
}
