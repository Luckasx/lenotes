import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axiosInstance from '../config/axios.config'

//https://upmostly.com/tutorials/the-disabled-attribute-in-react-buttons

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();

  const [checkboxChecked, setChecked] = useState(false);
  const [userRegistered, setRegistered] = useState(false);
  const [errorOnSignup, setErrorOnSignup] = useState(false);

  const newuservalidate = require("./../_helpers/newuser.validate");

  const onSubmit = (data) => {
    axiosInstance.post("api/user", { data }).then((res) => {
      if (res.data.msg === "User Created.") {
        setRegistered(true);
        return;
      }

      setErrorOnSignup(true);
      
    });
  };

  const handleChange = (evt) => {
    setChecked(evt.target.checked);
  };

  if (userRegistered) {
    return (
      <div>
        <h3>User created with success!</h3>
        <Button variant="link" href="signin">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlid="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register("username", {
              required: "An username is required",
              minLength: {
                value: 6,
                message: "The username must contain 6 to 20 characters",
              },
              maxLength: {
                value: 20,
                message: "The username must contain 6 to 20 characters",
              },
              pattern: {
                value: (v) => /^[-_]*[a-z0-9]+[-_]*[a-z0-9_-]*$/i.test(v),
                message:
                  "Your username may have only alphanumerical characters. You may also include _ and -.",
              },
              validate: {
                nonexisting: async (v) =>
                  (await newuservalidate.validateExistingUser(v)) === true ||
                  "This username is already taken, please type another one.",
              },
            })}
            type="text"
            autoComplete="off"
            placeholder="Choose your username"
          />
          <div className="text-danger">
            {errors.username && <span>{errors.username.message}</span>}
          </div>

          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlid="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register("mail", {
              required: "Email Address is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid e-mail address",
              },
            })}
            autoComplete="off"
          />
          <p className="text-danger">{errors.mail?.message}</p>
          <Form.Text className="text-muted"></Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlid="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "A password is required",
              minLength: {
                value: 8,
                message: "The password must contain 8 to 20 characters.",
              },
              maxLength: {
                value: 20,
                message: "The password must contain 8 to 20 characters.",
              },
              validate: {
                complete: (v) =>
                  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,120})/.test(v),
                //upper: (v) => /(?=.*[A-Z])/.test(v),
              },
            })}
          />
          {errors.password && (
            <div>
              <p className="text-danger">{errors.password?.message}</p>
              <div>
                {
                  <div>
                    <span
                      className={`me-1  ${
                        /(?=.*[A-Z])/.test(getValues("password"))
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      A-Z
                    </span>
                    <span
                      className={`me-1  ${
                        /(?=.*[a-z])/.test(getValues("password"))
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      a-z
                    </span>
                    <span
                      className={`me-1  ${
                        /(?=.*\d)/.test(getValues("password"))
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      0-9
                    </span>
                    <span
                      className={`me-1  ${
                        /(?=.*\W)/.test(getValues("password"))
                          ? "text-success"
                          : "text-danger"
                      } `}
                    >
                      Special Characters
                    </span>
                  </div>
                }
              </div>
            </div>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlid="formBasicPasswordRepeat">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register("rpassword", {
              required: "You must confirm your password",
              validate: {
                repeat: (v) => v === getValues("password"),
              },
            })}
          />

          <div className="text-danger">
            {errors.rpassword && errors.rpassword?.type === "repeat" && (
              <span>Your passwords don't match.</span>
            )}
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            controlid="formBasicCheckbox"
            type="checkbox"
            label="I agree with everything you want"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={!checkboxChecked}>
          Submit
        </Button>
      </Form>
      {errorOnSignup && (
        <h2>
          There is some problem with your request. Please try again in a few
          minutes.
        </h2>
      )}
    </div>
  );
}
