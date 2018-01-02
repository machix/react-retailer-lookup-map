import React, { Component } from "react"
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
    const { retailers, perPage } = this.props
    const { pageCount, offset, currentPage } = this.state
    if (retailers && retailers.length) {
      return (
        <div className="retailer-map__list">
          {retailers
            .slice((currentPage - 1) * perPage, currentPage * perPage)
            .map(retailer => (
              <div className="" key={retailer.id}>
                {retailer.title}
              </div>
            ))}
          <Pagination previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={<a href="">...</a>}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
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
