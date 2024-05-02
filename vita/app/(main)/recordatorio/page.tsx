'use client'
import Link from 'next/link';

const RecordatoriosPage = () => {
  return (
    <div>
      <h1>Recordatorios</h1>
      <Link href="/addReminder">
        Create New Reminder
      </Link>
    </div>
  );
};

export default RecordatoriosPage;