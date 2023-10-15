import '../App.css';

const TeachersView = (props) => {
    const { teachers, setReload, reload } = props;

    return (
        <>
            <h4>List Of Teachers <button>Add New</button> </h4>
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
                        <th><button>Edit</button><button>Delete</button></th>
                    </tr>
                )}

            </table>
        </>
    );
}

export default TeachersView;
