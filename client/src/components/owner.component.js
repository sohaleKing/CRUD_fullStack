import React, { Component } from "react";
import OwnerDataService from "../services/owner.service";

export default class Owner extends Component {
  constructor(props) {
    super(props);
    this.onChangeAddress = this.onChangeAddress.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.getOwner = this.getOwner.bind(this);
    this.updateOwner = this.updateOwner.bind(this);
    this.deleteOwner = this.deleteOwner.bind(this);

    this.state = {
      currentOwner: {
        id: null,
        address: "",
        name: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getOwner(this.props.match.params.id);
  }

  onChangeAddress(e) {
    const address = e.target.value;

    this.setState(function (prevState) {
      return {
        currentOwner: {
          ...prevState.currentOwner,
          address: address,
        },
      };
    });
  }
  onChangeName(e) {
    const name = e.target.value;

    this.setState((prevState) => ({
      currentOwner: {
        ...prevState.currentOwner,
        name: name,
      },
    }));
  }
  getOwner(id) {
    OwnerDataService.get(id)
      .then((response) => {
        this.setState({
          currentOwner: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentOwner.id,
      address: this.state.currentOwner.address,
      name: this.state.currentOwner.name,
      published: status,
    };
    OwnerDataService.update(this.state.currentOwner.id, data)
      .then((response) => {
        this.setState((prevState) => ({
          currentOwner: {
            ...prevState.currentOwner,
            published: status,
          },
        }));
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateOwner() {
    OwnerDataService.update(this.state.currentOwner.id, this.state.currentOwner)
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The owner was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteOwner() {
    OwnerDataService.delete(this.state.currentOwner.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/homeowner");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentOwner } = this.state;

    return (
      <div>
        {currentOwner ? (
          <div className="edit-form">
            <h4>Owner</h4>
            <form>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={currentOwner.address}
                  onChange={this.onChangeAddress}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentOwner.name}
                  onChange={this.onChangeName}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteOwner}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateOwner}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Owner...</p>
          </div>
        )}
      </div>
    );
  }
}
