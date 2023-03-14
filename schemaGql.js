import { gql } from 'apollo-server';

const typeDefs = gql`

    type Query{
        user:[User]
        state:[State]
        city:[City]
        vehicleType:[VehicleType]
        company:[Company]
        vehicle:[Vehicle]
        booking:[Booking]
        faqCategory:[FaqCategory]
        faq:[Faq]
    }

    type User {
        _id:ID
        firstName:String
        lastName:String
        phoneNumber:String
        address:String
        pincode:String
        stateId:IdState
        cityId:IdCity
        username:String
        email:String
        password:String
        isVerify:Boolean
        personalImage:String
        otp:String
    }

    type State {
        _id:ID
        stateName:String
        stateImage:String
    }

    type City {
        _id:ID
        stateId:IdState
        cityName:String
        cityImage:String
    }

    type VehicleType {
        _id:ID
        typeName:String
        typeImage:String
    }

    type Company {
        _id:ID
        typeId:IdVehicleType
        companyName:String
        companyLogo:String
    }

    type Vehicle {
        _id:ID
        typeId:IdVehicleType
        companyId:IdCompany
        vehicleName:String
        vehicleImage:String
        description:String
        seats:Float
        door:Float
        fuelType:String
        transmission:String
        ac:Boolean
        rcImage:String
        rcNumber:String
        pucImage:String
        priceperday:Float
        insuranceImage:String
    }

    type Booking {
        _id:ID
        userId:IdUser
        companyId:IdCompany
        vehicleId:IdVehicle
        startDate:String
        endDate:String
        payment:Float
        status:Boolean
    }

    type FaqCategory {
        _id:ID
        faqCategory:String
    }

    type Faq {
        _id:ID
        faqCategoryId:IdFaqCategory
        question:String
        answer:String
    }

    type IdState {
        _id:String
        stateName:String
    }

    type IdCity {
        _id:String
        cityName:String
    }

    type IdUser {
        _id:String
        firstName:String
        lastName:String
    }

    type IdCompany {
        _id:String
        companyName:String
    }

    type IdVehicleType {
        _id:String
        typeName:String
    }

    type IdVehicle {
        _id:String
        vehicleName:String
    }

    type IdFaqCategory {
        _id:String
        faqCategory:String
    }

    type Token{
        token:String
    }

    type Mutation {
        signUpUser(userNew:UserInput):User
        signInUser(userSignin:UserSigninInput):Token
        createState(stateName:String, stateImage:String):String
        createCity(stateId:String, cityName:String, cityImage:String):String
        createVehicleType(vehicleTypeNew:VehicleTypeInput):String
        createCompany(companyNew:CompanyInput):String
        createVehicle(vehicleNew:VehicleInput):String
        createBooking(bookingNew:BookingInput):String
        createFaqCategory(faqCategory:String):String
        createFaq(faq:FaqInput):String
    }

    input UserInput {
        firstName:String
        lastName:String
        phoneNumber:String
        address:String
        pincode:String
        stateId:String
        cityId:String
        username:String
        email:String
        password:String
        isVerify:Boolean
        personalImage:String
    }

    input UserSigninInput {
        email:String!
        password:String!
    }

    input VehicleTypeInput {
        typeName:String
        typeImage:String
    }

    input CompanyInput {
        typeId:String
        companyName:String
        companyLogo:String
    }

    input VehicleInput {
        typeId:String
        companyId:String
        vehicleName:String
        vehicleImage:String
        description:String
        seats:Float
        door:Float
        fuelType:String
        transmission:String
        ac:Boolean
        rcImage:String
        rcNumber:String
        pucImage:String
        priceperday:Float
        insuranceImage:String
    }

    input BookingInput {
        userId:String
        companyId:String
        vehicleId:String
        startDate:String
        endDate:String
        payment:Float
        status:Boolean
    }

    input FaqInput {
        faqCategoryId:String
        question:String
        answer:String
    }
`;

export default typeDefs;