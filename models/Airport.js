import mongoose from 'mongoose';
const { Schema } = mongoose;

const airportSchema = new Schema(
    {
        code: { type: String, required: [true, 'airport code is required'], unique: true },
        destination: String, 
        rate: Object
    }
);

export default mongoose.model("Airport", airportSchema);

