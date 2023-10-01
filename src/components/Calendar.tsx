import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { cn } from '@utils';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

type CalendarDay = {
  date: Moment;
  isCurrentMonth: boolean;
}[];

export function Calendar() {
  const [date, setDate] = useState<Moment>(moment());
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const [isDayView, setIsDayView] = useState<boolean>(true);
  const [isMonthView, setIsMonthView] = useState<boolean>(false);
  const [isYearView, setIsYearView] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(date.year());

  useEffect(() => {
    const generateCalendar = () => {
      const startOfMonth = date.clone().startOf('month');
      const endOfMonth = date.clone().endOf('month');
      const startDate = startOfMonth.clone().startOf('week');
      const endDate = endOfMonth.clone().endOf('week');

      const calendarData = [];
      let currentWeek = [];

      const currentDate = startDate.clone();

      while (currentDate.isBefore(endDate) || currentDate.date() === 1) {
        currentWeek.push({
          date: currentDate.clone(),
          isCurrentMonth: currentDate.isSame(date, 'month'),
        });

        if (currentDate.day() === 6) {
          calendarData.push(currentWeek);
          currentWeek = [];
        }

        currentDate.add(1, 'day');
      }

      if (currentWeek.length > 0) {
        calendarData.push(currentWeek);
      }

      setCalendar(calendarData);
    };

    generateCalendar();
  }, [date]);

  const generateYears = () => {
    const years = [];
    for (let i = selectedYear - 1; i <= selectedYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  const handleSelectdate = (date: Moment) => {
    setIsMonthView(false);
    setSelectedDate(date);
    setDate(date);
  };

  const handleLeft = () => {
    if (isDayView) {
      setDate(date.clone().subtract(1, 'month'));
    }

    if (isMonthView) {
      setIsDayView(false);
      setDate(date.clone().subtract(1, 'year'));
      setSelectedYear(date.year() - 1);
    }

    if (isYearView) {
      setSelectedYear((prev) => prev - 10);
    }
  };

  const handleRight = () => {
    if (isDayView) {
      setDate(date.clone().add(1, 'month'));
    }

    if (isMonthView) {
      setDate(date.clone().add(1, 'year'));
      setSelectedYear(date.year() + 1);
      setIsDayView(false);
    }

    if (isYearView) {
      setSelectedYear((prev) => prev + 10);
    }
  };

  const dayView = (
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
                  'text-center',
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

  const monthView = (
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
            setSelectedDate(newDate);
            setIsMonthView(false);
            setIsDayView(true);
          }}
        >
          {month.slice(0, 3)}
        </div>
      ))}
    </div>
  );

  const yearView = (
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

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col gap-2 p-4 border-2 border-gray-400 w-72'>
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
        {isDayView && dayView}
        {isMonthView && monthView}
        {isYearView && yearView}
      </div>
    </div>
  );
}
