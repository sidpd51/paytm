import React from "react";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";

function Signin() {
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-90 text-center p-2 h-max px-4">
                    <Header title="Signin" />
                    <SubHeading label="Enter your information to login to your account" />
                    <InputBox
                        type="email"
                        label="Email"
                        placeholder="johndoe@gmail.com"
                    />
                    <InputBox
                        type="password"
                        label="Password"
                        placeholder="your pwd"
                    />
                    <div className="pt-4">
                        <Button label="Signin" onClick={() => {}} />
                    </div>
                    <BottomWarning
                        label={"Don't have an account?"}
                        buttonText={"Sign up"}
                        to={"/signup"}
                    />
                </div>
            </div>
        </div>
    );
}

export default Signin;
