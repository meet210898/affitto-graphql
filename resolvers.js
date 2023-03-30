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
        .sort({ _id: -1 })
        .populate("stateId", "_id stateName")
        .populate("cityId", "_id cityName"),
    state: async () => await State.find({}).sort({ _id: -1 }),
    city: async () =>
      await City.find({})
        .sort({ _id: -1 })
        .populate("stateId", "_id stateName"),
    vehicleType: async () => await VehicleType.find({}).sort({ _id: -1 }),
    company: async () =>
      await Company.find({})
        .sort({ _id: -1 })
        .populate("typeId", "_id typeName"),
    vehicle: async () =>
      await Vehicle.find({})
        .sort({ _id: -1 })
        .populate("typeId", "_id typeName")
        .populate("companyId", "_id companyName"),
    booking: async () =>
      await Booking.find({})
        .sort({ _id: -1 })
        .populate("userId", "_id firstName lastName")
        .populate("companyId", "_id companyName")
        .populate("vehicleId", "_id vehicleName"),
    faqCategory: async () => await FaqCategory.find({}).sort({ _id: -1 }),
    faq: async () =>
      await Faq.find({})
        .sort({ _id: -1 })
        .populate("faqCategoryId", "_id faqCategory"),
  },
  Mutation: {
    // User
    signUpUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exist with that email");
      }
      if (userNew.password === userNew.confirmPassword) {
        const hashedPassword = await bcrypt.hash(userNew.password, 12);
        delete userNew.confirmPassword;
        const newUser = new User({
          ...userNew,
          password: hashedPassword,
        });
        return await newUser.save();
      }
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
    userById: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const user = await User.findById(_id)
        .populate("stateId", "_id stateName")
        .populate("cityId", "_id cityName");
      return user;
    },
    updateIsVerify: async (_, { userVerify }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateUser = await User.findOneAndUpdate(
        { _id: userVerify._id },
        {
          $set: {
            isVerify: userVerify.isVerify,
          },
        },
        { new: true }
      )
        .populate("stateId", "_id stateName")
        .populate("cityId", "_id cityName");
      return updateUser;
    },
    updateUser: async (_, { userUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      await User.findOneAndUpdate(
        { _id: userUpdate._id },
        {
          $set: userUpdate,
        }
      );
      return "User Updated!!";
    },
    // State
    createState: async (_, { stateNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newState = new State(stateNew);
      await newState.save();
      return newState;
    },
    updateState: async (_, { stateUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateState = await State.findOneAndUpdate(
        { _id: stateUpdate._id },
        {
          $set: {
            stateName: stateUpdate.stateName,
            stateImage: stateUpdate.stateImage,
          },
        },
        { new: true }
      );
      return updateState;
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
      await newCity.populate("stateId", "_id stateName");
      return newCity;
    },
    updateCity: async (_, { cityUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateCity = await City.findOneAndUpdate(
        { _id: cityUpdate._id },
        {
          $set: {
            stateId: cityUpdate.stateId,
            cityName: cityUpdate.cityName,
            cityImage: cityUpdate.cityImage,
          },
        },
        { new: true }
      ).populate("stateId", "_id stateName");
      return updateCity;
    },
    deleteCity: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedCity = await City.findOneAndDelete(_id).populate(
        "stateId",
        "_id stateName"
      );
      return deletedCity;
    },
    // Vehicle Type
    createVehicleType: async (_, { vehicleTypeNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newVehicleType = new VehicleType(vehicleTypeNew);
      await newVehicleType.save();
      return newVehicleType;
    },
    updateVehicleType: async (_, { vehicleTypeUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateVehicleType = await VehicleType.findOneAndUpdate(
        { _id: vehicleTypeUpdate._id },
        {
          $set: {
            typeName: vehicleTypeUpdate.typeName,
            typeImage: vehicleTypeUpdate.typeImage,
          },
        },
        { new: true }
      );
      return updateVehicleType;
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
      await newCompany.populate("typeId", "_id typeName");
      return newCompany;
    },
    updateCompany: async (_, { companyUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateCompany = await Company.findOneAndUpdate(
        { _id: companyUpdate._id },
        {
          $set: {
            typeId: companyUpdate.typeId,
            companyName: companyUpdate.companyName,
            companyLogo: companyUpdate.companyLogo,
          },
        },
        { new: true }
      ).populate("typeId", "_id typeName");
      return updateCompany;
    },
    deleteCompany: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedCompany = await Company.findOneAndDelete(_id).populate(
        "typeId",
        "_id typeName"
      );
      return deletedCompany;
    },
    // Vehicle
    createVehicle: async (_, { vehicleNew }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const newVehicle = new Vehicle(vehicleNew);
      await newVehicle.save();
      await newVehicle.populate("typeId", "_id typeName");
      await newVehicle.populate("companyId", "_id companyName");
      return newVehicle;
    },
    updateVehicle: async (_, { vehicleUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateVehicle = await Vehicle.findOneAndUpdate(
        { _id: vehicleUpdate._id },
        {
          $set: vehicleUpdate,
        },
        { new: true }
      )
        .populate("typeId", "_id typeName")
        .populate("companyId", "_id companyName");
      return updateVehicle;
    },
    deleteVehicle: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const deletedVehicle = await Vehicle.findOneAndDelete(_id)
        .populate("typeId", "_id typeName")
        .populate("companyId", "_id companyName");
      return deletedVehicle;
    },
    vehicleByCompany: async (_, { _id }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const vehicleByCompany = await Vehicle.find({
        companyId: _id,
      })
        .populate("typeId", "_id typeName")
        .populate("companyId", "_id companyName");
      return vehicleByCompany;
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
      return newFaqCategory;
    },
    updateFaqCategory: async (_, { faqCategoryUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateFaqCategory = await FaqCategory.findOneAndUpdate(
        { _id: faqCategoryUpdate._id },
        { $set: { faqCategory: faqCategoryUpdate.faqCategory } },
        { new: true }
      );
      return updateFaqCategory;
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
      await newFaq.populate("faqCategoryId", "_id faqCategory");
      return newFaq;
    },
    updateFaq: async (_, { faqUpdate }, { userId }) => {
      if (!userId) {
        throw new Error("You must be logged in");
      }
      const updateFaq = await Faq.findOneAndUpdate(
        { _id: faqUpdate._id },
        {
          $set: {
            faqCategoryId: faqUpdate.faqCategoryId,
            question: faqUpdate.question,
            answer: faqUpdate.answer,
          },
        },
        { new: true }
      ).populate("faqCategoryId", "_id faqCategory");
      return updateFaq;
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
