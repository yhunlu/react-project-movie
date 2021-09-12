import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import RentalsTable from "./rentalsTable";
import { getRentals, deleteRental } from "../services/rentalService";
import { getMovies } from "../services/movieService";
import { getCustomers } from "../services/customerService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import SearchBox from "./common/searchBox";

class Rentals extends Component {
  state = {
    rentals: [],
    customers: [],
    movies: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedCustomer: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getCustomers();
    const customers = [{ _id: "", name: "All Customers" }, ...data];

    const { data: movies } = await getMovies();
    const { data: rentals } = await getRentals();

    this.setState({ rentals, customers, movies });
  }

  handleDelete = async (rental) => {
    const originalRentals = this.state.rentals;

    const rentals = this.state.rentals.filter((m) => m._id !== rental._id);
    this.setState({ rentals });

    try {
      await deleteRental(rental._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.warning("This rental has already been deleted.");
      if (ex.response && ex.response.status === 403)
        toast.error("Unauthorized Action.");
      this.setState({ rentals: originalRentals });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleCustomerSelect = (customer) => {
    this.setState({ selectedCustomer: customer, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedCustomer: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedCustomer,
      searchQuery,
      rentals: allRentals,
    } = this.state;

    let filtered = allRentals;
    if (searchQuery)
      filtered = allRentals.filter((m) =>
        m.movie.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCustomer && selectedCustomer._id)
      filtered = allRentals.filter((m) => m.customer._id === selectedCustomer._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const rentals = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: rentals };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: rentals } = this.getPagedData();

    return (
      <div className="row">
        <h1>Rentals</h1>
        <div className="col-3">
          <Link
            to="/rentals/new"
            className="btn btn-outline-warning"
            style={{ marginBottom: 10 }}
          >
            New Rental
          </Link>
          <ListGroup
            items={this.state.customers}
            selectedItem={this.state.selectedCustomer}
            onItemSelect={this.handleCustomerSelect}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} rentals in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <RentalsTable
            rentals={rentals}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Rentals;
