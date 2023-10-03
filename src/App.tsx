import { useState } from 'react';
import { Moment } from 'moment';
import { Calendar } from '@components';

export function App() {
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(
    undefined
  );

  return (
    <>
      <Calendar onSelectDate={setSelectedDate} selectedDate={selectedDate} />
    </>
  );
}
