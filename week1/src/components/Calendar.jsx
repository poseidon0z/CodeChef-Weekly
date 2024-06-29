import React, { useState, useEffect } from 'react';

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month + 1, 0).getDate();
};
const getFirstDayOfMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return (new Date(year, month, 1).getDay() + 6) % 7;
};

const startOfMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  return new Date(year, month, 1);
};

const getTodayTasks = (date, tasks) => {
  let todayTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (new Date(tasks[i].date).toDateString() === date.toDateString()) {
      todayTasks.push(tasks[i].task);
    }
  }
  return todayTasks;
};

const Calendar = ({ tasks, selectedDate, setSelectedDate }) => {
  const currentDate = new Date();
  const [displayDate, setDisplayDate] = useState(startOfMonth(currentDate));

  // Change month by a certain amount
  const changeMonth = (amount) => {
    setDisplayDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth() + amount, 1)
    );
  };

  // Add special css effects to a date when required
  const specialColours = (date) => {
    if (date === currentDate.getDate()) {
      if (
        displayDate.toDateString() == startOfMonth(currentDate).toDateString()
      ) {
        return 'border-2 font-semibold border-yellow-500 bg-yellow-200';
      } else {
        return 'border-2 font-semibold border-yellow-500';
      }
    } else if (
      selectedDate &&
      date === selectedDate.getDate() &&
      displayDate.toDateString() == startOfMonth(selectedDate).toDateString()
    ) {
      return 'bg-[#5ED3EC]';
    }
    if (
      getTodayTasks(
        new Date(displayDate.getFullYear(), displayDate.getMonth(), date),
        tasks
      ).length != 0
    ) {
      return 'bg-[#F77600]';
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(
      new Date(displayDate.getFullYear(), displayDate.getMonth(), date)
    );
  };

  // Getting details for Month name and Year to display on top of calendar
  const monthYear = displayDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  const calendarDays = [];

  // Add previous month's dates
  const firstDisplayDay = getFirstDayOfMonth(displayDate);
  const prevMonth = new Date(
    displayDate.getMonth() === 0 ? 11 : displayDate.getMonth() - 1,
    displayDate.getMonth() === 0
      ? displayDate.getFullYear() - 1
      : displayDate.getFullYear()
  );
  const prevMonthDays = getDaysInMonth(prevMonth);
  for (let i = firstDisplayDay - 1; i >= 0; i--) {
    calendarDays.push(
      <div
        className="border border-[#D5D4DF] bg-[#F2F3F7] w-20 h-20 flex justify-center items-center rounded-full text-[#A8A8A8]"
        key={`prev-${i}`}
      >
        {prevMonthDays - i}
      </div>
    );
  }

  // Add current month's dates
  const daysInCurrentMonth = getDaysInMonth(displayDate);
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    calendarDays.push(
      <div
        onClick={() => handleDateClick(i)}
        className={
          'border border-border-[#D5D4DF] w-20 h-20 flex justify-center items-center rounded-full cursor-pointer transition-colors duration-300 hover:bg-gray-200 ' +
          specialColours(i)
        }
        key={i}
      >
        {i}
      </div>
    );
  }

  // Add next month's dates
  for (let i = 1; calendarDays.length % 7 != 0; i++) {
    calendarDays.push(
      <div
        className="border border-[#D5D4DF] bg-[#F2F3F7] w-20 h-20 flex justify-center items-center rounded-full text-[#A8A8A8]"
        key={`next-${i}`}
      >
        {i}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-fit h-fit">
      <div className="flex w-full justify-between items-center mb-6">
        <div className="text-4xl font-black">{monthYear}</div>
        <div>
          <button className="text-3xl mx-5" onClick={() => changeMonth(-1)}>
            &lt;
          </button>
          <button className="text-3xl mx-5" onClick={() => changeMonth(+1)}>
            &gt;
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center h-[35rem]">
        <div className="grid grid-cols-7 gap-0">
          {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((day) => (
            <div
              key={day}
              className="text-xl w-20 h-20 flex justify-center items-center font-bold"
            >
              {day}
            </div>
          ))}
          {calendarDays}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
