import React from "react";
import L from "leaflet";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
// import Basemap from "./Basemaps";
import GeojsonLayer from "./GeojsonLayer";
import "../css/Map.css";
import CenterMapWidget from "./centerMapWidget";
import BasemapGeojsonModal from "./BasemapGeojsonModal";

// указываем путь к файлам marker
// L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

class MapComponent extends React.Component {
  state = {
    lat: 55.702868,
    lng: 37.530865,
    zoom: 10,
    basemap: "osm",
    markers: [
      {
        id: 1,
        coordinates: [37.5677490234375, 55.67835873246176]
      },
      {
        id: 2,
        coordinates: [37.662506103515625, 55.584554519645074]
      },
      {
        id: 3,
        coordinates: [37.77923583984374, 55.60085069621599]
      },
      {
        id: 4,
        coordinates: [37.843780517578125, 55.68455275165637]
      },
      {
        id: 5,
        coordinates: [37.8204345703125, 55.713960948980805]
      },
      {
        id: 6,
        coordinates: [37.6995849609375, 55.72401656896143]
      },
      {
        id: 7,
        coordinates: [37.577362060546875, 55.72401656896143]
      },
      {
        id: 8,
        coordinates: [37.77923583984374, 55.66441860246834]
      },
      {
        id: 9,
        coordinates: [37.5677490234375, 55.67835873246176]
      },
      {
        id: 10,
        coordinates: [37.530865, 55.702868]
      }
    ],

    geojsonvisible: false
  };

  onBMChange = bm => {
    this.setState({
      basemap: bm
    });
  };

  onGeojsonToggle = e => {
    this.setState({
      geojsonvisible: e.currentTarget.checked
    });
  };

  onCenterLatChange = lat => {
    try {
      this.setState({
        lat: lat
      });
    } catch (error) {
      alert("You must enter only valid numbers");
    }
  };

  onCenterLngChange = lng => {
    try {
      this.setState({
        lng: lng
      });
    } catch (error) {
      alert("You must enter only valid numbers");
    }
  };

  onBmGjToogle = (bm, geojsonVisible) => {
    this.setState({
      basemap: bm,
      geojsonvisible: geojsonVisible,
    });
  };

  render() {
    const circleIcon = L.divIcon({ className: "my-div-icon" });

    const basemapsDict = {
      osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      cycle: "https://dev.{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png"
    };

    return (
      <Map zoom={this.state.zoom} center={[this.state.lat, this.state.lng]}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={basemapsDict[this.state.basemap]}
        />
        {/* <Basemap basemap={this.state.basemap} onChange={this.onBMChange} /> */}

        {/* <div className="geojson-toggle">
          <label htmlFor="layertoggle">Toggle Geojson </label>
          <input
            type="checkbox"
            name="layertoggle"
            id="layertoggle"
            value={this.state.geojsonvisible}
            onChange={this.onGeojsonToggle}
          />
        </div> */}

        <CenterMapWidget
          lat={this.state.lat}
          lng={this.state.lng}
          onLatChange={this.onCenterLatChange}
          onLngChange={this.onCenterLngChange}
        />

        <BasemapGeojsonModal onBmGjToogle={this.onBmGjToogle}/>

        {this.state.geojsonvisible && <GeojsonLayer url="geojson.json" />}

        {this.state.markers.map(f => {
          return (
            <Marker
              position={[f.coordinates[1], f.coordinates[0]]}
              key={f.id}
              icon={circleIcon}
            >
              <Popup>{f.id}</Popup>
            </Marker>
          );
        })}
      </Map>
    );
  }
}

export default MapComponent;
