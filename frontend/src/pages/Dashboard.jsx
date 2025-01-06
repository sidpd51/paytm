import React, { useEffect, useState } from "react";
import Users from "../components/Users";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import axios from "axios";

function Dashboard() {
    const [balance, setBalance] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const token = "Bearer "+localStorage.getItem("token");
            const response = await axios({
                url: "http://localhost:3001/api/v1/account/balance",
                method: "GET",
                headers: {
                    Authorization: token,
                },
            });
            setBalance(response.data.balance);
        };
        fetchData();
    }, []);
    console.log(balance)
    return (
        <>
            <AppBar />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
        </>
    );
}

export default Dashboard;
