import React, { Component } from "react"
import "./styles.scss"
import RetailerList from "./components/retailer-list"

import includes from "lodash.includes"
import some from "lodash.some"
import debounce from "lodash.debounce"

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import { InfoBox } from "react-google-maps/lib/components/addons/InfoBox"
import { generateClusterStyles, generateMarkerIcon, getCountry, findNearestCoordinatesInCollection } from "./utils"

class RetailerMap extends Component {
  static defaultOptions = {
    disableDefaultUI: true,
    defaultZoom: 8
  }

  state = {
    country: {},
    openedInfoBoxes: [],
  }

  centerToCountry = () => this.map.fitBounds(this.state.country.geometry.bounds)

  handleGeoLocation = () => {
    if (!navigator.geolocation) return
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(position => {
      const userPosition = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      this.setState({ userPosition, center: userPosition, zoom: 16 }, resolve)
    }, reject, { enableHighAccuracy: true }))
  }

  toggleInfoBox = id => {
    const { openedInfoBoxes } = this.state
    if (includes(openedInfoBoxes, id)) {
      this.setState({ openedInfoBoxes: openedInfoBoxes.filter(item => item !== id) })
    } else {
      this.setState({ openedInfoBoxes: openedInfoBoxes.concat(id) })
    }
  }

  onBoundsChanged = debounce(() => requestAnimationFrame(() => {
    const { retailers } = this.props
    if (this.map) {
      const retailersInView = retailers.filter(retailer => this.map.getBounds().contains(retailer.coordinates))
      this.setState({ retailersInView })
    }
  }), 150, { leading: true, trailing: true })

  zoomToFitNearestRetailer = () => {
    const { retailers } = this.props
    const { center } = this.state
    if (center) {
      const nearestRetailer = findNearestCoordinatesInCollection(retailers, center)
      console.log(nearestRetailer)
      const bounds = new window.google.maps.LatLngBounds()
      bounds.extend(nearestRetailer.coordinates)
      bounds.extend(center)
      this.map.fitBounds(bounds)
    }
  }

  componentWillMount() {
    const { countryCode } = this.props
    getCountry(countryCode)
      .then(country => this.setState({ country }))
      .then(this.centerToCountry)
      .then(this.handleGeoLocation)
  }

  render() {
    const { options, retailers, styles, color } = this.props
    const { center, openedInfoBoxes, zoom, marker, retailersInView } = this.state
    const wrapperClasses = ["retailer-map__container"]
    if (retailersInView && retailersInView.length) wrapperClasses.push("retailers-are-visible")

    return (
      <div className={wrapperClasses.join(" ")}>
        <RetailerList retailers={retailers} perPage={5} />
        <GoogleMap
          ref={map => this.map = map}
          defaultOptions={{ ...RetailerMap.defaultOptions, ...options }}
          center={center}
          onBoundsChanged={this.onBoundsChanged}
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
                position={retailer.coordinates}
                icon={generateMarkerIcon(color)}>
                {includes(openedInfoBoxes, retailer.id) &&
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

const defaultProps = {
  loadingElement: <div style={{ height: '100%' }} />,
  mapElement: <div className="retailer-map__viewport" />,
  containerElement: <div className="retailer-map" />
}

const RetailerMapWithGoogle = withScriptjs(withGoogleMap(props => <RetailerMap {...props} />))
export default props => <RetailerMapWithGoogle {...defaultProps} {...props} />
