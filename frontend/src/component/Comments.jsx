import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

function Form() {
  return (
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
          fieldset { 
            align-items:center;
            div {
            
              border-size:1px;
              border-style:solid;
            }
          }
        }

      `}
      </style>
      <Container>
        <form>
          <fieldset>
            <Row>
              <legend>Chat</legend>
            </Row>
            <Row>
              <textarea
                id="message"
                name="message"
                placeholder="Deine Nachricht..."
              />
            </Row>
            <Row>
              <input type="submit" />
            </Row>
          </fieldset>
        </form>
      </Container>
    </>
  )
}

function Comments() {
  const [data, setData] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)

  useEffect(() => {
    fetch("http://localhost:4300/api/notes").then(response =>
      response.json().then(notes => {
        console.log(notes)
        setData(notes)
        setDataIsLoaded(true)
      }),
    )
  }, [])

  // if (!dataIsLoaded) {
  //   return (
  //     <div>
  //       <h1>Please wait while meals are loading....</h1>
  //     </div>
  //   )
  // }
  return (
    <>
      <div className="App">
        <Form />
      </div>
    </>
  )
}

export default Comments
