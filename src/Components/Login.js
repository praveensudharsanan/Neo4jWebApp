import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import decode from "jwt-decode";
import jwt_decode from "jwt-decode";
import AuthContext from "../Context/Authcontext";
import 'bootstrap/dist/css/bootstrap.min.css';






const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFromDate] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) => {
    setFromDate({ ...formData, [e.target.name]: e.target.value });
  };

  const [err, SetError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let data = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/test_api/login",
        data,
        config
      );

      console.log(response);
      localStorage.setItem("Usertoken", response.data.token);
      let token = localStorage.getItem("Usertoken");
      let decoded = jwt_decode(token);

      console.log(decode(response.data.token));
      auth.login(response.data.token);

      navigate("/webapp");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        SetError(error.response.data);
        console.log(err);
      }
    }
  };
  return (
    <div className="inner">

    
      <br />
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <label>Email</label>

          <input
            required
            className="form-control"
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            required
            className="form-control"
            type="password"
            placeholder="Password"
            name="password"
            minLength="4"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        {err.errors && <div className="alert alert-danger">{err.errors}</div>}
        <br></br>
        <input
          className="btn btn-dark btn-lg btn-block"
          type="submit"
          value="LOGIN"
        />
        &nbsp;
    
      </form>
 
    </div>
  );
};
 
export default Login;