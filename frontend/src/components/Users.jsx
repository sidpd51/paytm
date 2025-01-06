import { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const fetch = async () => {
            const authToken = "Bearer " + localStorage.getItem("token");
            console.log(authToken);
            const response = await axios({
                url: "http://localhost:3001/api/v1/user/bulk?filter=" + filter,
                method: "GET",
                headers: {
                    authorization: authToken,
                },
            });

            setUsers(response.data.users);
        };
        fetch();
    }, [filter]);

    return (
        <>
            <div className="font-bold mt-6 text-lg">Users</div>
            <div className="my-2">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full px-2 py-1 border rounded border-slate-200"
                    onChange={(e) => setFilter(e.target.value)}
                ></input>
            </div>
            <div>
                {users.map((user, index) => (
                    <User user={user} key={index} />
                ))}
            </div>
        </>
    );
};

export default Users;
