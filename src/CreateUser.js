import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Gender, setGender] = useState('');

    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/createUser", { FirstName, LastName, Gender })
        .then(result => {
            console.log(result);
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="firstName">FirstName</label>
                        <input
                            type="text"
                            id="firstName"
                            placeholder="Enter your FirstName"
                            className="form-control"
                            value={FirstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lastName">LastName</label>
                        <input
                            type="text"
                            id="lastName"
                            placeholder="Enter your LastName"
                            className="form-control"
                            value={LastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            className="form-control"
                            value={Gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
