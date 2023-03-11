import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export default function MainNav() {

   const router = useRouter();
   const [title, setTitle] = useState('');


   function submitForm(e) {
      e.preventDefault(); // prevent the browser from automatically submitting the form
      console.log(`form submitted - title: ${title}`);
      router.push(`/artwork?title=true&q=${title}`);
   }
  
   return (
   <>
   <Navbar bg="light" expand="lg" className='fixed-top navbar-light bg_primary'>
      <Container>
         <Navbar.Brand>Azusa Fukuda</Navbar.Brand>
         <Nav>
            <Nav.Link href="/" passHref legacyBehavior>Home</Nav.Link>
            <Nav.Link href="/search" passHref legacyBehavior>Advanced Search</Nav.Link>
         </Nav>
         <Nav>      
            <Form onSubmit={submitForm} className="d-flex">
            <Form.Control
               type="search"
               placeholder="Search"
               className="me-2"
               aria-label="Search"
               value={title}
               onChange={(e)=>setTitle(e.target.value)}
            />
            <Button variant="outline-success" type="submit" >Search</Button>
            </Form>
          </Nav>
      </Container>
   </Navbar>
   <br/>
   <br/>
   </>
  );
}