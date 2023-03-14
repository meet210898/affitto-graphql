import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    faqCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FaqCategory",
    },
    question: {
        type: String,
        trim: true,
    },
    answer: {
        type: String,
        trim: true,
    },
})

mongoose.model("Faq", faqSchema)