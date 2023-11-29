import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
    const { id } = useParams();
    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Gender, setGender] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/getUser/" + id)
            .then(result => {
                console.log(result);
                setFirstName(result.data.FirstName);
                setLastName(result.data.LastName);
                setGender(result.data.Gender);
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/updateUser/" + id, { FirstName, LastName, Gender })
            .then(result => {
                console.log(result);
                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-50 bg-white rounded p-3">
                    <form onSubmit={Update}>
                        <h2>Update User</h2>
                        <div className="mb-2">
                            <label htmlFor="">FirstName</label>
                            <input
                                type="text"
                                placeholder="Enter your FirstName"
                                className="form-control"
                                value={FirstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">LastName</label>
                            <input
                                type="text"
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
                        <div className="mb-2">
                            <button className="btn btn-primary">Update User</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateUser;
