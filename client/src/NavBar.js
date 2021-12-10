import { Button, Container } from 'semantic-ui-react';

function NavBar({ onLogout }){

    function handleLogout() {
        fetch("/logout", {
          method: "DELETE",
        }).then(() => onLogout(null));
    }
    
    return(
        <Container textAlign={'right'}>
            <nav>
                <Button basic={true} size={'tiny'} onClick={handleLogout}><a>Logout</a></Button>
            </nav>
        </Container>
    )
}

export default NavBar;