import React, { useState } from 'react';
import './Motivation.css';


const Motivation = () => {
  const [quote, setQuote] = useState('');

  const generateQuote = () => {
    const loveQuotes = [
      "The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart. - Helen Keller",
      "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage. - Lao Tzu",
      "Love yourself first and everything else falls into line. - Lucille Ball"
    ];

    const powerQuotes = [
      "The most common way people give up their power is by thinking they don't have any. - Alice Walker",
      "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family. - Kofi Annan",
      "Never underestimate the power of dreams and the influence of the human spirit. - Wilma Rudolph"
    ];

    const moneyQuotes = [
      "The lack of money is the root of all evil. - Mark Twain",
      "Money often costs too much. - Ralph Waldo Emerson",
      "Wealth consists not in having great possessions, but in having few wants. - Epictetus"
    ];

    const studyQuotes = [
      "Education is the passport to the future, for tomorrow belongs to those who prepare for it today. - Malcolm X",
      "The man who does not read has no advantage over the man who cannot read. - Mark Twain",
      "Live as if you were to die tomorrow. Learn as if you were to live forever. - Mahatma Gandhi"
    ];

    const allQuotes = [
      ...loveQuotes,
      ...powerQuotes,
      ...moneyQuotes,
      ...studyQuotes
    ];

    const randomQuote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
    setQuote(randomQuote);
  };

  return (
    <div className="overlap">
      <div className="motivation">
        <h1>Motivational Quote Generator</h1>
        <button onClick={generateQuote}>Generate Quote</button>
        {quote && (
          <blockquote>
            {quote}
          </blockquote>
        )}
      </div>
    </div>
  );
};

export default Motivation;
