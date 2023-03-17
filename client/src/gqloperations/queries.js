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

export const GET_ALL_CITIES = gql`
    query {
        city {
            stateId {
                _id
                stateName
            }
            cityName
            cityImage
        }
    }
`

export const GET_ALL_FAQCATORIES = gql`
    query {
        faqCategory {
            _id
            faqCategory
        }
    }
`

export const GET_ALL_FAQS = gql`
    query {
        faq {
            _id
            faqCategoryId {
                _id
                faqCategory
            }
            question
            answer
        }
    }
`

export const GET_ALL_VEHICLETYPES = gql`
    query {
        vehicleType{
            _id
            typeName
            typeImage
        }
    }
`

export const GET_ALL_COMPANIES = gql`
    query {
        company {
            _id
            typeId {
                _id
                typeName
            }
            companyName
            companyLogo
        }
    }
`

export const GET_ALL_VEHICLES = gql`
    query {
        vehicle {
            _id
            typeId {
                _id
                typeName
            }
            companyId {
                _id
                companyName
            }
            vehicleName
            vehicleImage
            description
            seats
            door
            fuelType
            transmission
            ac
            rcImage
            rcNumber
            pucImage
            priceperday
            insuranceImage
        }
    }
`

export const GET_ALL_BOOKINGS = gql`
    query {
        booking{
            _id
            userId {
                _id
                firstName
                lastName
            }
            companyId {
                _id
                companyName
            }
            vehicleId {
                _id
                vehicleName
            }
            startDate
            endDate
            payment
            status
        }
    }
`

export const GET_ALL_USERS = gql`
    query {
        user {
            _id
            firstName
            lastName
            phoneNumber
            address
            pincode
            stateId {
                _id
                stateName
            }
            cityId {
                _id
                cityName
            }
            username
            email
            password
            isVerify
            personalImage
        }
    }
`