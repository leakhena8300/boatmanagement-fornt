import React, { Component } from "react";
import BoatDataService from "../services/boat.service";
import authService from '../services/auth.service';

export default class AddBoat extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBoat = this.saveBoat.bind(this);
    this.newBoat = this.newBoat.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",

      submitted: false,
    };
  }

  componentDidMount() {
    const token = authService.getToken();
    if (!token) {
      console.log("No token found, redirecting to login...");
      window.location.href = '/login';
    }
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  validateForm() {
    let isValid = true; // Initialize isValid to true

    // Clear previous error messages
    this.setState({ nameError: "", descriptionError: "" });
  
    // Validate name
    if (!this.state.name) {
      this.setState({ nameError: "Name is required" });
      isValid = false; // Set isValid to false if there's an error
    }
  
    // Validate description
    if (!this.state.description) {
      this.setState({ descriptionError: "Description is required" });
      isValid = false; // Set isValid to false if there's an error
    }
  
    return isValid; // Return isValid
  }

  saveBoat() {
    if (this.validateForm()) { // Ensure validation before submission
      var data = {
        name: this.state.name,
        description: this.state.description
      };
  
      BoatDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            name: response.data.name,
            description: response.data.description,
            submitted: true
          });
          console.log(response.data);
        })
        .catch(error => {
          console.log("Error caught:",error);
          if (error.response && error.response.status === 401) {
            // Handle unauthorized access: redirect to login
            console.log("Unauthorized access, redirecting to login...");
            window.location.href = '/login';
          } else {
            // Handle other types of errors
            console.log("Error fetching boats:", error.message);
            this.setState({
              error: error.message || "Error addning boats."
            });
          }
        });
    } else {
      console.log("Form validation failed. Cannot submit.");
    }
  }

  newBoat() {
    this.setState({
      id: null,
      name: "",
      description: "",

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newBoat}>
              Add
            </button>
          </div>
        ) : (
          <div>
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
              {this.state.nameError && (
                <div className="text-danger">{this.state.nameError}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
              {this.state.descriptionError && (
                <div className="text-danger">{this.state.descriptionError}</div>
              )}
            </div>

            <button onClick={this.saveBoat} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
