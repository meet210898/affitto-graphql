import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Upload

  type File {
    url: String
  }

  type Query {
    user: [User]
    state: [State]
    city: [City]
    vehicleType: [VehicleType]
    company: [Company]
    vehicle: [Vehicle]
    booking: [Booking]
    faqCategory: [FaqCategory]
    faq: [Faq]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    phoneNumber: String
    address: String
    pincode: String
    stateId: IdState
    cityId: IdCity
    username: String
    email: String
    password: String
    isVerify: Boolean
    personalImage: String
    otp: String
  }

  type State {
    _id: ID
    stateName: String
    stateImage: String
  }

  type City {
    _id: ID
    stateId: IdState
    cityName: String
    cityImage: String
  }

  type VehicleType {
    _id: ID
    typeName: String
    typeImage: String
  }

  type Company {
    _id: ID
    typeId: IdVehicleType
    companyName: String
    companyLogo: String
  }

  type Vehicle {
    _id: ID
    typeId: IdVehicleType
    companyId: IdCompany
    vehicleName: String
    vehicleImage: String
    description: String
    seats: Float
    door: Float
    fuelType: String
    transmission: String
    ac: Boolean
    rcImage: String
    rcNumber: String
    pucImage: String
    priceperday: Float
    insuranceImage: String
  }

  type Booking {
    _id: ID
    userId: IdUser
    companyId: IdCompany
    vehicleId: IdVehicle
    startDate: String
    endDate: String
    payment: Float
    status: Boolean
  }

  type FaqCategory {
    _id: ID
    faqCategory: String
  }

  type Faq {
    _id: ID
    faqCategoryId: IdFaqCategory
    question: String
    answer: String
  }

  type IdState {
    _id: String
    stateName: String
  }

  type IdCity {
    _id: String
    cityName: String
  }

  type IdUser {
    _id: String
    firstName: String
    lastName: String
  }

  type IdCompany {
    _id: String
    companyName: String
  }

  type IdVehicleType {
    _id: String
    typeName: String
  }

  type IdVehicle {
    _id: String
    vehicleName: String
  }

  type IdFaqCategory {
    _id: String
    faqCategory: String
  }

  type Token {
    token: String
  }

  type Mutation {
    signUpUser(userNew: UserInput): User
    signInUser(userSignin: UserSigninInput): Token
    # State
    createState(stateNew: StateInput): String
    updateState(stateUpdate: UpdateStateInput): String
    deleteState(_id: DeleteInput): State
    # City
    createCity(cityNew: CityInput): String
    updateCity(cityUpdate: UpdateCityInput): String
    deleteCity(_id: DeleteInput): City
    # Vehicle Type
    createVehicleType(vehicleTypeNew: VehicleTypeInput): String
    updateVehicleType(vehicleTypeUpdate: UpdateVehicleTypeInput): String
    deleteVehicleType(_id: DeleteInput): VehicleType
    # Company
    createCompany(companyNew: CompanyInput): String
    updateCompany(companyUpdate: UpdateCompanyInput): String
    deleteCompany(_id: DeleteInput): Company
    #Vehicle
    createVehicle(vehicleNew: VehicleInput): String
    updateVehicle(vehicleUpdate: UpdateVehicleInput): String
    deleteVehicle(_id: DeleteInput): Vehicle
    #Booking
    createBooking(bookingNew: BookingInput): String
    # FAQ Category
    createFaqCategory(faqCategoryNew: FaqCategoryInput): String
    updateFaqCategory(faqCategoryUpdate: UpdateFaqCategoryInput): String
    deleteFaqCategory(_id: DeleteInput): FaqCategory
    # FAQ
    createFaq(faqNew: FaqInput): String
    updateFaq(faqUpdate: UpdateFaqInput): String
    deleteFaq(_id: DeleteInput): Faq
    # Upload file
    uploadFile(file: Upload!): File!
  }

  input UserInput {
    firstName: String
    lastName: String
    phoneNumber: String
    address: String
    pincode: String
    stateId: String
    cityId: String
    username: String
    email: String
    password: String
    isVerify: Boolean
    personalImage: String
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  input VehicleTypeInput {
    typeName: String
    typeImage: String
  }

  input UpdateVehicleTypeInput {
    _id: String
    typeName: String
    typeImage: String
  }

  input CompanyInput {
    typeId: String
    companyName: String
    companyLogo: String
  }

  input UpdateCompanyInput {
    _id: String
    typeId: String
    companyName: String
    companyLogo: String
  }

  input VehicleInput {
    typeId: String
    companyId: String
    vehicleName: String
    vehicleImage: String
    description: String
    seats: Float
    door: Float
    fuelType: String
    transmission: String
    ac: Boolean
    rcImage: String
    rcNumber: String
    pucImage: String
    priceperday: Float
    insuranceImage: String
  }

  input UpdateVehicleInput {
    _id: String
    typeId: String
    companyId: String
    vehicleName: String
    vehicleImage: String
    description: String
    seats: Float
    door: Float
    fuelType: String
    transmission: String
    ac: Boolean
    rcImage: String
    rcNumber: String
    pucImage: String
    priceperday: Float
    insuranceImage: String
  }

  input BookingInput {
    userId: String
    companyId: String
    vehicleId: String
    startDate: String
    endDate: String
    payment: Float
    status: Boolean
  }

  input StateInput {
    stateName: String
    stateImage: String
  }

  input UpdateStateInput {
    _id: String
    stateName: String
    stateImage: String
  }

  input CityInput {
    stateId: String
    cityName: String
    cityImage: String
  }

  input UpdateCityInput {
    _id: String
    stateId: String
    cityName: String
    cityImage: String
  }

  input FaqCategoryInput {
    faqCategory: String
  }

  input UpdateFaqCategoryInput {
    _id: String
    faqCategory: String
  }

  input DeleteInput {
    _id: String
  }

  input FaqInput {
    faqCategoryId: String
    question: String
    answer: String
  }

  input UpdateFaqInput {
    _id: String
    faqCategoryId: String
    question: String
    answer: String
  }
`;

export default typeDefs;
