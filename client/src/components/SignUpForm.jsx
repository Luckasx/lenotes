import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";

import { validatePassword } from "./../_helpers/SignUpFormValidation";

//https://upmostly.com/tutorials/the-disabled-attribute-in-react-buttons

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
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
          })}
          type="text"
          autoComplete="off"
          placeholder="Choose your username"
        />
        <p className="text-danger">{errors.username?.message}</p>
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
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlid="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "A password is required",
            validate: validatePassword           
          })}
        />
        <p className="text-danger">{errors.password?.message}</p>
        <div className="text-danger">
          {errors.password &&  errors.password?.type === "validate" && (
            <span>Your password is too week. It should contain at least a digit and a letter.</span>
          )}
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlid="formBasicPasswordRepeat">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
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
