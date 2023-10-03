import { Moment } from 'moment';
import { cn } from '@utils';

type YearViewProps = {
  selectedYear: number;
  date: Moment;
  setDate: (date: Moment) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setIsYearView: (value: boolean) => void;
  setIsDayView: (value: boolean) => void;
  setIsMonthView: (value: boolean) => void;
};

export function YearView({
  selectedYear,
  date,
  setDate,
  setSelectedYear,
  setIsYearView,
  setIsDayView,
  setIsMonthView,
}: YearViewProps) {
  const generateYears = () => {
    const years = [];
    for (let i = selectedYear - 1; i <= selectedYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className='grid grid-cols-4'>
      {generateYears().map((year, index) => (
        <div
          key={index}
          className={cn(
            'p-4 cursor-pointer text-center',
            year === selectedYear &&
              'bg-[#db3d44] rounded-full mx-auto h-14 w-14 text-white',
            (index === 0 || index === 11) && 'text-[#eeeeee]'
          )}
          onClick={() => {
            const newDate = date.clone().year(year);
            setDate(newDate);
            setSelectedYear(year);
            setIsYearView(false);
            setIsDayView(false);
            setIsMonthView(true);
          }}
        >
          {year}
        </div>
      ))}
    </div>
  );
}
