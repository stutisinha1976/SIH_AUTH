import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "./firebase"; // Ensure Firebase is properly configured
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [post, setPost] = useState("");
  const [additionalOption, setAdditionalOption] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [projectPassword, setProjectPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step 2: Prepare user data for Firestore
      const userData = {
        email,
        firstName: fname,
        lastName: lname,
        position: post,
        additionalInfo: additionalOption || null,
        projectCode: additionalOption === "Project Assigned" ? projectCode : null,
        projectPassword: additionalOption === "Project Assigned" ? projectPassword : null,
        createdAt: new Date().toISOString(),
      };

      // Step 3: Save user data in Firestore
      await setDoc(doc(db, "Users", user.uid), userData);

      // Success message
      toast.success("User registered successfully!", {
        position: "top-center",
      });

      console.log("User Registered:", userData);
    } catch (error) {
      console.error("Error registering user:", error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Choose a Post</label>
        <select
          className="form-control"
          onChange={(e) => {
            setPost(e.target.value);
            setAdditionalOption(""); // Reset additional option
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select a post
          </option>
          <option value="CMPDI Admin">CMPDI Admin</option>
          <option value="Project Investigator">Project Investigator</option>
        </select>
      </div>

      {post === "Project Investigator" && (
        <div className="mb-3">
          <label>Additional Information</label>
          <select
            className="form-control"
            onChange={(e) => setAdditionalOption(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Project Assigned">Project Assigned</option>
            <option value="Project Proposal">Project Proposal</option>
          </select>
        </div>
      )}

      {post === "Project Investigator" && additionalOption === "Project Assigned" && (
        <>
          <div className="mb-3">
            <label>Project Code</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Project Code"
              onChange={(e) => setProjectCode(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Project Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Project Password"
              onChange={(e) => setProjectPassword(e.target.value)}
              required
            />
          </div>
        </>
      )}

      <div className="mb-3">
        <label>Email Address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered? <a href="/login">Login</a>
      </p>
    </form>
  );
}

export default Register;
