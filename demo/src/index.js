import React from 'react';
import { render } from 'react-dom'

import RetailerMap from '../../src';
import styles from './styles.json';
// TODO: update demo result to match that of actual API
import retailersJSON from './retailers.json';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GOOGLE_MAPS_API}&libraries=geometry,drawing,places`

const retailers = retailersJSON.map(retailer => {
  return retailer
})
console.log(retailers)
const Demo = () => (
  <div>
    <h1>retailer-lookup-map Demo</h1>
    <RetailerMap
      retailers={retailers}
      options={{ styles }}
      color="#F62459"
      countryCode="BH"
      placeholder="Find nearest retailer to address"
      googleMapURL={googleMapURL}
    />
  </div>
)

render(<Demo />, document.querySelector('#demo'));
