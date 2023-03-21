import { gql } from "@apollo/client";

export const SIGNIN_USER = gql`
  mutation signInUser($userSignin: UserSigninInput) {
    user: signInUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const CREATE_STATES = gql`
  mutation createState($stateNew: StateInput) {
    states: createState(stateNew: $stateNew)
  }
`;

export const CREATE_CITIES = gql`
  mutation createCity($cityNew: CityInput) {
    city: createCity(cityNew: $cityNew)
  }
`;

export const CREATE_VEHICLE_TYPES = gql`
  mutation createVehicleType($vehicleTypeNew: VehicleTypeInput) {
    vehicleType: createVehicleType(vehicleTypeNew: $vehicleTypeNew)
  }
`;

export const CREATE_COMPANIES = gql`
  mutation createCompany($companyNew: CompanyInput) {
    company: createCompany(companyNew: $companyNew)
  }
`;

export const CREATE_VEHICLES = gql`
  mutation createVehicle($vehicleNew: VehicleInput) {
    vehicle: createVehicle(vehicleNew: $vehicleNew)
  }
`;

export const CREATE_FAQ_CATEGORIES = gql`
  mutation faqCategory($faqCategoryNew: FaqCategoryInput) {
    faqCategory: createFaqCategory(faqCategoryNew: $faqCategoryNew)
  }
`;

export const CREATE_FAQS = gql`
  mutation faq($faqNew: FaqInput) {
    createFaq(faqNew: $faqNew)
  }
`;

export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
