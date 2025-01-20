import { sendToBackground } from "@plasmohq/messaging";
import { useEffect, useState } from "react";
import Container from "~components/Container";
import CredentialsList from "~components/CredentialsList";
import Loader from "~components/Loader";
import type { Credential, EncrytedSharedPrivateKey } from "~types";
import { decryptSharedCredentialPassword, decryptSharedPrivateKey } from "~utils/cipher";


const Button = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [selectedInput, setSelectedInput] = useState<any>(null)
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const [ sharedCredentials, setSharedCredentials ] = useState<Credential[]>([])

  /**
   * Keyboard combo listener to open the Content Window
   */

  useEffect(() => {
    document.addEventListener("keydown", async ({ repeat, altKey, key }) => {

      if (key === "Escape") {
        
        setIsOpen(false)
        return
      }
      

      if (repeat) return

      if (!altKey || key !== "s") return

      setIsOpen(true)

    })


    const getCredentials = async () => {
      const resp = await sendToBackground({
        name: "get-shared-credentials",
      })

      console.log({ resp })
      if (resp?.message === "UNAUTHORIZED") {
        console.log("Please LogIn")
      } else {
        setSharedCredentials(resp.sharedCredentials)
        
      }
      
      setIsLoading(false)

      
    }

    getCredentials()


  }, [])

  useEffect(() => {

    const addInputFocusListener = () => {
      const inputNodes = document.querySelectorAll(
        'input[type="text"], input[type="email"], input[type="password"]'
      );

      inputNodes.forEach(node => {

        node.addEventListener("focus", () => {
          setSelectedInput(node)

        })
      })
    }
    addInputFocusListener()

  }, [])

  const fillPassword = async (credentialPassword : string, masterPassword : string) => {
    const privateKeyResponse  = await sendToBackground({
      name : "get-private-key"
    });

    console.log("PrivateKey ", privateKeyResponse );
    
    const decrytedSharedPrivateKey = await decryptSharedPrivateKey(privateKeyResponse.privateKey, masterPassword)


    
    if (!selectedInput) {
      console.log("input not selected");
      return
    }

    // get the actual password

    await decryptSharedCredentialPassword(credentialPassword, decrytedSharedPrivateKey)

    

  }


  if (!isOpen) return null
  return (
    <section style={{
      position: "fixed",
      inset: 0,
      zIndex: 10000,
      backgroundColor: "rgb(0 0 0 / 35%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>

      <Container>
        {
          isLoading ? <Loader /> : <CredentialsList fillPassword={fillPassword} credentials={sharedCredentials} />
        }
      </Container>

    </section>
  )
}

export default Button




// document.addEventListener("keydown", async ({ repeat, altKey, key }) => {

//   if (repeat) return

//   if (!altKey || key !== "s") return

//   console.log("Open Popup");


// })

