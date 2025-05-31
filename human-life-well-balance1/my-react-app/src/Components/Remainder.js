import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';
import './water.css'; // Import the CSS file

const Reminder = () => {
  const [reminders, setReminders] = useState([]);

    const handleSetReminder = () => {
    const now = moment();
    const reminderTimes = [];
    for (let i = 0; i < 8; i++) {
      const reminderTime = now.clone().add((i * 12) / 8, 'hours');
      reminderTimes.push({
        id: i + 1,
        text: `Drink glass ${i + 1} of water!`,
        time: reminderTime.format('HH:mm'),
        completed: false,
      });
    }
    setReminders(reminderTimes);
  };

  const handleCompleteReminder = (id) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id ? { ...reminder, completed: true } : reminder
    );
    setReminders(updatedReminders);
  };

  const getEmoji = () => {
    const completedCount = reminders.filter((reminder) => reminder.completed).length;
    if (completedCount >= 8) {
      return '😊'; 
    } else if (completedCount >= 4) {
      return '😎'; 
    } else if (completedCount >= 2) {
      return '👌';
    } else {
      return ''; 
    }
  };

  return (
    <div className="Overlay_water"> 
      <div className="Remain">
        <header className="App-header">
          <Container>
            <Row>
              <Col>
                <h1 className="App-title">Water Reminder App</h1>
                <p className="App-subtitle">Stay hydrated, stay healthy!</p>
                <Button variant="primary" className="App-button" onClick={handleSetReminder}>
                  Set Reminder (8 Glasses in 12 Hours)
                </Button>
              </Col>
            </Row>
          </Container>
        </header>

        <div className="emoji-container">
          <span className="emoji">{getEmoji()}</span>
        </div>

        <ReminderList reminders={reminders} onComplete={handleCompleteReminder} />
      </div>
    </div>
  );
};

const ReminderList = ({ reminders, onComplete }) => {
  return (
    <Container className="mt-4">
      {reminders.map((reminder) => (
        <Row key={reminder.id} className="mb-3">
          <Col>
            <div className={`reminder-item ${reminder.completed ? 'completed' : ''}`}>
              <p>{reminder.text} - {reminder.time}</p>
              {!reminder.completed && (
                <Button variant="success" onClick={() => onComplete(reminder.id)}>
                  Complete
                </Button>
              )}
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Reminder;
