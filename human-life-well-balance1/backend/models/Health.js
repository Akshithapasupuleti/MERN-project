const mongoose = require('mongoose');

const HealthSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  weight: { type: String, required: true },
  height: { type: String, required: true },
  bmi: { type: String, default: '' },
  bloodPressure: { type: String, default: '' },
  dailyCaloricIntake: { type: String, default: '' },
  nutrientBalance: { type: String, default: '' },
  exerciseFrequency: { type: String, default: '' },
  exerciseType: { type: String, default: '' },
  exerciseDuration: { type: String, default: '' },
  stressLevel: { type: String, default: '' },
  sleepPattern: { type: String, default: '' },
  chronicConditions: { type: String, default: '' },
  medications: { type: String, default: '' },
  familyHistory: { type: String, default: '' },
  gender: { type: String, default: '' },
  heartrate: { type: String, default: '' },
  CholestrolLevels: { type: String, default: '' },
  SleepDuration: { type: String, default: '' },
  SleepDisorders: { type: String, default: '' },
  HRV: { type: String, default: '' },
});

const Health = mongoose.model('Health', HealthSchema);

module.exports = Health;
