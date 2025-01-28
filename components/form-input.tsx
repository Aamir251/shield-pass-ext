import type { HTMLAttributes, HTMLProps } from "~node_modules/@types/react"

type InputProps = {
  attrs : HTMLProps<HTMLInputElement>
  label : string
}


const FormInput = ({ attrs, label } : InputProps) => {
  


  return (
    <div style={{
      display : "flex",
      flexDirection  :"column",
      gap : "5px",
      width : "100%",
      maxWidth : "450px"
    }}>
      <label style={{
        fontSize : "0.9rem",
        color : "white",
        fontFamily : "sans-serif"
      }} >{label}</label>
      <input style={{

        backgroundColor : "transparent",
        outline : "none",
        border : "1px solid #262626db",
        padding : "7px 8px",
        borderRadius : "4px",
        width : "100%",
        color : "whitesmoke"
      }} {...attrs} />
    </div>
  )
}

export default FormInput