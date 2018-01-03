import React, { Component } from "react"
import { compare } from "alphanumeric-sort"
import Pagination from "react-paginate"

export default class RetailerList extends Component {

  state = {
    pageCount: 0,
    offset: 0,
    currentPage: 1
  }

  handlePageClick = ({ selected }) => this.setState({ currentPage: selected })

  componentWillReceiveProps({ retailers, perPage }) {
    if (retailers) {
      const pageCount = Math.ceil(retailers.length / perPage)
      this.setState({ pageCount })
    }
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  render() {
    const { retailers, perPage, onRetailerClick } = this.props
    const { pageCount, offset, currentPage } = this.state
    if (retailers && retailers.length) {
      return (
        <div className="retailer-map__list">
          {retailers
            .sort((a, b) => compare(a.title, b.title))
            .slice(currentPage * perPage, (currentPage + 1) * perPage)
            .map(retailer => (
              <div className="retailer-map__retailer-item" onClick={() => onRetailerClick(retailer)} key={retailer.id}>
                {retailer.title}
              </div>
            ))}
          <Pagination previousLabel={"❮"}
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
