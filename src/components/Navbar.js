function Navbar({ currentPage, setCurrentPage, user, setUser }) {

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setCurrentPage("login");
    };

    return (
        <div className="navbar">
            <h2>EduConnect</h2>

            <div>
                {!user ? (
                    <>
                        <button onClick={() => setCurrentPage("login")}>Login</button>
                        <button onClick={() => setCurrentPage("register")}>Register</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => setCurrentPage("courses")}>Courses</button>
                        <button onClick={() => setCurrentPage("enrollments")}>My Enrollments</button>
                        <span className="user-text">Hi, {user.fullName}</span>
                        <button onClick={logout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Navbar;