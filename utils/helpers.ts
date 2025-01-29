import type { Credential } from "~types"

const SERVER_URL = "http://localhost:3000"


export const fetchCredentialsSharedWithMe = async (formData : FormData) => {
  try {
    const email = formData.get("email")
    const password = formData.get("password")

    if (!email || !password) throw new Error("Fields Missing")

    const resp = await fetch(`${SERVER_URL}/api/shared-credentials`, {
      method : "POST",
      body : JSON.stringify({
        email,
        password
      })
    })

    const data = await resp.json()


    if (!data?.success) {
      throw new Error(data.error)
    }

    return {
      success : true,
      credentials: data.credentials,
      sharedPrivateKey: data.sharedPrivateKey
    }
  } catch (error : any) {
    
    return {
      success : false,
      error : error.message
    }
  }


}


/**
 * Disables toggling of password field i.e. User cannot change the password type field to text to see the password
 */

export const disableInputToggle = (inputNode: HTMLInputElement, originalType: string) => {
  const config = { attributes: true };

  // use mutation observer to check if user tries to change input type to password
  const callback = (
    mutationList: MutationRecord[],
    observer: MutationObserver
  ) => {
    for (const mutation of mutationList) {
      if (mutation.type === "attributes" && mutation.attributeName === "type") {
        const targetInputNode = mutation.target as HTMLInputElement;

        targetInputNode.type = "password";
        observer.disconnect();

        setTimeout(() => {
          observeAgain(observer, targetInputNode);
        }, 0);
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(inputNode, config);

  // disable observing if the user clears out the input field

  inputNode.addEventListener("input", () => {

    console.log("value ", inputNode.value);
    
    if (inputNode.value === "") {
      observer.disconnect()
    };
  });

  function observeAgain(
    observer: MutationObserver,
    targetNode: HTMLInputElement
  ) {
    observer.observe(targetNode, config);
  }
};




// export const loginHandler = async (formData: FormData) => {

//   try {
//     const email = formData.get("email")
//     const password = formData.get("password")

//     if (!email || !password) throw new Error("Fields Missing")
    
//     // Make API Request to Login

//     const resp = await fetch(`${SERVER_URL}/api/extension-login`, {
//       method : "POST",
//       body : JSON.stringify({
//         email,
//         password
//       })
//     })


//     const data = await resp.json()

//     if (!data.success) throw new Error(data.error as string)

    
//     return {
//       success : true,
//       token : data.token
//     }

//   } catch (error : any ) {

//     console.log({ error });

//     return {
//       success : false,
//       error : error.message as string
//     }
    
//   }

// }