import React from "react";
import "../css/centerMapWidget.css";

class CenterMapWidget extends React.Component {

  onLatChange = (e) => {
    const lat = e.currentTarget.value;
    this.props.onLatChange(lat);
  }

  onLngChange = (e) => {
    const lng = e.urrentTarget.value;
    this.props.onLngChange(lng);
  }

  render() {
    return (
      <form className="centerMapForm">
        <label className="centerMapFrom__label">
          Широта
          <input
            type="text"
            className="centerMapFrom__input"
            name="lat"
            value={this.props.lat}
            onChange={this.onLatChange}
          />
        </label>
        <label className="centerMapFrom__label">
          Долгота
          <input
            type="text"
            className="centerMapFrom__input"
            name="lng"
            value={this.props.lng}
            onChange={this.onLngChange}
          />
        </label>
      </form>
    );
  }
}

export default CenterMapWidget;
