import React, { useState } from 'react'
import './styles.css'

export default function ListingAd({ store }) {
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
  const [descriptionButton, setDescriptionButton] = useState('See description')

  const handleClick = () => {
    setClick(!click)
    setDescriptionButton(click ? 'See description' : 'Close description')
  }

  const formatted_description = description.split('\n').map((line, index) => (
    <div key={index}>
      {line}
      <br />
    </div>
  ))

  const per_square_foot = `$${psf_min.toLocaleString()} - $${psf_max.toLocaleString()} psf`
  const properties_type = `${project_type} · ${year} · ${ownership_type}`

  return (
    <div className="property-card">
      <div className="ribbon">Launching Soon</div>
      <div className="property-image-container">
        <div className="image-overlay" />
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
              <p className="property-type">{properties_type}</p>
              <p className="availabilities-label">{availabilities_label}</p>
            </div>
          </div>
          <div className="property-price">
            <p className="price-psf">{per_square_foot}</p>
            <p className="price-sublabel">{subprice_label}</p>
          </div>
        </div>
        {click && (
          <div>
            <hr />
            <div className="description-styling">{formatted_description}</div>
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
