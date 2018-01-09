import React, { Component } from "react"
import "./styles/retailer-map.scss"
import RetailerList from "./components/retailer-list"
import RetailerInfoBox from "./components/retailer-infobox"
import RetailerSearch from "./components/retailer-search"
import { MAP_CONTEXT_KEY } from "./constants"
import { generateClusterStyles, generateMarkerIcon, generateCurrentLocationIcon, getCountry, findNearestCoordsInCollection } from "./utils"

import includes from "lodash.includes"
import some from "lodash.some"
import debounce from "lodash.debounce"

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { MarkerClusterer } from "react-google-maps/lib/components/addons/MarkerClusterer"

class RetailerMap extends Component {

  static defaultOptions = {
    disableDefaultUI: true,
    defaultZoom: 8
  }

  state = {
    country: {},
    openedInfoBoxes: [],
  }

  fitNearestRetailerInViewport = () => {
    const { retailers } = this.props
    const { center } = this.state
    const nearestRetailer = findNearestCoordsInCollection(retailers, center)
    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend(center)
    bounds.extend(nearestRetailer.coordinates)
    this.map.fitBounds(bounds)
  }

  centerToCountry = () => {
    const { country } = this.state
    return new Promise(resolve => this.setState({ center: country.geometry.location }, () => resolve(this.map.fitBounds(country.geometry.bounds))))
  }

  handleGeoLocation = () => {
    const { geolocate } = this.props
    if (!navigator.geolocation || !geolocate) return
    return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(position => {
      const userPosition = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      this.setState({ userPosition, center: userPosition, zoom: 15 }, () => resolve(this.fitNearestRetailerInViewport()))
    }, reject, { enableHighAccuracy: true }))
  }

  focusNearestRetailer = () => {
    const { retailers } = this.props
    const { center } = this.state
    const nearestRetailer = findNearestCoordsInCollection(retailers, center)
    this.focusRetailer(nearestRetailer)
  }

  focusRetailer = retailer => {
    const { openedInfoBoxes, center } = this.state
    const bounds = new window.google.maps.LatLngBounds()
    bounds.extend(retailer.coordinates)
    bounds.extend(center)
    this.openInfoBox(retailer.id)
    this.map.panTo(retailer.coordinates)
    this.map.fitBounds(bounds)
    this.setState({ center: retailer.coordinates, zoom: 15, focusedRetailer: retailer })
  }

  toggleInfoBox = id => {
    const { openedInfoBoxes } = this.state
    includes(openedInfoBoxes, id) ? this.closeInfoBox(id) : this.openInfoBox(id)
  }

  closeInfoBox = id => {
    const { openedInfoBoxes } = this.state
    this.setState({ openedInfoBoxes: openedInfoBoxes.filter(item => item !== id) })
  }

  openInfoBox = id => {
    const { openedInfoBoxes } = this.state
    if (!includes(openedInfoBoxes, id)) this.setState({ openedInfoBoxes: openedInfoBoxes.concat(id) })
  }

  clearFocusedRetailer = () => this.setState({ focusedRetailer: null })

  onLocationSelected = selectedLocation => {
    if (!selectedLocation) return
    console.log(this.map)
    this.setState({ center: selectedLocation.geometry.location, selectedLocation }, this.focusNearestRetailer)
  }

  componentWillMount() {
    const { countryCode, geolocate } = this.props
    getCountry(countryCode)
      .then(country => this.setState({ country }, this.centerToCountry))
      .then(this.handleGeoLocation)
  }

  render() {
    const { options, retailers, styles, color, placeholder } = this.props
    const { center, focusedRetailer, zoom, marker, retailersInView, country, userPosition, openedInfoBoxes } = this.state
    return (
      <div className="retailer-map__container">
        <RetailerSearch country={country} map={this.map} placeholder={placeholder} onLocationSelected={this.onLocationSelected} />
        {country.hasOwnProperty("geometry") && <RetailerList position={userPosition || country.geometry.location} retailers={retailers} onRetailerClick={this.focusRetailer} />}
        <GoogleMap
          ref={map => this.map = map ? map.context[MAP_CONTEXT_KEY] : null}
          defaultOptions={{ ...RetailerMap.defaultOptions, ...options }}
          center={center}
          zoom={zoom}
          styles={styles}>
          <MarkerClusterer
            averageCenter
            styles={generateClusterStyles(color)}
            enableRetinaIcons
            gridSize={60}>
            {userPosition && <Marker title="You are here" icon={generateCurrentLocationIcon(color)} position={userPosition} />}
            {retailers
              .map(retailer => (
                <Marker key={retailer.id}
                  onClick={() => this.openInfoBox(retailer.id)}
                  position={retailer.coordinates}
                  icon={generateMarkerIcon(color)}>
                  {includes(openedInfoBoxes, retailer.id) && <RetailerInfoBox retailer={retailer} onCloseClick={() => this.closeInfoBox(retailer.id)} />}
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
