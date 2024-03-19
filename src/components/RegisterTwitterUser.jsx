import { getAuth, signInWithPopup } from "firebase/auth"
import { sendEmailVerification } from "firebase/auth"
import { TwitterAuthProvider } from "firebase/auth"
import logtail from "../logger.js"

export const RegisterTwitterUser = async (setFromOTP, setFromSocialMedia, setRegistrationState, toast) => {
    setFromOTP(false);
    setFromSocialMedia(true); 
    const auth = getAuth();
  
    try{  
   
      const provider = new TwitterAuthProvider();
      provider.setCustomParameters({
      "display": "popup"
      });
      const result = await signInWithPopup(auth, provider);
      const userForVerification = result.user;

        toast({
            title: "Email has sent to be verified!",
            description: "Please check your email to verify your account.",
            position: "top",
            status: "success",
            isClosable: true,
        })
         
 await sendEmailVerification(userForVerification);
 setRegistrationState("waitingForEmailVerification");   
 logtail.info("Twitter registration email sent", {fbUser: userForVerification.uid, email: userForVerification.email});
          }  catch (error) {
              console.error("Error registering twitter account:", error);
              toast({
                  title: "Registration for twitter user failed",
                  description: error.message,
                  position: "top",
                  status: "error",
                  isClosable: true,
              });
               logtail.error(`Twitter user registration error: ${error.message}`, {fbUser: auth.currentUser.uid});

      }
      
}
