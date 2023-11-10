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

  const handleClick = () => {
    setClick(!click)
  }

  const per_square_foot = `$${psf_min.toLocaleString()} - $${psf_max.toLocaleString()} psf`
  const properties_type = `${project_type} · ${year} · ${ownership_type}`

  return (
    <div className="property-card">
      <div className="property-image-container">
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
        <div className="button-container">
          <button onClick={handleClick} className="button-styling">
            See description
          </button>
        </div>
        {click && (
          <div>
            <p>{description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
