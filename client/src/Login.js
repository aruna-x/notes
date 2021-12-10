import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function Login({ onLogin }){
    const history = useHistory();
    const [loginData, setLoginData] = useState({
        username: "", 
        password: ""
    });

    function handleSubmit(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // use just username on the other side ...
        body: JSON.stringify(loginData),
      })
        .then(r => r.json())
        .then(user => {
            onLogin(user)
        })
        .then(()=>{
            history.push('/notes')
        });
    }

    function handleChange(e){
        let key = e.target.name;
        let value = e.target.value;
        setLoginData({...loginData, [key]: value})
    }

    return(
        <Style>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" value={loginData.username} onChange={handleChange} placeholder="Username" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" value={loginData.password} onChange={handleChange} placeholder="Password" />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </Style>
    )
}

export default Login;

const Style = styled.div`
    margin: 50px auto;
    width: 500px;
`

