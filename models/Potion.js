import mongoose from 'mongoose';

const PotionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  time: { type: String, required: true }, // Store time like "08:00"
  frequency: { type: String, default: 'daily' },
  log: [{
    date: { type: String }, // 'YYYY-MM-DD'
    status: { type: String, enum: ['Taken', 'Missed', 'Scheduled'], default: 'Scheduled' }
  }]
}, { timestamps: true });

export default mongoose.models.Potion || mongoose.model('Potion', PotionSchema);