import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Courses from "./pages/Courses";
import MyEnrollments from "./pages/MyEnrollments";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    const [user, setUser] = useState(savedUser);
    const [currentPage, setCurrentPage] = useState(savedUser ? "courses" : "login");
    const [refreshEnrollments, setRefreshEnrollments] = useState(0);

    return (
        <div>
            <Navbar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                user={user}
                setUser={setUser}
            />

            {currentPage === "login" && (
                <Login setUser={setUser} setCurrentPage={setCurrentPage} />
            )}

            {currentPage === "register" && (
                <Register setCurrentPage={setCurrentPage} />
            )}

            {currentPage === "courses" && (
                <Courses onEnroll={() => setRefreshEnrollments(refreshEnrollments + 1)} />
            )}

            {currentPage === "enrollments" && (
                <MyEnrollments refresh={refreshEnrollments} />
            )}
        </div>
    );
}

export default App;