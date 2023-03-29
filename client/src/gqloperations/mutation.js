import { gql } from "@apollo/client";

// User Signup & Login
export const SIGNIN_USER = gql`
  mutation signInUser($userSignin: UserSigninInput) {
    user: signInUser(userSignin: $userSignin) {
      token
    }
  }
`;

export const SINGUP_USER = gql`
  mutation signUpUser($userNew: UserInput) {
    user: signUpUser(userNew: $userNew) {
      firstName
      lastName
      email
      username
    }
  }
`;

export const GET_USER_BY_ID = gql`
  mutation userById($id: DeleteInput) {
    user: userById(_id: $id) {
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
`;

export const UPDATE_IS_VERIFY = gql`
  mutation updateIsVerify($userVerify: userVerifyInput) {
    user: updateIsVerify(userVerify: $userVerify)
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUser($userUpdate: userUpdateInput) {
    user: updateUser(userUpdate: $userUpdate)
  }
`;

// State
export const CREATE_STATES = gql`
  mutation createState($stateNew: StateInput) {
    states: createState(stateNew: $stateNew)
  }
`;

export const UPDATE_STATES = gql`
  mutation updateState($stateUpdate: UpdateStateInput) {
    states: updateState(stateUpdate: $stateUpdate)
  }
`;

export const DELETE_STATES = gql`
  mutation deleteState($deleteId: DeleteInput) {
    states: deleteState(_id: $deleteId) {
      _id
      stateImage
      stateName
    }
  }
`;

// City
export const CREATE_CITIES = gql`
  mutation createCity($cityNew: CityInput) {
    city: createCity(cityNew: $cityNew)
  }
`;

export const UPDATE_CITIES = gql`
  mutation updateCity($cityUpdate: UpdateCityInput) {
    city: updateCity(cityUpdate: $cityUpdate)
  }
`;

export const DELETE_CITIES = gql`
  mutation deleteCity($deleteId: DeleteInput) {
    city: deleteCity(_id: $deleteId) {
      stateId {
        _id
        stateName
      }
      cityName
      cityImage
    }
  }
`;

// Vehicle Type
export const CREATE_VEHICLE_TYPES = gql`
  mutation createVehicleType($vehicleTypeNew: VehicleTypeInput) {
    vehicleType: createVehicleType(vehicleTypeNew: $vehicleTypeNew)
  }
`;

export const UPDATE_VEHICLE_TYPES = gql`
  mutation updateVehicleType($vehicleTypeUpdate: UpdateVehicleTypeInput) {
    vehicleType: updateVehicleType(vehicleTypeUpdate: $vehicleTypeUpdate)
  }
`;

export const DELETE_VEHICLE_TYPES = gql`
  mutation deleteVehicleType($deleteId: DeleteInput) {
    vehicleType: deleteVehicleType(_id: $deleteId) {
      _id
      typeName
      typeImage
    }
  }
`;

// Company
export const CREATE_COMPANIES = gql`
  mutation createCompany($companyNew: CompanyInput) {
    company: createCompany(companyNew: $companyNew)
  }
`;

export const UPDATE_COMPANIES = gql`
  mutation updateCompany($companyUpdate: UpdateCompanyInput) {
    company: updateCompany(companyUpdate: $companyUpdate)
  }
`;

export const DELETE_COMPANIES = gql`
  mutation deleteCompany($deleteId: DeleteInput) {
    company: deleteCompany(_id: $deleteId) {
      _id
      typeId {
        _id
        typeName
      }
      companyName
      companyLogo
    }
  }
`;

// Vehicle
export const CREATE_VEHICLES = gql`
  mutation createVehicle($vehicleNew: VehicleInput) {
    vehicle: createVehicle(vehicleNew: $vehicleNew)
  }
`;

export const UPDATE_VEHICLES = gql`
  mutation updateVehicle($vehicleUpdate: UpdateVehicleInput) {
    updateVehicle(vehicleUpdate: $vehicleUpdate)
  }
`;

export const DELETE_VEHICLES = gql`
  mutation deleteVehicle($deleteId: DeleteInput) {
    vehicle: deleteVehicle(_id: $deleteId) {
      companyId {
        _id
        companyName
      }
      vehicleName
    }
  }
`;

export const VEHICLES_BY_COMPANY = gql`
  mutation vehicleByCompany($id: String!) {
    vehicle: vehicleByCompany(_id: $id) {
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
`;

// FAQ Category
export const CREATE_FAQ_CATEGORIES = gql`
  mutation faqCategory($faqCategoryNew: FaqCategoryInput) {
    faqCategory: createFaqCategory(faqCategoryNew: $faqCategoryNew)
  }
`;

export const UPDATE_FAQ_CATEGORIES = gql`
  mutation updateFaqCategory($faqCategoryUpdate: UpdateFaqCategoryInput) {
    faqCategory: updateFaqCategory(faqCategoryUpdate: $faqCategoryUpdate)
  }
`;

export const DELETE_FAQ_CATEGORIES = gql`
  mutation deleteFaqCategory($deleteId: DeleteInput) {
    faqCategory: deleteFaqCategory(_id: $deleteId) {
      _id
      faqCategory
    }
  }
`;

// FAQ
export const CREATE_FAQS = gql`
  mutation faq($faqNew: FaqInput) {
    faq: createFaq(faqNew: $faqNew) {
      _id
      faqCategoryId {
        _id
        faqCategory
      }
      question
      answer
    }
  }
`;

export const UPDATE_FAQS = gql`
  mutation updateFaq($faqUpdate: UpdateFaqInput) {
    faq: updateFaq(faqUpdate: $faqUpdate) {
      _id
      faqCategoryId {
        _id
        faqCategory
      }
      question
      answer
    }
  }
`;

export const DELETE_FAQS = gql`
  mutation deleteFaq($deleteId: DeleteInput) {
    faq: deleteFaq(_id: $deleteId) {
      _id
      faqCategoryId {
        _id
        faqCategory
      }
      question
      answer
    }
  }
`;

// Upload file
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;
