import React, { useEffect, useState } from "react"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const apiHost = "http://localhost:4300"

function Comment({ text }) {
  return (
    <>
      <div style={{ padding: "10px" }}>
        <div>
          <div>{text}</div>
        </div>
      </div>
    </>
  )
}

function Chat() {
  const [data, setData] = useState([])
  const [dataIsLoaded, setDataIsLoaded] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    fetchComments()
  }, [])

  function fetchComments() {
    fetch(apiHost + "/comments").then(response =>
      response.json().then(comments => {
        setData(comments)
        setDataIsLoaded(true)
      }),
    )
  }

  const postComment = event => {
    event.preventDefault()
    fetch(apiHost + "/comments", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
      }),
    }).then(response => console.log("status: ", response.statusText))
    fetchComments()
  }

  if (!dataIsLoaded) {
    return (
      <div>
        <h1>Please wait while comments are loading....</h1>
      </div>
    )
  }
  return (
    <>
      <main>
        <Container>
          <Row>
            <h1>Chat mit dem Kundensupport</h1>
          </Row>
          <Row>
            <ol>
              {data.map(comment => (
                <li
                  className="item"
                  key={comment.ID}
                  style={{ listStyleType: "none" }}
                >
                  <Comment text={comment.text} />
                </li>
              ))}
            </ol>
          </Row>
          <form id="postComment" onSubmit={postComment}>
            <fieldset>
              <Row>
                <legend>Your Text</legend>
              </Row>
              <Row>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Deine Nachricht..."
                  maxlength="500"
                  onBlur={event => setMessage(event.target.value)}
                />
              </Row>
              <Row>
                <button id="submit">post</button>
              </Row>
            </fieldset>
          </form>
        </Container>
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
            
              // border-size:1px;
              // border-style:solid;
            }
          }
        }

      `}
        </style>
      </main>
    </>
  )
}

export default Chat
