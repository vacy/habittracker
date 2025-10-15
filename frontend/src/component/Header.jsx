import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router"

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <Container fluid>
            <Row>
              <Col>
                <div>
                  <Link to="/">Start</Link>
                </div>
              </Col>
              {/* <Col>
            <Link to="/habits">Habits</Link>
          </Col>
          <Col>
            <Link to="/momentum">Momentum</Link>
          </Col> */}
              <Col>
                <div>
                  <Link to="/contact">Kontakt</Link>
                </div>
              </Col>
              <Col>
                <div>
                  <Link to="/comments">Forum</Link>
                </div>
              </Col>
            </Row>
          </Container>
        </nav>
      </header>
      <style>
        {`  
          nav > div.container-fluid > div.row > div.col { 
            padding:0;
            height: 5vh;
            background-color: #073642;

            div {
              height: 100%;
              width: 100%;

              a {
                width: 100%;
                height: 100%;
                display:flex;
                align-items: center;
                justify-content: center;
                text-decoration: none; 
                color: #fdf6e3;
              }
              a:hover{
                font-size:430%;
              }
            }
          }
        `}
      </style>
    </>
  )
}
