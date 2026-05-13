import { useState } from "react";
import API from "../api/api";

function Login({ setUser, setCurrentPage }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users/login", {
                email,
                password
            });

            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
                setUser(response.data);
                setCurrentPage("courses");
            } else {
                alert("Invalid login details");
            }
        } catch (error) {
            console.log(error);
            alert("Login failed");
        }
    };

    return (
        <div className="auth-box">
            <h2>Login</h2>

            <form onSubmit={login}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;