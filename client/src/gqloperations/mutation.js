import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
   mutation signInUser($userSignin:UserSigninInput) {
        user:signInUser(userSignin:$userSignin){
            token
        }
    }
`