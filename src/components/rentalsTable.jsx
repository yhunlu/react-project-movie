import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";
import auth from "../services/authService";

class RentalsTable extends Component {
    columns = [
        {
            path: "customer.name",
            label: "Name",
            content: (rental) => (
                <Link to={`/rentals/${rental._id}`}>{rental.customer.name}</Link>
            ),
        },
        { path: "customer.phone", label: "Phone" },
        {
            path: "movie.title",
            label: "Movie Title",
        },
        {
            path: "movie.dailyRentalRate",
            label: "Rate",
        },
        { path: "dateOut", label: "Rental Date" },
    ];

    deleteColumn = {
        key: "delete",
        content: (rental) => (
            <button
                onClick={() => this.props.onDelete(rental)}
                className="btn btn-danger btn-sm"
            >
                Delete
            </button>
        )
    };

    constructor() {
        super();
        const user = auth.getCurrentUser();
        if (user && user.isAdmin) this.columns.push(this.deleteColumn)
    }

    render() {
        const { rentals, onSort, sortColumn } = this.props;
        return (
            <Table
                columns={this.columns}
                data={rentals}
                sortColumn={sortColumn}
                onSort={onSort}
            />
        );
    }
}

export default RentalsTable;
