import React, { useState, useEffect } from 'react';
import Home from './Home';
import Users from './Users';
import Deposits from './Deposits';
import Transfers from './Transfers';
import Route from './Route';
import Header from './Header';
import axios from 'axios';
import Spinner from './Spinner';

const Main = () => {

    const [users, setUsers] = React.useState(null);
    const [idUser, setIdUser] = React.useState(null);
    const [cash, setCash] = React.useState(null);
    const [total, setTotal] = useState(Array().fill(0));
    const [arrUserLength, setArrUserLength] = useState(0);

    useEffect(() => {
        getDataUsers();
        // countTotal();
    }, [])

    const getDataUsers = async () => {
        const response = await axios.get(`https://6178f28aaa7f34001740461c.mockapi.io/users`);
        setUsers(response.data);
        // console.log(response.data[0].id);
        countTotal(response.data.length)

    }

    const idSenderHandler = (e) => {
        setIdUser(e.target.value);
    }

    const cashHandler = (e) => {
        setCash(parseInt(e.target.value, 10));
    }

    const adminChashToAccountHandler = async () => {
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

    const countTotal = async (length) => {
        let totalAmount = 0;
       
        let arrarr = [];
        for (let i = 1; i <= length ; i++) {            
            const respon = await axios.get(`https://6178f28aaa7f34001740461c.mockapi.io/users/${i}/bank`);
            let arrCash = [...respon.data];
            arrCash.forEach(cashTransaction => {
                if (cashTransaction.isWithdrawal) {
                    totalAmount = totalAmount + cashTransaction.cash;
                } else {
                    totalAmount = totalAmount - cashTransaction.cash;
                }
            });
            arrarr.push(totalAmount)
            totalAmount = 0;
        }
        setTotal(arrarr);
    }
    

    return (
        <div className="ui container">
            <div className="ui segment">



                {/* main menu */}
                <Header />

                <div className="ui segment">
                    <Route path="/">
                        <Home />
                    </Route>

                    <Route path="/users">
                        <Users users={users} total={total} />
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
        </div>
    );
}

export default Main;