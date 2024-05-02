// Import React
import React from 'react';

interface ReminderProps {
  reminder: {
    id: number;
    name: string;
    frequency: string;
  };
}

const ReminderItem: React.FC<ReminderProps> = ({ reminder }) => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <p>{reminder.name}</p>
      <p>{reminder.frequency}</p>
    </div>
  );
};

export default ReminderItem;