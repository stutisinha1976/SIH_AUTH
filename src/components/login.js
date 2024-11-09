import { signInWithEmailAndPassword,  } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [post,setpost]=useState("");
  const [userDetails, setUserDetails] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve user's department from Firestore
      const userDoc = await getDoc(doc(db, 'Users', user.uid));
      if (!userDoc.exists()){
        throw new Error("User Doesn't Exists!!");
      }
      await setUserDetails(userDoc.data());
      if (userDetails.position !== post){
        throw new Error("User doesn't have post: "+post);
      } 

      console.log("User logged in Successfully");
      window.location.href = "/profile";
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
  <label>Choose a post</label>
  <select
    className="form-control"
    onChange={(e) => setpost(e.target.value)}
    defaultValue=""
  >
    <option value="" disabled>Select a post</option>
    <option value="Project Manager">Project Manager</option>
    <option value="Worker">Worker</option>
  </select>
</div>


      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
      <SignInwithGoogle/>
    </form>
  );
}

export default Login;