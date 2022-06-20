import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "../styles/App.css";
import "../styles/styles.css";

function LandingPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    // console.log(data.employee_id)
    // console.log(data.password)
    axios
      .post(`http://localhost:8080/api/login`, {
        employee_id: data.employee_id,
        password: data.password,
      })
      .then((response) => {
        // alert("Successfully logged in!")
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("employee_id", response.data.employee_id);
        navigate("order");
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect Employee ID/Password.Please try again...");
      });
  };

  return (
    <div className="maincontainer">
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className="col-md-6 d-none d-md-flex bg-image"></div>

          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <h3 className="display-2">ISDN Holdings</h3>
                    <h3 className="display-6">WMS System</h3>
                    <form
                      className="login-form"
                      noValidate
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="form-group mb-1">
                        <input
                          id="inputEmployeeID"
                          type="email"
                          placeholder="EmployeeID"
                          {...register("employee_id", {
                            required: "Please enter your Employee ID.",
                          })}
                          autofocus=""
                          class="form-control rounded-pill border-0 shadow-sm px-4"
                        />
                      </div>
                      <div className="form-group mb-1">
                        <input
                          id="inputPassword"
                          type="password"
                          placeholder="Password"
                          {...register("password", {
                            required: "Please enter your Password.",
                          })}
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      >
                        Log in
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
