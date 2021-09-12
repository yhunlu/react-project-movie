import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCustomer, saveCustomer } from "../services/customerService";

class CustomerForm extends Form {
  state = {
    data: {
      isGold: false,
      name: "",
      phone: "",
    },
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    isGold: Joi.boolean().required().label("isGold"),
    name: Joi.string().min(5).max(50).required().label("name"),
    phone: Joi.string().min(5).max(50).required().label("phone"),
  };

  async populateCustomer() {
    try {
      const customerId = this.props.match.params.id;
      if (customerId === "new") return;

      const { data: customer } = await getCustomer(customerId);
      this.setState({ data: this.mapToViewModel(customer) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not/found");
    }
  }

  async componentDidMount() {
    await this.populateCustomer();
  }

  mapToViewModel(customer) {
    return {
      _id: customer._id,
      isGold: customer.isGold,
      name: customer.name,
      phone: customer.phone,
    };
  }

  doSubmit = async () => {
    await saveCustomer(this.state.data);
    this.props.history.push("/customers");
  };

  render() {
    return (
      <div>
        <h1>Customer Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("isGold", "Is Gold")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default CustomerForm;
