import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router"

export default function Header() {
  return (
    <>
      <Container fluid>
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
      <style>
        {`  
          div.App{background-color:grey}
          div.col {
            background-color: #073642;
            text-align: center;
            height: 5vh; 
            width: 100vw;
            display: flex; 
            align-items: center; 
            justify-content: center; 
          }
          div.col > a {
            padding: 0 50%;
            color: #fdf6e3;
            text-decoration: none;
            box-sizing: border-box; 
          }
          div.col > a:hover{
            font-size: 150%;
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}
