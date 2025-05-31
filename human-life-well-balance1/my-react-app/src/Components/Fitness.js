import React, { useState, useEffect } from 'react';
import './Fitness.css';

const Fitness = () => {
  const exercises = [
    {
      name: 'Push-ups',
      description: 'Push-ups are a great bodyweight exercise that work your chest, triceps, and core muscles. Start in a plank position and lower your body until your chest almost touches the floor. Push back up to the starting position.',
      video: require('./videos/2.mp4')
    },
    {
      name: 'Squats',
      description: 'Squats are essential for building leg strength. Stand with feet shoulder-width apart, bend your knees and lower your hips as if sitting back into a chair. Keep your chest up and make sure your knees don’t go past your toes.',
      video: require('./videos/1.mp4')
    },
    {
      name: 'Yoga',
      description: 'Yoga exercises promote flexibility,strength,and relaxation.It involves various poses and breathing techniques to improve overall health and well-being.yoga is very benefit for our body flexibility  .',
      video: require('./videos/3.mp4')
    },
    // Add more exercises as needed
  ];

  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [exerciseCompleted, setExerciseCompleted] = useState([]);
  const [videoEnded, setVideoEnded] = useState(exercises.map(() => false)); // Track video end status for each exercise
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setAllCompleted(false);
    }
  }, [timeLeft]);

  const handleVideoEnded = (index) => {
    const updatedVideoEnded = [...videoEnded];
    updatedVideoEnded[index] = true;
    setVideoEnded(updatedVideoEnded);
  };

  const handleExerciseCompletion = (index) => {
    const updatedCompleted = [...exerciseCompleted, index];
    setExerciseCompleted(updatedCompleted);

    if (updatedCompleted.length === exercises.length) {
      setAllCompleted(true);
    }
  };

  const handleOverallCompletion = () => {
    setAllCompleted(true);
  };

  return (
    <div className='Overlay'>
    <div className="fitness-container">
      <h2>Fitness Exercises</h2>
      <div className="exercises">
        {exercises.map((exercise, index) => (
          <div className="exercise-card" key={index}>
            <h3>{exercise.name}</h3>
            <p>{exercise.description}</p>
            <video className="exercise-video" controls onEnded={() => handleVideoEnded(index)}>
              <source src={exercise.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {!videoEnded[index] && (
              <p className="watch-video">Please watch the video until the end</p>
            )}
            {videoEnded[index] && !exerciseCompleted.includes(index) && (
              <button className="complete-button" onClick={() => handleExerciseCompletion(index)}>Complete Exercise</button>
            )}
            {exerciseCompleted.includes(index) && (
              <p className="completed">Exercise completed!</p>
            )}
          </div>
        ))}
      </div>
      <div className="timer">
        <p>Time left: {Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
        {allCompleted ? (
          <div className="congratulations">
            <p>Congratulations! All exercises completed!</p>
            <img src={process.env.PUBLIC_URL + '/public/congratulations-7.gif'} alt="Congratulations" className="congratulations-7.gif" />
          </div>
        ) : (
          <button className="overall-complete-button" onClick={handleOverallCompletion} disabled={exerciseCompleted.length !== exercises.length}>
            Finish All Exercises
          </button>
        )}
      </div>
    </div>
    </div>
  );
}

export default Fitness;