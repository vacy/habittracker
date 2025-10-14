import React, { useEffect, useState } from "react"

function Note({ title, description, id }) {
  return (
    <>
      <div style={{ padding: "10px" }}>
        <div>
          <div>{title}</div>
          <div>{description}</div>
          <div hidden className="id">
            {id}
          </div>
        </div>
      </div>
    </>
  )
}

function LoginForm() {
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

  if (!dataIsLoaded) {
    return (
      <div>
        <h1>Please wait while meals are loading....</h1>
      </div>
    )
  }
  return (
    <div className="dashboard" role="main">
      <h1>Login to Habittracker</h1>
      <div>
        <form>_html</form>
        {/* {data.map(note => (
          <li className="item" key={note.id} style={{ listStyleType: "none" }}>
            <Note
              title={note.title}
              description={note.description}
              id={note.id}
            />
          </li>
        ))} */}
      </div>
      <AddNote />
    </div>
  )
}

export default LoginForm
