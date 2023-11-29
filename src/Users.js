import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001")
            .then(result => {
                if (Array.isArray(result.data) && result.data.length > 0) {
                    setUsers(result.data);
                } else {
                    console.error("Invalid or empty data received");
                }
            })
            .catch(err => console.error("Error fetching users:", err));
    }, []);

    const handleDelete = (id) => {
        axios.delete("/deleteUser/" + id)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.error(err));
    };

    const handleDetails = (userId) => {
        axios.get("/getUser/" + userId)
            .then(res => {
                console.log( res);
                window.location.reload();
            })
            .catch(error => {
                console.error("Error fetching user details:", error);
            });
    };
    const navigate = useNavigate();
    

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to="/create" className="btn btn-success">Add+</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Gender</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.FirstName}</td>
                                    <td>{user.LastName}</td>
                                    <td>{user.Gender}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className="btn btn-success">Update</Link>
                                        <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button>
                                        <button className="btn btn-info" onClick={() => handleDetails(user._id)}>Details</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
