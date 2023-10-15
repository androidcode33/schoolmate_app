import '../App.css';
import React, { useState } from 'react';
import { apiFullCall } from '../helpers/apiHelper';

const TeachersView = (props) => {
    const { teachers, setReload, reload } = props;

    const [manageTeacher, setManageTeacher] = useState({ isOpen: false, teacher: {} });

    const handleInputChange = e => {
        // update states
        setManageTeacher({
            ...manageTeacher,
            teacher: {
                ...manageTeacher.teacher,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmitUpdates = () => {
        if (manageTeacher.teacher.id) {
            // update teacher details
            apiFullCall(manageTeacher.teacher, 'patch', `people/${manageTeacher.teacher.id}/`).then((response) => {
                if (response) {
                    // Update the list with reload
                    setReload(!reload);
                }
            }).catch((error) => error);
        } else {
            // its new teacher
            apiFullCall(manageTeacher.teacher, 'post', `people/`).then((response) => {
                if (response) {
                    apiFullCall({ teacher_people: response.id }, 'post', `teachers/`).then((teacherResponse) => {
                        if (teacherResponse) {
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
            <h4>List Of Teachers <button onClick={() => setManageTeacher({ ...manageTeacher, isOpen: true })}>Add New</button> </h4>
            <table>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Students</th>
                    <th>Action</th>
                </tr>
                {teachers && teachers.map((teacher, index) =>
                    <tr key={`teacher-count${index + 1}`}>
                        <th>{index + 1}</th>
                        <th>{teacher.name}</th>
                        <th></th>
                        <th><button onClick={() => setManageTeacher({ ...manageTeacher, isOpen: true, teacher: teacher })}>Edit</button><button onClick={()=> handleDeletion(teacher.people_id)}>Delete</button></th>
                    </tr>
                )}

            </table>

            <dialog open={manageTeacher.isOpen}>
                <p>{manageTeacher.teacher && manageTeacher.teacher.id ? `Edit Student` : `Add New Student`}</p>
                <form>
                    <label for="name">Name:</label>
                    <input type="text" id="fname" name="name" onChange={handleInputChange} value={manageTeacher.teacher ? manageTeacher.teacher.name : ``} /><br />
                    <button onClick={() => handleSubmitUpdates()}>Submit</button>
                </form>
            </dialog>
        </>
    );
}

export default TeachersView;
