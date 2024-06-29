import { useEffect, useState } from 'react';
import Calendar from './components/Calendar.jsx';
import Tasks from './components/Tasks.jsx';

function App() {
  const [taskList, setTaskList] = useState([
    { id: 0, date: '2024-06-30', task: 'Do something' },
    { id: 1, date: '2024-07-04', task: 'Finish personal project' },
    { id: 2, date: '2024-06-02', task: 'Complete frontend challenge' },
    { id: 3, date: '2024-06-02', task: 'Complete UI/UX challenge' },
  ]);
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 6, 2));

  return (
    <>
      <div className="flex h-full min-h-fit text-[#364043]">
        <Tasks
          date={selectedDate}
          tasks={taskList}
          setTasks={setTaskList}
        ></Tasks>
        <div className="bg-[#249EE3] w-8/12 flex justify-center items-center h-full min-h-fit">
          <Calendar
            tasks={taskList}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          ></Calendar>
        </div>
      </div>
    </>
  );
}

export default App;
