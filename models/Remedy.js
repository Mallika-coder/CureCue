import mongoose from 'mongoose';

const RemedySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a remedy name'],
        unique: true,
    },
    image: {
        type: String, // Path to image
        default: '/default-herb.png'
    },
    description: {
        type: String,
        required: true,
    },
    ancientUse: {
        type: String, // "Used by Druids for..."
    },
    modernScience: {
        type: String, // "Contains compounds that..."
    },
    safety: {
        type: String,
        default: "Consult a physician before use."
    },
    tags: [{
        type: String // "Digestion", "Sleep", "Immunity"
    }],
});

export default mongoose.models.Remedy || mongoose.model('Remedy', RemedySchema);
