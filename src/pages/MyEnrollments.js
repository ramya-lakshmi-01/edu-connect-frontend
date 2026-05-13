import { useEffect, useState } from "react";
import API from "../api/api";

function MyEnrollments({ refresh }) {

    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        fetchEnrollments();
    }, [refresh]);

    const fetchEnrollments = async () => {
        try {
            const response = await API.get(
                "/enrollments/student?email=ramya@example.com"
            );

            setEnrollments(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const dropEnrollment = async (id) => {
        try {

            await API.delete(`/enrollments/${id}`);

            fetchEnrollments();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">

            <h1 className="heading">
                My Enrollments
            </h1>

            {enrollments.map((enrollment) => (

                <div
                    className="course-card"
                    key={enrollment.id}
                >

                    <h2 className="course-title">
                        {enrollment.course.title}
                    </h2>

                    <p>
                        {enrollment.course.description}
                    </p>

                    <p>
                        <strong>Instructor:</strong>
                        {" "}
                        {enrollment.course.instructor}
                    </p>

                    <button
                        className="delete-btn"
                        onClick={() => dropEnrollment(enrollment.id)}
                    >
                        Drop Course
                    </button>

                </div>
            ))}

        </div>
    );
}

export default MyEnrollments;