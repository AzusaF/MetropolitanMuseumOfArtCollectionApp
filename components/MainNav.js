import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { removeToken, readToken } from '@/lib/authenticate';

export default function MainNav() {

   const router = useRouter();
   const [title, setTitle] = useState('');
   const [isExpanded, setIsExpanded] = useState(false);
   const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

   function logout() {
      setIsExpanded(false)
      removeToken();
      router.push('/login');
   }

   let token = readToken();

   async function submitForm(e) {
      e.preventDefault(); // prevent the browser from automatically submitting the form
      router.push(`/artwork?title=true&q=${title}`);
      setIsExpanded(false);
      setSearchHistory(await addToHistory(`title=true&q=${title}`));
      console.log("setSearch in MainNav", searchHistory);
   }
  
   return (
   <>
   <Navbar expanded={isExpanded} bg="light" expand="lg" className='fixed-top navbar-light bg_primary'>
      <Container>
         <Navbar.Brand>Metropolitan Museum of Art Collection</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=> setIsExpanded(!isExpanded)} />
         <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
               <Link passHref legacyBehavior href="/" ><Nav.Link active={router.pathname === "/"} onClick={()=>setIsExpanded(false)}>Home</Nav.Link></Link>
               {token&&<Link passHref legacyBehavior href="/search" ><Nav.Link active={router.pathname === "/search"} onClick={()=> setIsExpanded(false)}>Advanced Search</Nav.Link></Link>}
            </Nav>
            <Nav>
               &nbsp;  
               {!token && <Link passHref legacyBehavior href="/register" ><Nav.Link active={router.pathname === "/register"} onClick={()=> setIsExpanded(false)}>Register</Nav.Link></Link>}
               {!token && <Link passHref legacyBehavior href="/login" ><Nav.Link active={router.pathname === "/login"} onClick={()=> setIsExpanded(false)}>Log In</Nav.Link></Link>}
               {token&&<Form onSubmit={submitForm} className="d-flex">
               <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={title}
                  onChange={(e)=>setTitle(e.target.value)}
               />
               <Button variant="outline-success" type="submit" >Search</Button>
               </Form>}
               &nbsp;
               <Nav>
                  {token && <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link passHref legacyBehavior href="/favourites"><NavDropdown.Item onClick={()=>setIsExpanded(false)}>Favourites</NavDropdown.Item></Link>
                  <Link passHref legacyBehavior href="/history"><NavDropdown.Item onClick={()=>setIsExpanded(false)}>Search History</NavDropdown.Item></Link>
                  <Link passHref legacyBehavior href="/"><NavDropdown.Item onClick={()=>logout()}>Log Out</NavDropdown.Item></Link>
                  </NavDropdown>}
               </Nav>
            </Nav>
         </Navbar.Collapse>
      </Container>
   </Navbar>
   <br/>
   <br/>
   </>
  );
}