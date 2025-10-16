import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const apiHost = "http://localhost:4300"

function Login() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [cookie, setCookie] = useState("")
  // const [data, setData] = useState([])
  // const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    fetch(apiHost + "/isLoggedin", {
      method: "get",
      credentials: "include",
    }).then(response => {
      if (response.ok) {
        setIsAuthenticated(true)
      }
    })
  }, [])

  const login = event => {
    event.preventDefault()
    fetch(apiHost + "/login", {
      method: "post",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: document.getElementById("user").value,
        password: document.getElementById("password").value,
      }),
    }).then(response => {
      if (response.ok) {
        setIsAuthenticated(true)
      }
    })
  }
  const navigate = useNavigate()
  if (isAuthenticated) {
    return <>{navigate("/chat")};</>
  }
  return (
    <>
      <main>
        <>
          <style>
            {`
        // div.App {
        //   padding-top:5px;
        // }
        div.col{
              margin:0;
              padding:0;
              display:flex;
              justify-content:right;
              align-items:center;
        }
        form {
          display:flex;
          justify-content:center;
          fieldset { 
            align-items:center;
            div {
            
              // border-size:1px;
              // border-style:solid;
            }
          }
        }
          input:active{
            transition: width 0.4s ease-in-out;
          }
      `}
          </style>
          <Container>
            <form onSubmit={login}>
              <fieldset>
                <Row>
                  <legend>Enter credentials</legend>
                </Row>
                <Row>
                  <Col>
                    <label htmlFor="user">User:</label>
                  </Col>
                  <Col>
                    <input
                      id="user"
                      name="user"
                      placeholder="mail@domain.com"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <label htmlFor="password">Passwort:</label>
                  </Col>
                  <Col>
                    <input
                      id="password"
                      name="password"
                      placeholder="password"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <input type="submit" value="Login" />
                  </Col>
                </Row>
              </fieldset>
            </form>
          </Container>
        </>
      </main>
    </>
  )
}

export default Login
