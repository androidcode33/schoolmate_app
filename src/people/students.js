import '../App.css';
import React, { useState } from 'react';
import { apiFullCall } from '../helpers/apiHelper';

const StudentsView = (props) => {
    const { students, setReload, reload } = props;
    const [manageStudent, setManageStudent] = useState({ isOpen: false, student: {} });

    const handleInputChange = e => {
        // update the states
        setManageStudent({
            ...manageStudent,
            student: {
                ...manageStudent.student,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmitUpdates = () => {
        // its editting
        if (manageStudent.student.id) {
            apiFullCall(manageStudent.student, 'patch', `people/${manageStudent.student.id}/`).then((response) => {
                if (response) {
                    // Update the list with reload
                    setReload(!reload);
                }
            }).catch((error) => error);

        } else {
            // its new student
            apiFullCall(manageStudent.student, 'post', `people/`).then((response) => {
                if (response) {
                    apiFullCall({ username: manageStudent.student.username, student_people: response.id }, 'post', `students/`).then((studentResponse) => {
                        if (studentResponse) {
                            setReload(!reload);
                        }
                    }).catch((error) => error);
                }
            }).catch((error) => error);
        }
    }

    const handleDeletion = (peopleId) => {
        // deleting from people, deletes cascade
        apiFullCall({}, 'delete', `people/${peopleId}/`).then((response) => {
            if (response) {
                // Update the list with reload
                setReload(!reload);
            }
        }).catch((error) => error);
    }

    return (
        <>
            <h4>List Of Students <button onClick={() => setManageStudent({ ...manageStudent, isOpen: true })}>Add New</button> </h4>
            <table>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Action</th>
                </tr>
                {students && students.map((student, index) =>
                    <tr key={`student-count${index + 1}`}>
                        <th>{index + 1}</th>
                        <th>{student.name}</th>
                        <th>{student.username}</th>
                        <th><button onClick={() => setManageStudent({ ...manageStudent, isOpen: true, student: student })}>Edit</button><button onClick={()=> handleDeletion(student.people_id)}>Delete</button></th>
                    </tr>
                )}

            </table>

            <dialog open={manageStudent.isOpen}>
                <p>{manageStudent.student && manageStudent.student.id ? `Edit Student` : `Add New Student`}</p>
                <form>
                    <label for="name">Name:</label>
                    <input type="text" id="fname" name="name" onChange={handleInputChange} value={manageStudent.student ? manageStudent.student.name : ``} /><br />
                    <label for="surname">Surname:</label>
                    <input type="text" id="surname" onChange={handleInputChange} name="surname" value={manageStudent.student ? manageStudent.student.surname : ``} /> <br />
                    <button onClick={() => handleSubmitUpdates()}>Submit</button>
                </form>
            </dialog>

        </>
    );
}

export default StudentsView;
