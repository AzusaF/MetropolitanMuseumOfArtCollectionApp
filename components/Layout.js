import { Container } from 'react-bootstrap';
import MainNav from '@/components/MainNav';


export default function Layout(prop) {
   return (
     <>
      <MainNav/> <br /> <br />
      <Container>
         {prop.children} 
      </Container>
      <br />
     </>
   );
}