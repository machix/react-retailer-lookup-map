import React from 'react';
import { render } from 'react-dom'

import Example from '../../src';
import styles from './styles.json';
import retailers from './retailers.json';

const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${process.env.GOOGLE_MAPS_API}&libraries=geometry,drawing,places`

const Demo = () => (
  <div>
    <h1>retailer-lookup-map Demo</h1>
    <Example
      retailers={retailers}
      options={{ styles }}
      color="#d35400"
      countryCode="DK"
      loadingElement={<div style={{ height: '100%' }} />}
      mapElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '60vh' }} />}
      googleMapURL={googleMapURL}
    />
  </div>
);

render(<Demo />, document.querySelector('#demo'));
