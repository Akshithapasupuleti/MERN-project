// HealthForm.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Container } from '@mui/material';
import axios from 'axios';
import './Health.css'; // Import your CSS file

const HealthForm = () => {
  const [formData, setFormData] = useState({
    age: 0,
    weight: '',
    height: '',
    bmi: '',
    bloodPressure: '',
    dailyCaloricIntake: '',
    nutrientBalance: '',
    exerciseFrequency: '',
    exerciseType: '',
    exerciseDuration: '',
    stressLevel: '',
    sleepPattern: '',
    chronicConditions: '',
    medications: '',
    familyHistory: '',
    gender: '',
    heartrate: '',
    CholestrolLevels: '200',
    SleepDuration: '6',
    SleepDisorders: 'dont have any sleep disorders',
    HRV: '120/80'
  });

  let [feedback, setFeedback] = useState(""); // Feedback message from analysis
  const analyzeData = () => {

    // BMI Analysis
    const bmi = parseFloat(formData.bmi);
    if (bmi < 18.5) {
      feedback += "You are underweight. Consider a balanced diet with sufficient calories.\n";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      feedback += "Your BMI is normal. Maintain a balanced diet and regular exercise.\n";
    } else if (bmi >= 25 && bmi <= 29.9) {
      feedback += "You are overweight. Consider a balanced diet and regular physical activity.\n";
    } else if (bmi >= 30) {
      feedback += "You are obese. Consult a healthcare provider for a personalized health plan.\n";
    }

    // Blood Pressure Analysis
    const [systolic, diastolic] = formData.bloodPressure.split('/').map(Number);
    if (systolic < 120 && diastolic < 80) {
      feedback += "Your blood pressure is normal. Maintain a healthy lifestyle.\n";
    } else if (systolic >= 120 && systolic < 130 && diastolic < 80) {
      feedback += "Your blood pressure is elevated. Monitor your blood pressure and maintain a healthy lifestyle.\n";
    } else if ((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) {
      feedback += "You have high blood pressure (Stage 1). Consider lifestyle changes and consult a healthcare provider.\n";
    } else if (systolic >= 140 || diastolic >= 90) {
      feedback += "You have high blood pressure (Stage 2). Consult a healthcare provider.\n";
    }

    // Heart Rate Analysis
    const heartRate = parseInt(formData.heartRate);
    if (heartRate < 60 || heartRate > 100) {
      feedback += "Your resting heart rate is outside the normal range. Consult a healthcare provider.\n";
    } else {
      feedback += "Your resting heart rate is normal.\n";
    }

    // Cholesterol Levels Analysis
    const cholesterol = parseInt(formData.cholesterolLevels);
    if (cholesterol < 200) {
      feedback += "Your cholesterol levels are desirable.\n";
    } else if (cholesterol >= 200 && cholesterol < 240) {
      feedback += "Your cholesterol levels are borderline high. Consider dietary changes and consult a healthcare provider.\n";
    } else if (cholesterol >= 240) {
      feedback += "Your cholesterol levels are high. Consult a healthcare provider.\n";
    }

    // Sleep Duration Analysis
    const sleepDuration = parseInt(formData.sleepDuration);
    if (sleepDuration < 7) {
      feedback += "You are not getting enough sleep. Aim for 7-9 hours of sleep per night.\n";
    } else if (sleepDuration >= 7 && sleepDuration <= 9) {
      feedback += "You are getting adequate sleep.\n";
    } else if (sleepDuration > 9) {
      feedback += "You are getting more than the recommended amount of sleep. Ensure it is quality sleep.\n";
    }

    // Exercise Recommendations
    const exerciseDuration = parseInt(formData.exerciseDuration);
    if (exerciseDuration < 150) {
      feedback += "Consider increasing your exercise to at least 150 minutes of moderate activity per week.\n";
    } else {
      feedback += "You are meeting the recommended exercise duration. Keep it up!\n";
    }

    setFeedback(feedback);
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    analyzeData();
    try {
      // Perform data analysis (not shown here for brevity)
      // For demonstration, assume analysis is successful
      setFeedback(feedback); // Replace with actual analysis logic

      // Simulate API call (replace with actual API call)
      // const response = await axios.post("http://localhost:4000/api/health", formData);
      // console.log('Response:', response);

      // Simulate success scenario
      setTimeout(() => {
        alert(feedback);
      }, 500); // Timeout added for demonstration

    } catch (error) {
      console.log('Error:', error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  

  return (
    <Container className="container">
      <Typography variant="h4" className="form-title" gutterBottom>Health Analysis</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* General Health Metrics */}
          <Grid item xs={12}>
            <Typography variant="h6">General Health Metrics</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Age" name="age" value={formData.age} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Gender" name="gender" value={formData.gender} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="BMI" name="bmi" value={formData.bmi} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Blood Pressure" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Height" name="height" value={formData.height} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Heart Rate" name="heartrate" value={formData.heartrate} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Cholesterol Levels" name="cholestrolLevels" value={formData.CholestrolLevels} onChange={handleChange} className="text-field" />
          </Grid>

          {/* Diet and Nutrition */}
          <Grid item xs={12}>
            <Typography variant="h6" className="form-subtitle">Diet and Nutrition</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Daily Caloric Intake" name="dailyCaloricIntake" value={formData.dailyCaloricIntake} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Nutrient Balance" name="nutrientBalance" value={formData.nutrientBalance} onChange={handleChange} className="text-field" />
          </Grid>

          {/* Sleep Patterns */}
          <Grid item xs={12}>
            <Typography variant="h6" className="form-subtitle">Sleep Patterns</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Sleep Duration" name="SleepDuration" value={formData.SleepDuration} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Do you have any sleep disorders?" name="SleepDisorders" value={formData.SleepDisorders} onChange={handleChange} className="text-field" />
          </Grid>

          {/* Physical Activity */}
          <Grid item xs={12}>
            <Typography variant="h6" className="form-subtitle">Physical Activity</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Exercise Frequency" name="exerciseFrequency" value={formData.exerciseFrequency} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Exercise Type" name="exerciseType" value={formData.exerciseType} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Exercise Duration (minutes)" name="exerciseDuration" value={formData.exerciseDuration} onChange={handleChange} className="text-field" />
          </Grid>

          {/* Mental Health */}
          <Grid item xs={12}>
            <Typography variant="h6" className="form-subtitle">Mental Health</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Stress Level (out of 5)" name="stressLevel" value={formData.stressLevel} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Heart Rate Variability" name="HRV" value={formData.HRV} onChange={handleChange} className="text-field" />
          </Grid>

          {/* Medical History */}
          <Grid item xs={12}>
            <Typography variant="h6" className="form-subtitle">Medical History</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Chronic Conditions" name="chronicConditions" value={formData.chronicConditions} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Medications" name="medications" value={formData.medications} onChange={handleChange} className="text-field" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Family History" name="familyHistory" value={formData.familyHistory} onChange={handleChange} className="text-field" />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className="submit-button">Submit</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default HealthForm;
