import React, { useState } from "react";
import Header from "../components/Header";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                    <Header title="Signup" />
                    <SubHeading label="Enter your information to create an account" />
                    <InputBox
                        type="text"
                        label="User Name"
                        placeholder="johndoe@57"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <InputBox
                        type="text"
                        label="First Name"
                        placeholder="John"
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <InputBox
                        type="text"
                        label="Last Name"
                        placeholder="Doe"
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <InputBox
                        type="password"
                        label="Password"
                        placeholder="your pwd"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="pt-4">
                        <Button
                            label="Signup"
                            onClick={async () => {
                                const response = await axios({
                                    url: "http://localhost:3001/api/v1/user/signup",
                                    method: "POST",
                                    data: {
                                        username: userName,
                                        firstname: firstName,
                                        lastname: lastName,
                                        password: password,
                                    },
                                });
                                const token = response.data.token;
                                localStorage.setItem("token", token);
                                if (token) {
                                    navigate("/dashboard");
                                }
                            }}
                        />
                    </div>
                    <BottomWarning
                        label={"Already have an account?"}
                        buttonText={"Sign in"}
                        to={"/signin"}
                    />
                </div>
            </div>
        </div>
    );
}
export default Signup;
