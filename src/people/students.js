import '../App.css';

const StudentsView = (props) => {
    const { students, setReload, reload } = props;

    return (
        <>
            <h4>List Of Students <button>Add New</button> </h4>
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
                        <th><button>Edit</button><button>Delete</button></th>
                    </tr>
                )}

            </table>
        </>
    );
}

export default StudentsView;
