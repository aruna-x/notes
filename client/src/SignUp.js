import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

function SignUp({ onLogin }){
    const history = useHistory();
    const [signUpData, setSignUpData] = useState({
        username: "", 
        password: "", 
        passwordConfirmation: "", 
        email:""
    });

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpData),
        })
          .then(r => r.json())
          .then(user => onLogin(user))
          .then(()=>history.push('/notes'));
    }

    function handleChange(e){
        let key = e.target.name;
        let value = e.target.value;
        setSignUpData({...signUpData, [key]: value})
    }

    return(
        <Style>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Email</label>
                    <input type="email" name="email" value={signUpData.email} onChange={handleChange} placeholder="Email" />
                </div>
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" value={signUpData.username} onChange={handleChange} placeholder="Username" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" value={signUpData.password} onChange={handleChange} placeholder="Password" />
                </div>
                <div className="field">
                    <label>Confirm Password</label>
                    <input type="password" name="passwordConfirmation" value={signUpData.passwordConfirmation} onChange={handleChange} placeholder="Password" />
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </Style>
    )
}

const Style = styled.div`
    margin: 50px auto;
    width: 500px;
`

export default SignUp;

