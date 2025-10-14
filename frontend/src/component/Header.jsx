import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router"
import styled from "styled-components"

export default function Header() {
  const Link = styled.p`
    padding: 5px;
    background-color: #007baa;
    text-align: center;
  `
  return (
    <Container>
      <Row>
        <Col>
          <Link to="/">Start</Link>
        </Col>
        <Col>
          <Link to="/Test">Habits</Link>
        </Col>
        <Col>
          <Link to="/Momentum">Momentum</Link>
        </Col>
      </Row>
    </Container>
  )
}
