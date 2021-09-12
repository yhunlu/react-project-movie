import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getCustomers, deleteCustomer } from "../services/customerService";

function Customers(props) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function getLocalCustomers() {
      const { data: customers } = await getCustomers();
      setCustomers(customers);
    }

    getLocalCustomers();
  }, [setCustomers]);

  const handleDelete = async (id) => {
    const originalCustomers = customers;

    const customers_ = customers.filter((m) => m._id !== id);
    setCustomers(customers_);

    try {
      await deleteCustomer(id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.warning("This customer has already been deleted.");
      if (ex.response && ex.response.status === 403)
        toast.error("Unauthorized Action.");
      setCustomers(originalCustomers);
    }
  }

  return (
    <div>
      <h1>Customers</h1>
      <div className="col-3">
        <Link
          to="/customers/new"
          className="btn btn-outline-warning"
          style={{ marginBottom: 40, marginTop: 20 }}
        >
          New Customer
        </Link>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {customers.map((customer) => (
          <Fragment>
            <div className="col" key={customer._id}>
              <div className="card">
                <div
                  className={
                    customer.isGold === true
                      ? "card text-white bg-success mb-3"
                      : "card text-white bg-secondary mb-3"
                  }
                >
                  <div className="card-header">
                    {customer.isGold === true
                      ? "GOLD CUSTOMER"
                      : "REGULAR CUSTOMER"}
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      <Link to={`/customers/${customer._id}`}>
                        {customer.name}
                      </Link>
                    </h5>
                    <p className="card-text">{customer.phone}</p>
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default Customers;
