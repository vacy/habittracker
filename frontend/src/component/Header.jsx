import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link } from "react-router"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersRequest } from "../actions/userActions"
import { Provider } from "react-redux"

export default function Header() {
  const dispatch = useDispatch()
  const { loading, users, error } = useSelector(state => state)

  useEffect(() => {
    dispatch(fetchUsersRequest())
  }, [dispatch])

  if (loading) return <h2>Loading...</h2>
  if (error) return <h2>Error: {error}</h2>

  if (users != "200") {
  } else {
    return (
      <>
        <header>
          <nav>
            <Container fluid>
              <Row>
                <Col>
                  <div>
                    <Link to="/">
                      <span>Start</span>
                    </Link>
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
                    <Link to="/chat">
                      <span>Chat</span>
                    </Link>
                  </div>
                </Col>
                <Col>
                  <div>
                    <Link to="/comments">
                      <span>Forum</span>
                    </Link>
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
            
            div{
              width: 100%;
              height: 100%;
              display:flex;
              align-items: center;
              justify-content: center;

            a {
              width: 100%;
              height: 100%;
              text-decoration: none; 
              display:flex;
              justify-content:center;
              align-items:center;
              span {
                color: #fdf6e3;
                transform: scale(1.5);
                transition-duration: 0.5s;
                transition-timing-function: ease-out;
              }
            }
            a:hover > span{
              color: #fdf6e3;
              transform: scale(4.0);
              transition-duration: 0.5s;
              transition-timing-function: ease-out;
            }}
          }
        `}
        </style>
      </>
    )
  }
}
