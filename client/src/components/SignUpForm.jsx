import {React, useState} from "react";
import { useForm  } from "react-hook-form";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function SignUpForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);


  
  const [checkboxChecked , setChecked] = useState(false);  

    const handleChange = (evt) => {
        setChecked(evt.target.checked)
    }

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("firstName", { required: true, maxLength: 20 })} />
    //   <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
    //   <input type="number" {...register("age", { min: 18, max: 99 })} />
    //   <input type="submit" />
    // </form>

    <Form>
      <Form.Group className="mb-3" controlid="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control {...register("firstName", { required: true, maxLength: 20 })} type="text" placeholder="Choose your username" />
        <Form.Text className="text-muted"></Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlid="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlid="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
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
      <Button
        variant="primary"
        type="submit"
        disabled={!checkboxChecked}
      >
        Submit
      </Button>
    </Form>
  );
}
