import type { PropsWithChildren } from "~node_modules/@types/react"

const Container = ({ children } : PropsWithChildren) => {
  return (
    <div style={{
      maxWidth : 700,
      width : "90%",
      margin : "auto",
      backgroundColor : "#0d0d0e",
      padding : "5px",
      borderRadius : "8px",
      minHeight : "300px",
      border : "1px solid #2f2f2f"
    }}>

      {children}
    </div>
  )
}

export default Container