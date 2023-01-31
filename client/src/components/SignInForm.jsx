import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function SignUpForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [userRegistered, setRegistered] = useState(false);
  const [errorOnSignin, setErrorOnSignin] = useState(false);

  
  const onSubmit = (data) => {
    console.log(data);
    axios.post("api/user/login", { data }).then((res) => {
      if (res.data.msg === "User Created.") {
        setRegistered(true);
        return;
      }

      setErrorOnSignin(true);
      
    });
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
    
        
        <Button variant="primary" type="submit" >
          Sign in
        </Button>
      </Form>
      {errorOnSignin && (
        <h2>
          There is some problem with your request. Please try again in a few
          minutes.
        </h2>
      )}
    </div>
  );
}
