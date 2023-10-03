import moment, { Moment } from 'moment';
import { cn } from '@utils';

type CalendarDay = {
  date: Moment;
  isCurrentMonth: boolean;
}[];

type DayViewProps = {
  calendar: CalendarDay[];
  selectedDate: Moment | undefined;
  handleSelectdate: (date: Moment) => void;
};

export function DayView({
  calendar,
  selectedDate,
  handleSelectdate,
}: DayViewProps) {
  return (
    <table className='w-full'>
      <thead>
        <tr>
          <th>Su</th>
          <th>Mo</th>
          <th>Tu</th>
          <th>We</th>
          <th>Th</th>
          <th>Fr</th>
          <th>Sa</th>
        </tr>
      </thead>
      <tbody>
        {calendar.map((week, index) => (
          <tr key={index}>
            {week.map(({ date, isCurrentMonth }) => (
              <td
                key={date.toString()}
                className={cn(
                  'text-center cursor-pointer',
                  !isCurrentMonth && 'text-[#eeeeee]',
                  date.isSame(moment(), 'day') && 'text-[#db3d44]',
                  selectedDate &&
                    date.isSame(selectedDate, 'day') &&
                    'bg-[#db3d44] rounded-full text-white'
                )}
                onClick={() => handleSelectdate(date)}
              >
                {date.format('D')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
