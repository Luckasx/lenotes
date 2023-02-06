import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  let navigate = useNavigate(); // declare here, inside a React component.

  const [errorOnSignin, setErrorOnSignin] = useState(false);
  const [invalidLogin, setInvalidLogin] = useState(false);

  /**
   * 
   * @param {*} data Form data with username/password
   * @returns Shows error or redirect to home
   */
  const onSubmit = async (data) => {
    try {
      //clear previous error messages
      setInvalidLogin(false);
      setErrorOnSignin(false);

      let res = (await axios.post("api/user/login", { data })).data;

      if (res.username) {
        navigate("/");
      }
    } catch (err) {
      //when the response status is 401. we assume it is an invalid login
      if (err.response.status === 401) {
        setInvalidLogin(true);
        return;
      }
      setErrorOnSignin(true);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlid="formBasicUsername">
          <Form.Control
            {...register("username", {
              required: "An username is required",
            })}
            type="text"
            autoComplete="off"
            placeholder="Username"
          />
          <div className="text-danger">
            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlid="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "A password is required",
            })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>
      {errorOnSignin && (
        <h5>
          There is some problem with your request. Please try again in a few
          minutes.
        </h5>
      )}

      {invalidLogin && (
        <h5 class='text-danger'>
          Invalid user or password.
        </h5>
      )}
    </div>
  );
}
