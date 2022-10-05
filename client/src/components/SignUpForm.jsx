import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

//https://upmostly.com/tutorials/the-disabled-attribute-in-react-buttons

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [checkboxChecked, setChecked] = useState(false);

  const handleChange = (evt) => {
    setChecked(evt.target.checked);
  };

  return (
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
            validate: v => /^[-_]*[a-z0-9]+[-_]*[a-z0-9_-]*$/i.test(v),
          })}
          type="text"
          autoComplete="off"
          placeholder="Choose your username"
        />
        <p className="text-danger">{errors.username?.message}</p>

        <div className="text-danger">
          {errors.username && errors.username?.type === "validate" && (
            <span>
              Your username may have only alphanumerical characters. You may
              also include _ and -.
            </span>
          )}
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
              complete: v =>  /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,120})/.test(v)   
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
            <span>
              Your passwords don't match.
            </span>
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
  );
}
