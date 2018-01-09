import React, { Component } from "react"
import { compare } from "alphanumeric-sort"
import { orderByProximity } from "../utils"
import Pagination from "react-paginate"
import RetailerItem from "./retailer-item"
import "../styles/retailer-list.scss"

export default class RetailerList extends Component {
  state = {
    pageCount: 0,
    offset: 0,
    currentPage: 1,
    perPage: 4
  }

  handlePageClick = ({ selected }) => this.setState({ currentPage: selected })

  componentWillMount() {
    const { retailers } = this.props
    const { perPage } = this.state
    if (retailers) {
      const pageCount = Math.ceil(retailers.length / perPage)
      this.setState({ pageCount })
    }
  }

  render() {
    const { retailers, onRetailerClick, position } = this.props
    const { pageCount, offset, currentPage, perPage } = this.state
    if (retailers && retailers.length) {
      return (
        <div className="retailer-list">
          {retailers && orderByProximity(retailers, position)
            .slice(currentPage * perPage, (currentPage + 1) * perPage)
            .map(retailer => <RetailerItem retailer={retailer} onClick={() => onRetailerClick(retailer)} key={retailer.id} />)}
          <Pagination
            previousLabel={"❮"}
            nextLabel={"❯"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={4}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"} />
        </div>
      )
    }
    return null
  }
}
