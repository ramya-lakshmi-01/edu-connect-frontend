import { useState } from "react";
import API from "../api/api";

function Register({ setCurrentPage }) {
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        password: "",
        role: "STUDENT"
    });

    const register = async (e) => {
        e.preventDefault();

        try {
            await API.post("/users/register", user);
            alert("Registered successfully. Please login.");
            setCurrentPage("login");
        } catch (error) {
            console.log(error);
            alert("Registration failed");
        }
    };

    return (
        <div className="auth-box">
            <h2>Register</h2>

            <form onSubmit={register}>
                <input
                    type="text"
                    placeholder="Full Name"
                    value={user.fullName}
                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                />

                <select
                    value={user.role}
                    onChange={(e) => setUser({ ...user, role: e.target.value })}
                >
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;