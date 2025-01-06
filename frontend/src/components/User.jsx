import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function User({ user }) {
    const navigate = useNavigate();
    return (
        <div className="flex justify-between pt-2">
            <div className="flex">
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user.firstname[0].toUpperCase()}
                    </div>
                </div>
                <div className="flex flex-col justify-center h-ful">
                    <div>
                        {user.firstname} {user.lastname}
                    </div>
                </div>
            </div>

            <div className="flex flex-col justify-center h-ful">
                <Button
                    label={"Send Money"}
                    onClick={() => {
                        navigate(
                            "/sendmoney?firstname=" +
                                user.firstname +
                                "&lastname=" +
                                user.lastname +
                                "&userId=" +
                                user.userId
                        );
                    }}
                />
            </div>
        </div>
    );
}

export default User;
