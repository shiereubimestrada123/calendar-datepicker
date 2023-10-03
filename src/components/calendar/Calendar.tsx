import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { HeaderCalendar, DayView, MonthView, YearView } from '@components';

type CalendarDay = {
  date: Moment;
  isCurrentMonth: boolean;
}[];

type CalendarProps = {
  selectedDate?: Moment;
  onSelectDate?: (date: Moment) => void;
};

export function Calendar({ selectedDate, onSelectDate }: CalendarProps) {
  const [date, setDate] = useState<Moment>(moment());
  const [calendar, setCalendar] = useState<CalendarDay[]>([]);
  // const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
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

  const handleSelectdate = (date: Moment) => {
    setIsMonthView(false);
    onSelectDate?.(date);
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

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='flex flex-col gap-2 p-4 border-2 border-gray-400 w-72'>
        <HeaderCalendar
          isMonthView={isMonthView}
          isYearView={isYearView}
          setDate={setDate}
          handleLeft={handleLeft}
          handleRight={handleRight}
          selectedYear={selectedYear}
          setIsYearView={setIsYearView}
          setIsMonthView={setIsMonthView}
          date={date}
          setIsDayView={setIsDayView}
        />
        {isDayView && (
          <DayView
            calendar={calendar}
            selectedDate={selectedDate}
            handleSelectdate={handleSelectdate}
          />
        )}
        {isMonthView && (
          <MonthView
            date={date}
            setDate={setDate}
            onSelectDate={onSelectDate}
            setIsMonthView={setIsMonthView}
            setIsDayView={setIsDayView}
          />
        )}
        {isYearView && (
          <YearView
            selectedYear={selectedYear}
            date={date}
            setDate={setDate}
            setSelectedYear={setSelectedYear}
            setIsYearView={setIsYearView}
            setIsDayView={setIsDayView}
            setIsMonthView={setIsMonthView}
          />
        )}
      </div>
    </div>
  );
}
