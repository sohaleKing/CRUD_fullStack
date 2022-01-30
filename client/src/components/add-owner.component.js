import React, { Component } from "react";
import OwnerDataService from "../services/owner.service";

export default class AddOwner extends Component {
  constructor(props) {
    super(props);
    this.onChangeaddress = this.onChangeaddress.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveOwner = this.saveOwner.bind(this);
    this.newOwner = this.newOwner.bind(this);

    this.state = {
      id: null,
      address: "",
      dob: "",
      name: {},
      coordinates: [],

      submitted: false,
    };
  }

  onChangeAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  saveOwner() {
    var data = {
      address: this.state.address,
      name: this.state.name,
    };

    OwnerDataService.create(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          address: response.data.address,
          name: response.data.name,

          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newOwner() {
    this.setState({
      id: null,
      address: "",
      name: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newOwner}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="address">address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                required
                value={this.state.address}
                onChange={this.onChangeaddress}
                name="address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <button onClick={this.saveOwner} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
