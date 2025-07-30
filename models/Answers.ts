import mongoose from "mongoose"

const AnswerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  designation: { type: String, required: true },
  answerOne: { type: Number, required: true },
  answerTwo: { type: Number, required: true },
  answerThree: { type: Number, required: true },
  answerFour: { type: Number, required: true },
  answerFive: { type: Number, required: true },
  answerSix: { type: Number, required: true },
  answerSeven: { type: Number, required: true },
  answerEight: { type: Number, required: true },
  answerNine: { type: Number, required: true },
  answerTen: { type: Number, required: true },
  answerEleven: { type: Number, required: true },
  answerTwelve: { type: Number, required: true },
  answerThirteen: { type: Number, required: true },
  answerFourteen: { type: Number, required: true },
  answerFifteen: { type: Number, required: true },
  answerSixteen: { type: Number, required: true },
  designation2:{type:String,required:true},
  empId:{type:String,required:true},
  email:{type:String,required:true},
  timeTaken:{type:String,required:true}
}, { timestamps: true })

export default mongoose.models.Answer || mongoose.model("Answer", AnswerSchema)
