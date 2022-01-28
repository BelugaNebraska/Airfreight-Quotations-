import mongoose from 'mongoose';
const { Schema } = mongoose;

const airportSchema = new Schema(
    {
        CODE: { type: String, required: [true, 'airport code is required'], unique: true },
        DESTINATION: String, 
        RATE: Object
    }
);

export default mongoose.model("Airport", airportSchema, "turkish");

