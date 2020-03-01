import React from "react";
import { Modal, Button } from "antd";
import "antd/dist/antd.css";
import "../css/BasemapGeojsonModal.css";
import { Select, Typography, Checkbox, Row, Col } from "antd";

const { Option } = Select;
const { Text } = Typography;

class BasemapGeojsonModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      basemap: "osm",
      geojsonVisible: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    if (this.props.onBmGjToogle) {
      this.props.onBmGjToogle(this.state.basemap, this.state.geojsonVisible);
    }
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  onBmChange = value => {
    this.setState({
      basemap: value
    });
  };

  onGjToogle = e => {
    this.setState({
      geojsonVisible: e.target.checked,
    });
  };

  render() {
    return (
      <div className="basemapGeojsonModal__container">
        <Button type="primary" onClick={this.showModal}>
          Basemap-Geojson Toogle
        </Button>
        <Modal
          title="Basemap-Geojson Toogle"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Row style={{ alignItems: "center" }}>
            <Col span={12}>
              <Text>Basemap: </Text>
              <Select
                value={this.state.basemap}
                style={{ width: 120 }}
                onChange={this.onBmChange}
              >
                <Option value="osm">OSM</Option>
                <Option value="hot">OSM HOT</Option>
                <Option value="dark">DARK</Option>
                <Option value="cycle">CYCLE MAP</Option>
              </Select>
            </Col>
            <Col span={12}>
              <Checkbox
                checked={this.state.geojsonVisible}
                onChange={this.onGjToogle}
              >
                Toogle Geojson
              </Checkbox>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default BasemapGeojsonModal;
