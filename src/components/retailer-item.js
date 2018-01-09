import React from "react"
import "../styles/retailer-item.scss"

export default props => {
  const { retailer } = props
  return (
    <div className="retailer-item" {...props} >
      <div className="retailer-item__title">
        {retailer.location}
      </div>
      <div className="retailer-item__address">
        {retailer.address}
      </div>
    </div>
  )
}
