import React from 'react';

function Deposits({idSenderHandler,cashHandler,adminChashToAccountHandler}) {
    return (
        <div>
            <div className='inputs'>
                <input type='number' name='idSender' placeholder='id Sender' onChange={idSenderHandler} />
                <input type='number' name='cash' placeholder='Send Cash to account' onChange={cashHandler} />
                <input type='button' name='bt' value='Send Cash' onClick={adminChashToAccountHandler} />
            </div>
        </div>
    );
}

export default Deposits;