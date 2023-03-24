import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

const User = mongoose.model("RegisterUser");
const State = mongoose.model("State");
const City = mongoose.model("City");
const VehicleType = mongoose.model("VehicleType");
const Company = mongoose.model("Company");
const Vehicle = mongoose.model("Vehicle");
const Booking = mongoose.model("Booking");
const FaqCategory = mongoose.model("FaqCategory");
const Faq = mongoose.model("Faq");

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolvers = {
  Upload: GraphQLUpload,
  Query: {
    user: async () =>
      await User.find({})
        .populate("stateId", "_id stateName")
        .populate("cityId", "_id cityName"),
    state: async () => await State.find({}),
    city: async () => await City.find({}).populate("stateId", "_id stateName"),
    vehicleType: async () => await VehicleType.find({}),
    company: async () =>
      await Company.find({}).populate("typeId", "_id typeName"),
    vehicle: async () =>
      await Vehicle.find({})
        .populate("typeId", "_id typeName")
        .populate("companyId", "_id companyName"),
    booking: async () =>
      await Booking.find({})
        .populate("userId", "_id firstName lastName")
        .populate("companyId", "_id companyName")
        .populate("vehicleId", "_id vehicleName"),
    faqCategory: async () => await FaqCategory.find({}),
    faq: async () =>
      await Faq.find({}).populate("faqCategoryId", "_id faqCategory"),
  },
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      console.log("userNew", userNew);
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exist with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);
      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });
      return await newUser.save();
    },
    signInUser: async (_, { userSignin }) => {
      const user = await User.findOne({ email: userSignin.email });
      if (!user) {
        throw new Error("Email or Password is invalid");
      }
      const matchPassword = await bcrypt.compare(
        userSignin.password,
        user.password
      );
      if (!matchPassword) {
        throw new Error("Email or Password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return { token };
    },
    // State
    createState: async (_, { stateNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newState = new State(stateNew);
      await newState.save();
      return "State added!!";
    },
    updateState: async (_, { stateUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await State.findOneAndUpdate(
        { _id: stateUpdate._id },
        {
          $set: {
            stateName: stateUpdate.stateName,
            stateImage: stateUpdate.stateImage,
          },
        }
      );
      return "State Updated!!";
    },
    deleteState: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedState = await State.findOneAndDelete(_id);
      return deletedState;
    },
    // City
    createCity: async (_, { cityNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newCity = new City(cityNew);
      await newCity.save();
      return "City added!!";
    },
    updateCity: async (_, { cityUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await City.findOneAndUpdate(
        { _id: cityUpdate._id },
        {
          $set: {
            stateId: cityUpdate.stateId,
            cityName: cityUpdate.cityName,
            cityImage: cityUpdate.cityImage,
          },
        }
      );
      return "City Updated!!";
    },
    deleteCity: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedCity = await City.findOneAndDelete(_id);
      return deletedCity;
    },
    // Vehicle Type
    createVehicleType: async (_, { vehicleTypeNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newVehicleType = new VehicleType(vehicleTypeNew);
      await newVehicleType.save();
      return "Vehicle type added!!";
    },
    updateVehicleType: async (_, { vehicleTypeUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await VehicleType.findOneAndUpdate(
        { _id: vehicleTypeUpdate._id },
        {
          $set: {
            typeName: vehicleTypeUpdate.typeName,
            typeImage: vehicleTypeUpdate.typeImage,
          },
        }
      );
      return "Vehicle Type Updated!!";
    },
    deleteVehicleType: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedVehicleType = await VehicleType.findOneAndDelete(_id);
      return deletedVehicleType;
    },
    // Company
    createCompany: async (_, { companyNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newCompany = new Company(companyNew);
      await newCompany.save();
      return "Company added!!";
    },
    updateCompany: async (_, { companyUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await Company.findOneAndUpdate(
        { _id: companyUpdate._id },
        {
          $set: {
            typeId: companyUpdate.typeId,
            companyName: companyUpdate.companyName,
            companyLogo: companyUpdate.companyLogo,
          },
        }
      );
      return "Company Updated!!";
    },
    deleteCompany: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedCompany = await Company.findOneAndDelete(_id);
      return deletedCompany;
    },
    // Vehicle
    createVehicle: async (_, { vehicleNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newVehicle = new Vehicle(vehicleNew);
      await newVehicle.save();
      return "Vehicle added!!";
    },
    updateVehicle: async (_, { vehicleUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await Vehicle.findOneAndUpdate(
        { _id: vehicleUpdate._id },
        {
          $set: vehicleUpdate,
        }
      );
      return "Vehicle Updated!!";
    },
    deleteVehicle: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedVehicle = await Vehicle.findOneAndDelete(_id);
      return deletedVehicle;
    },
    //Booking
    createBooking: async (_, { bookingNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newBooking = new Booking(bookingNew);
      await newBooking.save();
      return "Booking added!!";
    },

    // FAQ Category
    createFaqCategory: async (_, { faqCategoryNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newFaqCategory = new FaqCategory(faqCategoryNew);
      await newFaqCategory.save();
      return "FAQ Category added!!";
    },
    updateFaqCategory: async (_, { faqCategoryUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await FaqCategory.findOneAndUpdate(
        { _id: faqCategoryUpdate._id },
        { $set: { faqCategory: faqCategoryUpdate.faqCategory } }
      );
      return "FAQ Category Updated!!";
    },
    deleteFaqCategory: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedFaqCategory = await FaqCategory.findOneAndDelete(_id);
      return deletedFaqCategory;
    },

    // FAQ
    createFaq: async (_, { faqNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newFaq = new Faq(faqNew);
      await newFaq.save();
      return "FAQ added!!";
    },
    updateFaq: async (_, { faqUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await Faq.findOneAndUpdate(
        { _id: faqUpdate._id },
        {
          $set: {
            faqCategoryId: faqUpdate.faqCategoryId,
            question: faqUpdate.question,
            answer: faqUpdate.answer,
          },
        }
      );
      return "FAQ Updated!!";
    },
    deleteFaq: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedFaq = await Faq.findOneAndDelete(_id).populate(
        "faqCategoryId",
        "_id faqCategory"
      );
      return deletedFaq;
    },

    // File upload
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      const stream = createReadStream();
      const pathName = path.join(__dirname, `public/images/${filename}`);
      await stream.pipe(fs.createWriteStream(pathName));

      return {
        url: `http://localhost:4000/images/${filename}`,
      };
    },
  },
};

export default resolvers;
