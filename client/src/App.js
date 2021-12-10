import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from "react-router-dom";
import { Container, Header, Button, Modal } from 'semantic-ui-react';
import styled from 'styled-components';
import notesText from './notes.png';
import './App.css';
import 'fomantic-ui-css/semantic.css';

import NewNote from "./NewNote";
import Notes from './Notes';
import Note from './Note';
import EditNote from './EditNote';
import NotFound from './NotFound';
import SignUp from './SignUp';
import Login from './Login';
import NavBar from './NavBar';

function App() {

  const [open, setOpen] = useState([false, false]);
  const [user, setUser] = useState(null);
  console.log("user",user)


  useEffect(() => {
    fetch("/me")
    .then(r => {
      if (r.ok) { 
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  function Home() {
    return (
        <div className="App">
            <HomeHeader className="App-header">
                <img src={'https://thevitiligocoach.com/logo.png'} className="App-logo" alt="logo" />
                <P>
                <Modal
                    onClose={() => setOpen([false, open[1]])}
                    onOpen={() => setOpen([true, open[1]])}
                    open={open[0]}
                    trigger={<Button size={'huge'} basic={true}>Sign up</Button>}
                    header={"Sign Up"}
                    content={<SignUp onLogin={setUser} />}
                />
                <Modal
                    onClose={() => setOpen([open[0], false])}
                    onOpen={() => setOpen([open[0], true])}
                    open={open[1]}
                    trigger={<Button size={'huge'} basic={true}>Login</Button>}
                    header={"Login"}
                    content={<Login onLogin={setUser} />}
                />
                </P>
            </HomeHeader>
        </div>          
    )
}

  return (
    <Spacer>
      <Router>
        <Container>
        <Header size={'huge'}> <Link to="/"><Container content={<img src={notesText}/>} textAlign={'center'} size={'huge'}/></Link> </Header>
        {user ? <NavBar onLogout={setUser} setOpen={setOpen}/> : null}
        </Container>
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to="/notes" /> : <Home/>}
          </Route>
          {/* <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/login" component={Login} /> */}
          <Route exact path="/notes" component={Notes} />
          <Route exact path="/notes/new" component={NewNote} />
          <Route exact path="/notes/:id" component={Note} />
          <Route exact path="/notes/:id/edit" component={EditNote} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Spacer>
  );
}

export default App;

const HomeHeader = styled.header`
  margin-top: -75px;
  background: white;
`

const P = styled.p`
  margin-top: 125px;
`

const Spacer = styled.div`
  margin-top: 40px;
`

      