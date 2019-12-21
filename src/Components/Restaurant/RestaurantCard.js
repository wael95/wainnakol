import React from "react";
import { FaHeart } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import { FiShare, FiMap, FiInfo } from "react-icons/fi";
import { Col, Row, span, Container } from "react-bootstrap";
//objetc to define som components style
const Styles = {
  Main: {
    marginTop: "10px",
    backgroundColor: "rgba(255,255,255,0.95)",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
};

//this page render the restaurants data that it will reciev from app when called
class Suggestion extends React.Component {
  render() {
    return (
      <Container className="sticky-top" style={Styles.Main}>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <h2 style={{ color: "#269397" }}>{this.props.restaurant}</h2>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <span style={{ color: "#2F422F" }}>
              {this.props.resRate}/10 | {this.props.resCat}
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col style={{ marginInline: "20px" }}>
            <a
              style={{ color: "#000000" }}
              href={
                "https://www.google.com/maps/search/?api=1&query=" +
                this.props.lat +
                "," +
                this.props.long
              }
            >
              <FiMap size="2em" />
            </a>
          </Col>
          <Col>
            <FiShare size="2em" />
          </Col>
          <Col>
            <FaHeart size="2em" />
          </Col>
          <Col>
            <MdInsertPhoto size="2em" />
          </Col>
          <Col>
            <FiInfo size="2em" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Suggestion;
