import mongoose from "mongoose";

const faqCategorySchema = new mongoose.Schema({
    faqCategory: {
        type: String,
        trim: true,
    },
})

mongoose.model("FaqCategory", faqCategorySchema)