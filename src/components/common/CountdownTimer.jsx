import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="text-center">
        <span className="text-4xl md:text-6xl font-serif text-primary">
          {String(timeLeft[interval]).padStart(2, '0')}
        </span>
        <span className="block text-sm uppercase tracking-widest text-secondary mt-2">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timerComponents.length ? timerComponents : <span>Launching!</span>}
    </div>
  );
};

export default CountdownTimer;
