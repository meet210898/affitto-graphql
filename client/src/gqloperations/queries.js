import { gql } from "@apollo/client";

export const GET_ALL_STATES = gql`
    query {
        state {
            _id
            stateName
            stateImage
        }
    }
`