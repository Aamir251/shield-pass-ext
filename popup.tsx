import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState<any>("heheheh")

  const handleClick = async () => {

    console.log("shshsh");
    
  }


  return (
    <div
      style={{
        padding: 0
      }}>
      <button style={{
        width : "max-content"
      }}
        onClick={handleClick}
      >
        Set Password
      </button>
      
    </div>
  )
}

export default IndexPopup
