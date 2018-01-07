import React, { Component } from "react"
import "./styles/retailer-map.scss"
import RetailerList from "./components/retailer-list"
import RetailerInfoBox from "./components/retailer-infobox"
import SearchBox from "./components/search-box"

import includes from "lodash.includes"
import some from "lodash.some"
import debounce from "lodash.debounce"

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"
import { generateClusterStyles, generateMarkerIcon, getCountry, findNearestMarkerCoords } from "./utils"

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
      this.setState({ userPosition, center: userPosition, zoom: 15 }, resolve)
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

  focusNearestRetailer = () => {
    const { retailers } = this.props
    const { center } = this.state
    const nearestRetailer = findNearestMarkerCoords(retailers, center)
    this.focusRetailer(nearestRetailer)
  }

  focusRetailer = retailer => {
    const { openedInfoBoxes } = this.state
    this.setState({ center: retailer.coordinates, zoom: 15, openedInfoBoxes: [retailer.id] })
  }

  onLocationSelected = location => {
    if (!location) return
    this.setState({ center: location.geometry.location }, this.focusNearestRetailer)
  }

  componentWillMount() {
    const { countryCode } = this.props
    getCountry(countryCode)
      .then(country => this.setState({ country }, this.centerToCountry))
      .then(this.handleGeoLocation)
      .then(this.focusNearestRetailer)
  }

  render() {
    const { options, retailers, styles, color } = this.props
    const { center, openedInfoBoxes, zoom, marker, retailersInView, country } = this.state
    return (
      <div className="retailer-map__container">
        <SearchBox country={country} map={this.map} onLocationSelected={this.onLocationSelected} />
        <RetailerList retailers={retailers} perPage={5} onRetailerClick={this.focusRetailer} />
        <GoogleMap
          ref={map => this.map = map ? map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED : null}
          defaultOptions={{ ...RetailerMap.defaultOptions, ...options }}
          onCenterChanged={this.onCenterChanged}
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
                position={retailer.coordinates}
                icon={generateMarkerIcon(color)}>
                {includes(openedInfoBoxes, retailer.id) && <RetailerInfoBox retailer={retailer} />}
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
