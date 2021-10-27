import React, { useState, useEffect } from 'react';
import Home from './Home';
import Users from './Users';
import Deposits from './Deposits';
import Transfers from './Transfers';
import Route from './Route';
import Header from './Header';
import axios from 'axios';
import Spinner from './Spinner';
import './style.css';

const Main = () => {

    const [users, setUsers] = React.useState(null);
    const [idUser, setIdUser] = React.useState(null);
    const [cash, setCash] = React.useState(null);
    const [total, setTotal] = useState(Array().fill(0));

    // Transfer
    const [idSenderFrom, setIdSenderFrom] = React.useState(null);
    const [idRecieverTo, setIdRecieverTo] = React.useState(null);
    const [cashAction, setCashAction] = React.useState(null);

    //Wrong Message
    const [wrongMessage, setWrongMessage] = React.useState(null);
    const [wrongMessageTransfer, setWrongMessageTransfer] = React.useState(null);

    useEffect(() => {
        getDataUsers();
    }, [])

    const getDataUsers = async () => {
        const response = await axios.get(`https://6178f28aaa7f34001740461c.mockapi.io/users`);
        setUsers(response.data);
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
                createdAt: new Date(),
                cash: cash,
                isWithdrawal: true,
                userId: idUser,
            }
            await axios.post(`https://6178f28aaa7f34001740461c.mockapi.io/users/${idUser}/bank`, newAction)
            setWrongMessage('Succesfully')
        } else {
            setWrongMessage('something went wrong! Please Try Again')
        }
    }

    const countTotal = async (length) => {
        let totalAmount = 0;
        let arrarr = [];
        for (let i = 1; i <= length; i++) {
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


    // transfer
    const idSenderFromHandler = (e) => {
        setIdSenderFrom(e.target.value);
    }
    const idRecieverToHandler = (e) => {
        setIdRecieverTo(e.target.value);
    }
    const cashActionHandler = (e) => {
        setCashAction(parseInt(e.target.value, 10));
    }

    const senderChashToRecieverHandler = async () => {
        const found = users.find(element => element.id === idSenderFrom);
        const found2 = users.find(element => element.id === idRecieverTo);
        const indexOfSenderId = users.map(function (e) { return e.id; }).indexOf(idSenderFrom)
        if ((cashAction > 0) && (found !== null) && (found2 !== null) &&
            (idSenderFrom !== idRecieverTo) && (total[indexOfSenderId] > 0) && (total[indexOfSenderId] > cashAction)) {
            let newActionSender = {
                createdAt: new Date(),
                cash: cashAction,
                isWithdrawal: false,
                userId: idSenderFrom,
            }
            let newActionReciever = {
                createdAt: new Date(),
                cash: cashAction,
                isWithdrawal: true,
                userId: idRecieverTo,
            }
            await axios.post(`https://6178f28aaa7f34001740461c.mockapi.io/users/${idSenderFrom}/bank`, newActionSender)
            await axios.post(`https://6178f28aaa7f34001740461c.mockapi.io/users/${idRecieverTo}/bank`, newActionReciever)
            setWrongMessageTransfer('Succesfully')
        } else {
            setWrongMessageTransfer('something went wrong! Please Try Again')
        }
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
                        <Users users={users} total={total} method={countTotal} />
                    </Route>

                    <Route path="/deposits">
                        <Deposits
                            idSenderHandler={idSenderHandler}
                            cashHandler={cashHandler}
                            adminChashToAccountHandler={adminChashToAccountHandler}
                            wrongMessage={wrongMessage}
                        />
                    </Route>

                    <Route path="/transfers">
                        <Transfers
                            idSenderFromHandler={idSenderFromHandler}
                            idRecieverToHandler={idRecieverToHandler}
                            cashActionHandler={cashActionHandler}
                            senderChashToRecieverHandler={senderChashToRecieverHandler}
                            wrongMessageTransfer={wrongMessageTransfer}
                        />
                    </Route>
                </div>
            </div>
        </div>
    );
}

export default Main;