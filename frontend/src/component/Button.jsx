import Button from "react-bootstrap/Button"

function VariantsExample() {
  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: blue;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>

      <Button variant="flat" size="xxl">
        flat button
      </Button>
    </>
  )
}

export default VariantsExample
