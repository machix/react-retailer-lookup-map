import React from "react"
import "../styles/retailer-infobox.scss"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox"

export default props => {
  const { retailer } = props
  return (
    <InfoBox {...props} defaultOptions={{ boxClass: "retailer-infobox" }}>
      <div className="retailer-infobox__title">
        {retailer.location}
      </div>
    </InfoBox>
  )
}
