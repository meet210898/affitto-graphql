import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
   mutation signInUser($userSignin:UserSigninInput) {
        user:signInUser(userSignin:$userSignin){
            token
        }
    }
`

export const CREATE_FAQ_CATEGORIES = gql`
    mutation faqCategory($faqCategoryNew:FaqCategoryInput) { 
        faqCategory:createFaqCategory(faqCategoryNew:$faqCategoryNew)
    }
`

export const CREATE_FAQS = gql`
    mutation faq($faqNew:FaqInput) { 
	    createFaq(faqNew:$faqNew)
    }
`