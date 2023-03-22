import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { Router, useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

export default function MainNav() {

   const router = useRouter();
   const [title, setTitle] = useState('');
   const [isExpanded, setIsExpanded] = useState(false);


   function submitForm(e) {
      e.preventDefault(); // prevent the browser from automatically submitting the form
      // console.log(`form submitted - title: ${title}`);
      router.push(`/artwork?title=true&q=${title}`);
      setIsExpanded(false);
   }
  
   return (
   <>
   <Navbar expanded={isExpanded} bg="light" expand="lg" className='fixed-top navbar-light bg_primary'>
      <Container>
         <Navbar.Brand>Azusa Fukuda</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=> setIsExpanded(!isExpanded)} />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
               <Link passHref legacyBehavior href="/" ><Nav.Link onClick={()=>setIsExpanded(false)}>Home</Nav.Link></Link>
               <Link passHref legacyBehavior href="/search" ><Nav.Link onClick={()=> setIsExpanded(false)}>Advanced Search</Nav.Link></Link>
            </Nav>
            <Nav>
               &nbsp;  
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
               &nbsp;
            </Nav>
         </Navbar.Collapse>
      </Container>
   </Navbar>
   <br/>
   <br/>
   </>
  );
}