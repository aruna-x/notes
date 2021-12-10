import { Button, Container } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

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
        <Container textAlign={'right'}>
            <nav>
                <Button basic={true} size={'tiny'} onClick={handleLogout}><a>Logout</a></Button>
            </nav>
        </Container>
    )
}

export default NavBar;