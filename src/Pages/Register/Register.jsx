import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import { firebaseRegister } from "../../Services/Auth";
import { uidContext } from "../../Contexts/uidContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Services/FirebaseConfig";

const Register = () => {
    const { uid, setUid } = useContext(uidContext);
    const navTo = useNavigate();
    const [user, setUser] = useState({ name: "", email: "", userName: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({
        nameError: '',
        userNameError: '',
        emailError: '',
        passwordError: '',
        confirmPassError: ''
    })

    const changeHandle = (event) => {
        const nameRegex = /[0-9]+/;
        const userNameRegex = /^[a-zA-Z]{3,}$/;
        const emailRegex = /^[a-zA-Z]{4,10}@(gmail|yahoo)\.com$/;
        const passwordRegex = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`\\|-])\S{8,}$/;

        switch (event.target.name) {
            case "name":
                setUser({ ...user, name: event.target.value });
                setErrors({ ...errors, nameError: event.target.value.length == 0 ? "Name is  required" : nameRegex.test(event.target.value) ? "Name must not contain numbers" : "" })
                return;
            case "email":
                setUser({ ...user, email: event.target.value })
                setErrors({ ...errors, emailError: (event.target.value.length == 0) ? 'Email is required' : (emailRegex.test(event.target.value)) ? '' : 'Email should be like this example@gmail.com' });
                return;
            case "userName":
                setUser({ ...user, userName: event.target.value });
                setErrors({ ...errors, userNameError: event.target.value.length == 0 ? "User Name is  required" : userNameRegex.test(event.target.value) ? "" : "User Name must not contain numbers or spaces" })
                return
            case "password":
                setUser({ ...user, password: event.target.value });
                setErrors({ ...errors, passwordError: (event.target.value.length == 0) ? 'Password is required' : (event.target.value.length < 8) ? "Password length should be at least 8" : passwordRegex.test(event.target.value) ? '' : 'Password should at least contains one upper case ,lowercase and special character' })
                return
            case "passwordConfirm":
                setUser({ ...user, confirmPassword: event.target.value })
                setErrors({ ...errors, confirmPassError: (user.password == "") ? "Enter a password" : (errors.passwordError != "") ? "You should enter a valid password" : (event.target.value.length == 0) ? 'Confirming Password is required' : (event.target.value == user.password) ? '' : 'Not the same password' })
                return
            default:
                return;
        }
    }
    const handleSubmit = (event) => {

        event.preventDefault();

        if (!user.name || !user.email || !user.userName || !user.password || !user.confirmPassword) {
            alert("Fill the form first");
            return;
        }

        if (errors.nameError || errors.emailError || errors.userNameError || errors.passwordError || errors.confirmPassError) {
            alert("Fill the form correctly");
        }

        if (!errors.nameError && !errors.emailError && !errors.userNameError && !errors.passwordError && !errors.confirmPassError) {
            // VV HERE The Firebase Logic VV

            firebaseRegister(user.email, user.password);
            addUser();

            // ^^ HERE The Firebase Logic ^^
            alert("Done");
            navTo("/Login");
        }

    }

    const addUser = async () => {
        await setDoc(doc(db, "user", uid), {
            Uid: uid
        });
    };

    return <>
        <div className="border rounded col-6 mx-auto my-5 d-flex justify-content-center">
            <form className="col-6 m-4" onSubmit={(event) => { handleSubmit(event); }} >
                <div className="mb-3">
                    <label htmlFor="nameInput" className="form-label fw-bold">Name</label>
                    <input type="text" name="name" className="form-control" value={user.name}
                        onChange={(event) => { changeHandle(event); }} id="nameInput" />
                    <p className="text-danger">{errors.nameError}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label fw-bold">Email</label>
                    <input type="text" name="email" className="form-control" value={user.email}
                        onChange={(event) => { changeHandle(event); }} id="emailInput" />
                    <p className="text-danger">{errors.emailError}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="userNameInput" className="form-label fw-bold">User Name</label>
                    <input type="text" name="userName" className="form-control" value={user.userName}
                        onChange={(event) => { changeHandle(event); }} id="userNameInput" />
                    <p className="text-danger">{errors.userNameError}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label fw-bold">Password</label>
                    <input type="password" name="password" className="form-control" value={user.password}
                        onChange={(event) => { changeHandle(event); }} id="passwordInput" />
                    <p className="text-danger">{errors.passwordError}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordConfirmInput" className="form-label fw-bold">Confirm Password</label>
                    <input type="password" name="passwordConfirm" className="form-control" value={user.confirmPassword}
                        onChange={(event) => { changeHandle(event); }} id="passwordConfirmInput" />
                    <p className="text-danger">{errors.confirmPassError}</p>
                </div>


                <button type="submit" className="btn btn-success col-12 mb-3">Register</button>
                <button type="button" onClick={() => { navTo("/Login"); }} className="btn btn-success col-12 mb-3">Already have an account ?</button>
            </form>
        </div>
    </>;
}

export default Register;