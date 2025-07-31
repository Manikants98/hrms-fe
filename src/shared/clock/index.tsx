import React from 'react';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  });
  return (
    <div className="text-right">
      <div className="text-2xl font-bold text-primary">{currentTime.toLocaleTimeString()}</div>
      <div className="text-sm text-gray-500">
        {currentTime.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </div>
    </div>
  );
};

export default React.memo(Clock);
