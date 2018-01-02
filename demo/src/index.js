import React from 'react';
import { render } from 'react-dom'

import RetailerMap from '../../src';
import styles from './styles.json';
import retailers from './retailers.json';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GOOGLE_MAPS_API}&libraries=geometry,drawing,places`

const Demo = () => (
  <div>
    <h1>retailer-lookup-map Demo</h1>
    <RetailerMap
      retailers={retailers}
      options={{ styles }}
      color="#f00"
      countryCode="DK"
      googleMapURL={googleMapURL}
    />
  </div>
);

render(<Demo />, document.querySelector('#demo'));
