import moment, { Moment } from 'moment';
import { cn } from '@utils';

type MonthViewProps = {
  date: Moment;
  setDate: (date: Moment) => void;
  onSelectDate?: (date: Moment) => void;
  setIsMonthView: (value: boolean) => void;
  setIsDayView: (value: boolean) => void;
};

export function MonthView({
  date,
  setDate,
  onSelectDate,
  setIsMonthView,
  setIsDayView,
}: MonthViewProps) {
  return (
    <div className='grid grid-cols-4'>
      {moment.months().map((month, index) => (
        <div
          key={index}
          className={cn(
            'p-4 cursor-pointer text-center',
            date.month() === index &&
              'bg-[#db3d44] rounded-full mx-auto h-14 w-14 text-white'
          )}
          onClick={() => {
            const newDate = date.clone().month(index);
            setDate(newDate);
            onSelectDate?.(newDate);
            setIsMonthView(false);
            setIsDayView(true);
          }}
        >
          {month.slice(0, 3)}
        </div>
      ))}
    </div>
  );
}
