import memoize from "lodash.memoize"
import orderBy from "lodash.orderby"


const base64SVG = svg => 'data:image/svg+xml,' + encodeURIComponent(svg)
const clusterSVG = color => base64SVG(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.817 489.817" style="enable-background:new 0 0 489.817 489.817;" xml:space="preserve"><g>
<path d="M234.072,485.917c6.3,5.2,15.4,5.2,21.7,0c101.6-84.4,146.9-162,166.6-208.6c5.7-12.3,10.1-25.3,13.2-38.8   c0.9-4,1.3-6.1,1.3-6.1l0,0c2.3-12,3.5-24.4,3.5-37.1c-0.1-110.1-91.4-199-202.5-195.2c-97.3,3.4-178.1,79.3-187.5,176.2  c-1.9,19.4-0.8,38.2,2.6,56.1l0,0c0,0,0.3,2.1,1.3,6.1c3,13.5,7.5,26.5,13.2,38.8C87.172,323.817,132.372,401.517,234.072,485.917z " fill="${color}"/></g></svg>`)

export const generateClusterStyles = color => {
  const defaultStyle = {
    url: clusterSVG(color),
    textColor: 'white',
  }
  return [{
    ...defaultStyle,
    width: 30,
    height: 30,
    textSize: 12
  }, {
    ...defaultStyle,
    width: 40,
    height: 40,
    textSize: 15
  }, {
    ...defaultStyle,
    width: 50,
    height: 50,
    textSize: 17
  }]
}

const markerSVG = (color, width, height) => base64SVG(`<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="${width}px" height="${height}px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"> <path style="fill:${color};" d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0 C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6 s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z"/></svg>`)
export const generateMarkerIcon = (color, width = 30, height = 30) => new window.google.maps.MarkerImage(markerSVG(color, width, height), new window.google.maps.Size(height, width), new window.google.maps.Point(0, 0))

const currentLocationSVG = (color, width, height) => base64SVG(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 188.111 188.111" width="${width}" height="${height}"><g fill="${color}"><path d="M94.052 0C42.19.001 0 42.194.001 94.055c0 51.862 42.191 94.056 94.051 94.057 51.864-.001 94.059-42.194 94.059-94.056C188.11 42.193 145.916 0 94.052 0zm0 173.111c-43.589-.001-79.051-35.465-79.051-79.057C15 50.464 50.462 15.001 94.052 15c43.593 0 79.059 35.464 79.059 79.056-.001 43.59-35.466 79.054-79.059 79.055z"/><path d="M94.053 50.851c-23.821.002-43.202 19.384-43.202 43.204 0 23.824 19.381 43.206 43.203 43.206 23.823 0 43.205-19.382 43.205-43.205 0-23.824-19.382-43.205-43.206-43.205zm.001 71.41c-15.551 0-28.203-12.653-28.203-28.206 0-15.55 12.652-28.203 28.203-28.204 15.553 0 28.205 12.653 28.205 28.205 0 15.552-12.653 28.205-28.205 28.205z"/><circle cx="94.055" cy="94.056" r="16.229"/></g></svg>`)
export const generateCurrentLocationIcon = (color, width = 30, height = 30) => new window.google.maps.MarkerImage(currentLocationSVG(color, width = 30, height = 30), new window.google.maps.Size(height, width), new window.google.maps.Point(0, 0))

/**
 * Use googles geocoder api to get an object for a country that can be used in google maps
 * @param {string} country
 */
export const getCountry = country => new Promise(resolve => {
  const geocoder = new window.google.maps.Geocoder()
  const componentRestrictions = { country }
  geocoder.geocode({ address: country, componentRestrictions }, result => resolve(result[0]))
})

export const findNearestCoordsInCollection = (collection, position) =>
  collection.reduce((previous, current) => {
    const maps = window.google.maps
    const currentPosition = maps.geometry.spherical.computeDistanceBetween(position, new maps.LatLng(...current.coordinates))
    const previousPosition = maps.geometry.spherical.computeDistanceBetween(position, new maps.LatLng(...previous.coordinates))
    return currentPosition < previousPosition ? current : previous
  })

export const orderByProximity = (collection, position) => orderBy(collection, item => window.google.maps.geometry.spherical.computeDistanceBetween(position, new window.google.maps.LatLng(...item.coordinates)))

export const googleMapsAutocomplete = (query, country) => {
  if (!query) return
  const service = new window.google.maps.places.AutocompleteService()
  const input = query + (country ? ", " + country.formatted_address : "")
  return new Promise(resolve => service.getQueryPredictions({ input }, result => resolve(result)))
}

export const googlePlacesSearch = (map, query, country) => {
  const service = new window.google.maps.places.PlacesService(map)
  return new Promise(resolve => service.textSearch({ query }, results => resolve(results)))
}

