import React, { Component } from "react"
import Autosuggest from "react-autosuggest"
import { googleMapsAutocomplete, googlePlacesSearch } from "../utils"
import debounce from "lodash.debounce"
import keycode from "keycode"
import "../styles/retailer-search.scss"

const getSuggestionValue = suggestion => suggestion && suggestion.description

const renderSuggestion = suggestion => (
  <div className="retailer-search__suggestion">
    {suggestion.description}
  </div>
)

export default class SearchBox extends Component {
  state = {
    suggestions: [],
    value: ""
  }

  onSuggestionsFetchRequested = debounce(({ value }) => {
    const { country, language } = this.props
    googleMapsAutocomplete(value, country, language)
      .then(results => this.setState({ suggestions: results || [] }))
  }, 500, { leading: true })

  onSuggestionsClearRequested = () => this.setState({ suggestions: [] })

  onChange = (event, { newValue }) => this.setState({ value: newValue })

  onSuggestionSelected = e => {
    const { country, map, onLocationSelected } = this.props
    const { value } = e.currentTarget
    googlePlacesSearch(map, value, country)
      .then(results => onLocationSelected(results[0]))
  }

  handleEnter = e => {
    if (!e.currentTarget.value) return
    if (keycode(e) === 'enter') this.onSuggestionSelected(e)
  }

  render() {
    const { placeholder } = this.props
    const { value, suggestions } = this.state

    const inputProps = {
      value,
      placeholder,
      type: "search",
      className: "retailer-search__input",
      onChange: this.onChange,
      onKeyDown: this.handleEnter
    }

    return (
      <div className="retailer-search">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
      </div>
    )
  }
}
