import { Moment } from 'moment';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

type HeaderCalendarProps = {
  isMonthView: boolean;
  isYearView: boolean;
  setDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
  handleLeft: () => void;
  handleRight: () => void;
  selectedYear: number;
  setIsYearView: (value: boolean) => void;
  setIsMonthView: (value: boolean) => void;
  setIsDayView: (value: boolean) => void;
  date: Moment;
};

export function HeaderCalendar({
  isMonthView,
  isYearView,
  handleLeft,
  handleRight,
  selectedYear,
  setIsYearView,
  setIsMonthView,
  setIsDayView,
  date,
}: HeaderCalendarProps) {
  return (
    <div className='flex justify-between'>
      <button onClick={handleLeft}>
        <AiOutlineLeft />
      </button>
      <h1 className='p-2 cursor-pointer bg-slate-100'>
        {isYearView ? (
          <span>{`${selectedYear} - ${selectedYear + 9}`}</span>
        ) : isMonthView ? (
          <span
            onClick={() => {
              setIsYearView(true);
              setIsMonthView(false);
            }}
          >
            {date.format('YYYY')}
          </span>
        ) : (
          <span
            onClick={() => {
              setIsMonthView(true);
              setIsDayView(false);
            }}
          >
            {date.format('MMMM YYYY')}
          </span>
        )}
      </h1>
      <button onClick={handleRight}>
        <AiOutlineRight />
      </button>
    </div>
  );
}
