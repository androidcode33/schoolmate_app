import './App.css';
import React, { useState, useEffect } from 'react';
import { apiFullCall } from './helpers/apiHelper';
import TeachersView from './people/teachers';
import StudentsView from './people/students';

function App() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    apiFullCall({}, 'get', `students/`).then((response) => {
      if (response) {
        setStudents(response.body.results);
      }
    }).catch((error) => error);

    apiFullCall({}, 'get', `teachers/`).then((response) => {
      if (response) {
        setTeachers(response.body.results);
      }
    }).catch((error) => error);
  }, [reload]);

  return (
    <div className="App">
      <TeachersView teachers={teachers} setReload={setReload} reload={reload} />

      <StudentsView students={students} setReload={setReload} reload={reload} />
    </div>
  );
}

export default App;
