import { Button, Container } from 'semantic-ui-react';
import { useHistory, Link } from 'react-router-dom';
import styled from 'styled-components';

function NavBar({ onLogout, setOpen }){
    let history = useHistory();
    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout(null)).then(()=>{
            setOpen([false,false]);
            history.push('/');
        });
    }
    
    return(
        <Spacer>
            <Container textAlign={'center'}>
                <nav>
                    <Button basic={true} size={'tiny'}><Link to="/notes/new">New</Link></Button>
                    <Button basic={true} size={'tiny'}><Link to="/notes">Notes</Link></Button>
                    <Button basic={true} size={'tiny'} onClick={handleLogout}><a>Logout</a></Button>
                </nav>
            </Container>
        </Spacer>
    )
}

export default NavBar;

const Spacer = styled.div`
    margin: 50px auto;
`