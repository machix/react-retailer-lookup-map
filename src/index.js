import React, { Component } from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox"
import { generateClusterStyles, generateMarkerIcon, getCountry } from "./utils"

class RetailerMap extends Component {
  static defaultOptions = {
    disableDefaultUI: true,
    defaultZoom: 8
  }

  state = {
    position: { lat: 0, lng: 0 },
    country: {},
    openedInfoBoxes: [],
  }

  centerToCountry = () => this.map.fitBounds(this.state.country.geometry.bounds)

  handleGeolocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(position => {
      const center = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      this.map.panTo(center)
      requestAnimationFrame(() => this.setState({ center, zoom: 16 }))
    }, error => console.error(error), { enableHighAccuracy: true })
  }

  toggleInfoBox = id => {
    const { openedInfoBoxes } = this.state
    if (openedInfoBoxes.includes(id)) {
      this.setState({ openedInfoBoxes: openedInfoBoxes.filter(item => item !== id) })
    } else {
      this.setState({ openedInfoBoxes: openedInfoBoxes.concat(id) })
    }
  }

  componentWillMount() {
    const { countryCode } = this.props
    getCountry(countryCode)
      .then(country => this.setState({ country }))
      .then(this.centerToCountry)
      .then(this.handleGeolocation)
  }

  render() {
    const { options, retailers, styles, color } = this.props
    const { center, openedInfoBoxes, zoom } = this.state
    return (
      <div className="retailer-map">
        <GoogleMap
          ref={map => this.map = map}
          defaultOptions={{ ...RetailerMap.defaultOptions, ...options }}
          center={center}
          zoom={zoom}
          styles={styles}>
          <MarkerClusterer
            averageCenter
            styles={generateClusterStyles(color)}
            enableRetinaIcons
            gridSize={60}>
            {retailers.map(retailer => (
              <Marker key={retailer.id}
                onClick={() => this.toggleInfoBox(retailer.id)}
                position={{ lat: retailer.location[0], lng: retailer.location[1] }}
                icon={generateMarkerIcon(color)}>
                {openedInfoBoxes.includes(retailer.id) &&
                  <InfoBox>
                    <div>
                      {retailer.title}
                    </div>
                  </InfoBox>
                }
              </Marker>
            ))}
          </MarkerClusterer>
        </GoogleMap>
      </div>
    )
  }
}

export default withScriptjs(withGoogleMap(props => <RetailerMap {...props} />))
