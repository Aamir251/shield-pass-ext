import type { FormEvent } from "~node_modules/@types/react"
import FormInput from "./form-input"
import { fetchCredentialsSharedWithMe } from "~utils/helpers"

import type { Credential, EncrytedSharedPrivateKey } from "~types"


type LoginFormProps = {
  loginSuccessHandler: (credentials: Credential[], privateKey: EncrytedSharedPrivateKey) => Promise<void>
}

const LoginForm = ({ loginSuccessHandler }: LoginFormProps) => {

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const formData = new FormData(e.target as HTMLFormElement);


      const { success, credentials, sharedPrivateKey, error } = await fetchCredentialsSharedWithMe(formData)

      if (!success) throw new Error(error)
        
      await loginSuccessHandler(credentials as Credential[], sharedPrivateKey as EncrytedSharedPrivateKey)

   
    } catch (error) {

      console.log({ error });


      alert(error.message)

    }

  }
  return (
    <section style={{

      padding: "40px 20px"
    }}>

      <form onSubmit={handleSubmit} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}>

        <FormInput attrs={{ placeholder: "Email", name: "email" }} label="Email" />
        <FormInput attrs={{ placeholder: "Your Master Password", name: "password" }} label="Password" />

        <button style={{
          backgroundColor: "whitesmoke",
          outline: "none",
          border: "none",
          padding: "8px 20px",
          fontSize: 13,
          color: "black",
          fontFamily: "sans-serif",
          fontWeight: "bold",
          borderRadius: 3,
          cursor: "pointer"
        }}>SUBMIT</button >
      </form>
    </section>
  )
}

export default LoginForm