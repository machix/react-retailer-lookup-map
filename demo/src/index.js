import React from 'react';
import { render } from 'react-dom'

import RetailerMap from '../../src';
import styles from './styles.json';
import retailersJSON from './retailers.json';
import "./demo.scss"

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3&key=${process.env.GOOGLE_MAPS_API}&language=en&region=BH&libraries=geometry,drawing,places`

const retailers = retailersJSON
  .filter(retailer => retailer.coordinates !== null)
  .map(retailer => ({
    ...retailer,
    coordinates: {
      lat: parseFloat(retailer.coordinates.lat),
      lng: parseFloat(retailer.coordinates.lng)
    }
  }))

render(<RetailerMap
  retailers={retailers}
  options={{ styles }}
  color="#ff2a05"
  countryCode="BH"
  placeholder="Find nearest retailer to address"
  googleMapURL={googleMapURL}
/>, document.querySelector('#demo'));
