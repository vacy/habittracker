import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { Link, useNavigate, useLocation } from "react-router"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchLoginStatusRequest } from "../features/saga/actionTypes"
// import { Provider } from "react-redux"

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, isLoggedIn, error } = useSelector(state => state.loginStatus)

  useEffect(() => {
    dispatch(fetchLoginStatusRequest())
  }, [dispatch])

  console.log(
    "loginstatus - ",
    "isLoggedIn: ",
    isLoggedIn,
    " loginCheckRunning: ",
    loading,
  )
  function logout() {
    document.cookie =
      "token=invalid; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    dispatch(fetchLoginStatusRequest())
  }

  if (loading) {
    return (
      <header>
        <nav>Loading...</nav>
      </header>
    )
  } else {
    if (isLoggedIn) {
      if (useLocation().pathname == "/") {
        navigate("chat")
      }
      return (
        <>
          <header>
            <nav>
              <Container fluid>
                <Row>
                  <ol>
                    {/* <Col>
            <Link to="/habits">Habits</Link>
          </Col>
          <Col>
            <Link to="/momentum">Momentum</Link>
          </Col> */}
                    <Col>
                      <li>
                        <Link to="/chat">
                          <span>Chat</span>
                        </Link>
                      </li>
                    </Col>
                    <Col>
                      <li>
                        <Link onClick={logout}>
                          <span>Logout</span>
                        </Link>
                      </li>
                    </Col>
                  </ol>
                </Row>
              </Container>
            </nav>
          </header>
        </>
      )
    } else {
      if (useLocation().pathname == "/") {
        return (
          <>
            <header>
              <nav>
                <Container fluid>
                  <Row>
                    <ol>
                      <Col>
                        <li>
                          <Link to="/">
                            <span>Start</span>
                          </Link>
                        </li>
                      </Col>
                    </ol>
                  </Row>
                </Container>
              </nav>
            </header>
          </>
        )
      } else {
        return <>{navigate("/")};</>
      }
    }
  }
}
