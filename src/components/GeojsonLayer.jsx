import React from 'react';
import { GeoJSON, FeatureGroup, Popup } from 'react-leaflet';
import "../css/GeojsonLayer.css"

export default class GeojsonLayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };

    console.log('contructor');
  }

  styleFeature = feature => {
    if (feature.geometry.type === "LineString") {
      return {
        dashArray: '10',
        color: "#000000",
        weight: 2
      };
    } else {
      return {
        fill: true,
        fillColor: "#ff1ffb",
        fillOpacity: 0.2,
        color: "#000000",
        weight: 1
      };
    }
  }

  render() {
    console.log('render');

    console.info(this.state.data);
    return (
      <FeatureGroup>
        {this.state.data.map(f => {
          return <GeoJSON key={f.properties.id} data={f} style={this.styleFeature(f)}>
             <Popup>{f.properties.name}</Popup>
          </GeoJSON>
        })}
      </FeatureGroup>
    );
  }

  componentDidMount() {
    if (this.props.url) {
      this.fetchData(this.props.url);
    }
    console.log('did mount');
  }

  componentWillUnmount() {
    console.log('will unmount');

  }

  fetchData(url) {
    let request = fetch(url);

    request
      .then(r => r.json())
      .then(data => {
        this.setState({
          data: data.features
        });
      }, (error) => {
        console.error(error);
      });
  }
}