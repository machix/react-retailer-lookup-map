import memoize from "lodash.memoize"

const clusterSVG = color => 'data:image/svg+xml,' + (encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 489.817 489.817" style="enable-background:new 0 0 489.817 489.817;" xml:space="preserve"><g>
<path d="M234.072,485.917c6.3,5.2,15.4,5.2,21.7,0c101.6-84.4,146.9-162,166.6-208.6c5.7-12.3,10.1-25.3,13.2-38.8   c0.9-4,1.3-6.1,1.3-6.1l0,0c2.3-12,3.5-24.4,3.5-37.1c-0.1-110.1-91.4-199-202.5-195.2c-97.3,3.4-178.1,79.3-187.5,176.2  c-1.9,19.4-0.8,38.2,2.6,56.1l0,0c0,0,0.3,2.1,1.3,6.1c3,13.5,7.5,26.5,13.2,38.8C87.172,323.817,132.372,401.517,234.072,485.917z " fill="${color}"/></g></svg>`))
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

const markerSVG = (color, width, height) => 'data:image/svg+xml,' + (encodeURIComponent(`<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="${width}px" height="${height}px" viewBox="0 0 52 52" style="enable-background:new 0 0 52 52;" xml:space="preserve"> <path style="fill:${color};" d="M38.853,5.324L38.853,5.324c-7.098-7.098-18.607-7.098-25.706,0h0 C6.751,11.72,6.031,23.763,11.459,31L26,52l14.541-21C45.969,23.763,45.249,11.72,38.853,5.324z M26.177,24c-3.314,0-6-2.686-6-6 s2.686-6,6-6s6,2.686,6,6S29.491,24,26.177,24z"/></svg>`))
export const generateMarkerIcon = (color, width = 30, height = 30) => new window.google.maps.MarkerImage(markerSVG(color, width, height), new window.google.maps.Size(height, width), new window.google.maps.Point(0, 0))


/**
 * Use googles geocoder api to get an object for a country that can be used in google maps
 * @param {string} countryCode
 */
export const getCountry = countryCode => new Promise(resolve => {
  const geocoder = new window.google.maps.Geocoder()
  geocoder.geocode({
    address: countryCode
  }, result => {
    resolve(result[0])
  })
})

/**
 * Pass a collection of items with coordinates and a position and get the nearest item to that location returned
 * @param {array} collection
 * @param { { lat: number, lng: number } } position
 */
export const findNearestCoordinatesInCollection = memoize((collection, position) => {
  const { lat, lng } = position
  const equatorialRadius = 6371
  const radian = (Math.PI / 180)
  let distances = []
  let nearest = -1

  for (let i = 0; i < collection.length; i++) {
    const itemLat = collection[i].coordinates.lat
    const itemLng = collection[i].coordinates.lng

    const chLat = itemLat - lat
    const chLng = itemLng - lng

    const dLat = chLat * radian
    const dLng = chLng * radian

    const rLat = lat * radian
    const rItemLat = itemLat * radian

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(rLat) * Math.cos(rItemLat)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = equatorialRadius * c

    distances[i] = d
    if (nearest == -1 || d < distances[nearest]) {
      nearest = i
    }
  }
  return { ...collection[nearest] }
})
