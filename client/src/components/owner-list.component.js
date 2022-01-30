import React, { Component } from "react";
import OwnerDataService from "../services/owner.service";
import { Link } from "react-router-dom";

export default class OwnersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchAddress = this.onChangeSearchAddress.bind(this);
    this.retrieveOwners = this.retrieveOwners.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOwner = this.setActiveOwner.bind(this);
    this.removeAllOwners = this.removeAllOwners.bind(this);
    this.searchAddress = this.searchAddress.bind(this);

    this.state = {
      homeowner: [],
      currentOwner: null,
      currentIndex: -1,
      searchAddress: "",
    };
  }

  componentDidMount() {
    this.retrieveOwners();
  }

  onChangeSearchAddress(e) {
    const searchAddress = e.target.value;

    this.setState({
      searchAddress: searchAddress,
    });
  }

  retrieveOwners() {
    OwnerDataService.getAll()
      .then((response) => {
        this.setState({
          homeowner: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOwners();
    this.setState({
      currentOwner: null,
      currentIndex: -1,
    });
  }

  setActiveOwner(owner, index) {
    this.setState({
      currentOwner: owner,
      currentIndex: index,
    });
  }

  removeAllOwners() {
    OwnerDataService.deleteAll()
      .then((response) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  searchAddress() {
    OwnerDataService.findByAddress(this.state.searchAddress)
      .then((response) => {
        this.setState({
          homeowner: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchAddress, homeowner, currentOwner, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by address"
              value={searchAddress}
              onChange={this.onChangeSearchAddress}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchAddress}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Owners List</h4>

          <ul className="list-group">
            {homeowner &&
              homeowner.map((owner, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveOwner(owner, index)}
                  key={index}
                >
                  {owner.address}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllOwners}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentOwner ? (
            <div>
              <h4>Owner</h4>
              <div>
                <label>
                  <strong>address</strong>
                </label>{" "}
                {currentOwner.address}
              </div>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentOwner.name}
              </div>

              <Link
                to={"/homeowner/" + currentOwner.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Owner...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
