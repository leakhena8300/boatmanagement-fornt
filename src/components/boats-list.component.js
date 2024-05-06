import React, { Component } from "react";
import BoatDataService from "../services/boat.service";
import { Link } from "react-router-dom";

import '../style.css';

export default class BoatList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveBoats = this.retrieveBoats.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveBoat = this.setActiveBoat.bind(this);
    this.removeAllBoats = this.removeAllBoats.bind(this);
   
    this.searchName = this.searchName.bind(this);

    this.state = {
      boats: [],
      currentBoat: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveBoats();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveBoats() {
    BoatDataService.getAll().then(
      response => {
        this.setState({
          boats: response.data
        });
      })
      .catch(error => {
        console.log("Error caught:", error); // Check the error object
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access: redirect to login
          console.log("Unauthorized access, redirecting to login...");
          window.location.href = '/login';
        } else {
          // Handle other types of errors
          console.log("Error fetching boats:", error.message);
          this.setState({
            error: error.message || "Error fetching boats."
          });
        }
      });
  }

  refreshList() {
    this.retrieveBoats();
    this.setState({
      currentBoat: null,
      currentIndex: -1
    });
  }

  setActiveBoat(boat, index) {
    this.setState({
      currentBoat: boat,
      currentIndex: index
    });
  }

  removeAllBoats() {
    BoatDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }
  
  searchName() {
    this.setState({
      currentBoat: null,
      currentIndex: -1
    });

    BoatDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          boats: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, boats, currentBoat, currentIndex } = this.state;

    return (
      <div className="list row" id = "custom-row">
        <div className="col-md-6">
        <div class="test">
        <h5>Welcome Admin Board</h5></div>
        </div>
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Boats List</h4>

          <ul className="list-group">
            {boats &&
              boats.map((boat, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveBoat(boat, index)}
                  key={index}
                >
                  {boat.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllBoats}
          >
            Remove All
          </button>
          <div className="m-3 btn btn-sm btn-danger">
            <Link to="/addboat"><font color ="white">Add Boat</font></Link>
          </div>
        </div>
        <div className="col-md-6">
          {currentBoat ? (
            <div>
              <h4>Boat</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentBoat.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentBoat.description}
              </div>
              
              <Link
                to={"/boats/" + currentBoat.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Boat...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
