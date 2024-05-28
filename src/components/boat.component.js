import React, { Component } from "react";
import BoatDataService from "../services/boat.service";
import authService from '../services/auth.service';
import { withRouter } from '../common/with-router';

class Boat extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getBoat = this.getBoat.bind(this);
    this.deleteBoat = this.deleteBoat.bind(this);

    this.state = {
      currentBoat: {
        id: null,
        name: "",
        description: ""
      },
      message: ""
    };
    // Bind `this` to the updateBoat method
    this.updateBoat = this.updateBoat.bind(this);
  }

  componentDidMount() {
    const token = authService.getToken();
    if (!token) {
      console.log("No token found, redirecting to login...");
      window.location.href = '/login';
    }
    this.getBoat(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentBoat: {
          ...prevState.currentBoat,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentBoat: {
        ...prevState.currentBoat,
        description: description
      }
    }));
  }

  getBoat(id) {
    BoatDataService.get(id)
      .then(response => {
        this.setState({
          currentBoat: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

 
  updateBoat() {
    BoatDataService.update(
      this.state.currentBoat.id,
      this.state.currentBoat
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The boat was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteBoat() {    
    BoatDataService.delete(this.state.currentBoat.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/admin');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentBoat } = this.state;

    return (
      <div>
        {currentBoat ? (
          <div className="edit-form">
            <h4>Boat</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentBoat.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentBoat.description}
                  onChange={this.onChangeDescription}
                />
              </div>

            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteBoat}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateBoat}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Boat...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Boat);