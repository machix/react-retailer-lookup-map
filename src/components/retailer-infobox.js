import React from "react"

import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox"

export default props => {
  const { retailer } = props

  return (
    <InfoBox {...props}>
      <div>
        {retailer.title}
      </div>
    </InfoBox>
  )
}
