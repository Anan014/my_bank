import React from 'react';
import Home from './Home';
import Users from './Users';
import Deposits from './Deposits';
import Transfers from './Transfers';
import Route from './Route';
import Header from './Header';
import axios from 'axios';
// import Spinner from './Spinner';

const Main = () => {

    const [users, setUsers] = React.useState(null);
    const [idUser, setIdUser] = React.useState(null);
    const [cash, setCash] = React.useState(null);

    React.useEffect(() => {
        getDataUsers()
        // getDataBank()
    }, [])
    const getDataUsers = async () => {
        const response = await axios.get(`https://6178f28aaa7f34001740461c.mockapi.io/users`)
        // console.log(response.data);
        setUsers(response.data)
    }

    const idSenderHandler = (e) => {
        console.log(e.target.value);
        setIdUser(e.target.value);
    }
    const cashHandler = (e) => {
        console.log(e.target.value);
        setCash(e.target.value);
    }
    const adminChashToAccountHandler = async (e) => {
        console.log(e.target.value);
        const found = users.find(element => element.id === idUser);
        if ((cash > 0) && (found != null)) {
            let newAction = {
                cash: cash,
                isWithdrawal: true,
                userId: idUser,
            }
            await axios.post(`https://6178f28aaa7f34001740461c.mockapi.io/users/${idUser}/bank`, newAction)
        }
    }

    return (
        <div className="ui container">

            {/* main menu */}

            <Header />

            <div>
                <Route path="/">
                    <Home />
                </Route>

                <Route path="/users">
                    <Users users={users} />
                </Route>

                <Route path="/deposits">
                    <Deposits
                    idSenderHandler={idSenderHandler}
                    cashHandler={cashHandler}
                    adminChashToAccountHandler={adminChashToAccountHandler}
                    />
                </Route>

                <Route path="/transfers">
                    <Transfers />
                </Route>
            </div>
        </div>
    );
}

export default Main;