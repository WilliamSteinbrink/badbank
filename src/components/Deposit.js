import { React, useContext, useState } from 'react';
import { UserContext, Card } from '../context'

function Deposit() {
    const [ show, setShow ] = useState(true);
    const [ status, setStatus ] = useState('');
    const [ amount, setAmount ] = useState('');
    const ctx = useContext(UserContext);

    function validate(field) {
        if (!field) {
            setStatus('Error: enter a number');
            alert('Error: enter a number');
            setTimeout(() => setStatus(''), 3000);
            return false;
        } else if (isNaN(amount)) {
            setStatus('Error: enter a valid number.');
            alert('Error: enter a valid number.');
            setTimeout(() => setStatus(''), 3000);
            return false;
        } else if (amount <=0) {
            setStatus('Error: deposit must be positive.');
            alert('Error: deposit must be positive.');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }
    
    function handleDeposit() {
        console.log(amount);
        if (!validate(amount)) return;
        ctx.users[0].balance += parseInt(amount);
        setShow(false);
    }
    
    function clearForm(){
        setAmount(0);
        setShow(true);
    }
    if (ctx.users[0]) {
        return (
            <Card
                bgcolor="light"
                txtcolor="black"
                header="Deposit"
                status={status}
                body={show ? (
                    <>
                    Amount<br/>
                    <input type="input" className="form-control" id="amount" placeholder="Enter Amount" value={amount} onChange={e => setAmount(e.currentTarget.value)} /><br/>
                    <button type="submit" disabled={!amount} className="btn btn-light border-dark w-100" style={{maxWidth: '20rem'}} onClick={handleDeposit}>Make a Deposit</button>
                    </>
                ):(
                    <>
                        <h5>Success!</h5>
                        <div>You have deposited ${amount} to your account.</div>
                        <div>Your new balance is ${ctx.users[0].balance}.</div>
                        <button type="submit" className="btn btn-light border-dark w-100" style={{maxWidth: '20rem'}} onClick={clearForm}>Make Another Deposit</button>
                    </>
                )}
                title="Deposit To Your Account"
                text={ctx.users[0] ? `Your current balance is: $${ctx.users[0].balance}.` : 'Please log in or create an account.' }
            />
        );
    } else {
        return (
            <Card
                bgcolor="light"
                txtcolor="black"
                header="BadBank Deposit"
                title="Account Required"
                text="You must create an account before making a deposit."
                link1="/createaccount/"
                name1="Click here to create your account"
            />
        )
    }
    }
export default Deposit;