import React from "react"

import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox"

export default props => {
  const { retailer } = props

  return (
    <InfoBox {...props}>
      <div className="retailer-infobox">
        <div className="retailer-infobox__title">
          {retailer.title}
        </div>
      </div>
    </InfoBox>
  )
}
