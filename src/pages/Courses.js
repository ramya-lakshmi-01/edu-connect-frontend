import { useEffect, useState } from "react";
import API from "../api/api";

function Courses({ onEnroll }) {
    const [courses, setCourses] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [editId, setEditId] = useState(null);
    const [editCourse, setEditCourse] = useState({
        title: "",
        description: "",
        category: "",
        instructor: "",
        durationHours: "",
        price: ""
    });

    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        category: "",
        instructor: "",
        durationHours: "",
        price: ""
    });

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await API.get("/courses");
            setCourses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const searchCourses = async () => {
        try {
            if (keyword.trim() === "") {
                fetchCourses();
                return;
            }

            const response = await API.get(`/courses/search?keyword=${keyword}`);
            setCourses(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addCourse = async (e) => {
        e.preventDefault();

        try {
            await API.post("/courses", newCourse);

            setNewCourse({
                title: "",
                description: "",
                category: "",
                instructor: "",
                durationHours: "",
                price: ""
            });

            fetchCourses();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await API.delete(`/courses/${id}`);
            fetchCourses();
        } catch (error) {
            console.log(error);
        }
    };
    const startEdit = (course) => {
        setEditId(course.id);
        setEditCourse(course);
    };

    const updateCourse = async (e) => {
        e.preventDefault();

        try {
            await API.put(`/courses/${editId}`, editCourse);
            setEditId(null);
            fetchCourses();
        } catch (error) {
            console.log(error);
        }
    };
    const enrollCourse = async (courseId) => {
        try {
            await API.post(`/enrollments/course/${courseId}`, {
                studentName: "Ramya",
                studentEmail: "ramya@example.com"
            });

            alert("Enrolled successfully!");
            onEnroll();
        } catch (error) {
            console.log(error);
            alert("Enrollment failed");
        }
    };

    return (
        <div className="container">
            <h1 className="heading">EduConnect Courses</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search course by title"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <button onClick={searchCourses}>Search</button>
                <button onClick={fetchCourses}>Show All</button>
            </div>

            <form className="course-form" onSubmit={addCourse}>
                <h2>Add New Course</h2>

                <input
                    type="text"
                    placeholder="Course Title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    required
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    required
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                    required
                />

                <input
                    type="text"
                    placeholder="Instructor"
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                    required
                />

                <input
                    type="number"
                    placeholder="Duration Hours"
                    value={newCourse.durationHours}
                    onChange={(e) => setNewCourse({ ...newCourse, durationHours: e.target.value })}
                    required
                />

                <input
                    type="number"
                    placeholder="Price"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    required
                />

                <button type="submit">Add Course</button>
            </form>
            {editId && (
                <form className="course-form" onSubmit={updateCourse}>
                    <h2>Edit Course</h2>

                    <input
                        type="text"
                        value={editCourse.title}
                        onChange={(e) => setEditCourse({ ...editCourse, title: e.target.value })}
                    />

                    <input
                        type="text"
                        value={editCourse.description}
                        onChange={(e) => setEditCourse({ ...editCourse, description: e.target.value })}
                    />

                    <input
                        type="text"
                        value={editCourse.category}
                        onChange={(e) => setEditCourse({ ...editCourse, category: e.target.value })}
                    />

                    <input
                        type="text"
                        value={editCourse.instructor}
                        onChange={(e) => setEditCourse({ ...editCourse, instructor: e.target.value })}
                    />

                    <input
                        type="number"
                        value={editCourse.durationHours}
                        onChange={(e) => setEditCourse({ ...editCourse, durationHours: e.target.value })}
                    />

                    <input
                        type="number"
                        value={editCourse.price}
                        onChange={(e) => setEditCourse({ ...editCourse, price: e.target.value })}
                    />

                    <button type="submit">Update Course</button>
                    <button type="button" onClick={() => setEditId(null)}>Cancel</button>
                </form>
            )}

            {courses.map((course) => (
                <div className="course-card" key={course.id}>
                    <h2 className="course-title">{course.title}</h2>

                    <p>{course.description}</p>

                    <p><strong>Instructor:</strong> {course.instructor}</p>
                    <p><strong>Category:</strong> {course.category}</p>
                    <p><strong>Duration:</strong> {course.durationHours} hours</p>
                    <p><strong>Price:</strong> ${course.price}</p>

                    <div className="course-actions">

                        <button
                            className="delete-btn"
                            onClick={() => deleteCourse(course.id)}
                        >
                            Delete
                        </button>

                        <button
                            className="edit-btn"
                            onClick={() => startEdit(course)}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => enrollCourse(course.id)}
                        >
                            Enroll
                        </button>

                    </div>
                </div>
            ))}
        </div>
    );
}

export default Courses;