import type { Credential } from "~types"

const SERVER_URL = "http://localhost:3000"


export const fetchCredentialsSharedWithMe = async () => {


  const resp = await fetch(`${SERVER_URL}/api/shared-credentials`, {
    credentials: "include"
  })

  const data = await resp.json()

  console.log({ data })

  if (!data?.success) {
    throw new Error(data.error)
  }

  return {
    credentials : data.credentials,
    sharedPrivateKey : data.sharedPrivateKey
  }


}


/**
 * Disables toggling of password field i.e. User cannot change the password type field to text to see the password
 */

export const disableInputToggle = (inputNode: HTMLInputElement, originalType : string) => {
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
