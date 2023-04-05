import { Card, Form, Button, Alert } from "react-bootstrap";
import {useState} from 'react';
import { useRouter } from "next/router";
import { registerUser } from "@/lib/authenticate";

export default function Register(props){

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();


   async function handleSubmit(e){
      e.preventDefault();
         console.log(userName, password, password2);
      await registerUser(userName,password,password2).then(()=>{
         console.log("valid user");
         router.push("/login");
      }).catch(err=>{
         setMessage(err.message);
      })
   }

  return (
    <>
      <Card bg="light">
        <Card.Body><h2>Register</h2>Register for an account:</Card.Body>
      </Card>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>User:</Form.Label><Form.Control value={userName} onChange={e => setUserName(e.target.value)} type="text" id="userName" name="userName" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Password:</Form.Label><Form.Control value={password} onChange={e=>setPassword(e.target.value)} type="password" id="password" name="password" />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label><Form.Control value={password2} onChange={e=>setPassword2(e.target.value)} type="password" id="password2" name="password2" />
        </Form.Group>
        <br />
        <Button variant="primary" className="pull-right" type="submit">Register</Button>
      </Form>
      { message && ( <><br /><Alert variant="danger">{message}</Alert></> )}
    </>
  );
}