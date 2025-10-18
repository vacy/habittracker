import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useDispatch, useSelector } from "react-redux"
import { fetchLoginStatusRequest } from "../features/saga/actionTypes"
import Cookies from "universal-cookie"

const apiHost = "https://healthifyme-api.vercel.app"

function Login() {
  const dispatch = useDispatch()

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
        const reader = response.body.getReader()
        const decoder = new TextDecoder("utf-8")
        reader.read().then(stream => {
          let result = ""
          let done
          let value
          while ((({ done, value } = stream), !done)) {
            result += decoder.decode(value, { stream: true })
            console.log("Complete result:", result)
          }
        })

        // Process the complete result

        const token = response.headers.get("x-bearer-token")
        console.log(token)
        let options = {
          maxAge: 1000 * 60 * 60 * 10, // expire after 10 hours
          // httpOnly: true, // Cookie will not be exposed to client side code
          sameSite: "Strict", // If client and server origins are different
          secure: true, // care about https
        }
        const cookies = new Cookies()
        cookies.set("token", token, { options })
        dispatch(fetchLoginStatusRequest())
      }
    })
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
                      defaultValue="florian"
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
                      defaultValue="password"
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
