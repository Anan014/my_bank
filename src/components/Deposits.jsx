import React from 'react';

function Deposits({ idSenderHandler, cashHandler, adminChashToAccountHandler, wrongMessage }) {
    return (
        <div >
            <div className='inputs' style={{display:"flex",
            flexWrap:"wrap",
            justifyContent :"space-around"
            }}>
                <div className="ui icon input" style={{padding:'1rem 0'}}>
                    <input type='number' name='idSender' placeholder='id Sender' onChange={idSenderHandler} />
                    <i className="user icon"></i>
                </div>
                <div className="ui icon input" style={{padding:'1rem 0'}}>
                    <input type='number' name='cash' placeholder='Send Cash to account' onChange={cashHandler} />
                    <i className="euro sign icon"></i>
                </div>
                
                <div style={{padding:'1rem 0'}}>
                <input className="ui button"
                type='button'
                name='bt'
                value='Send Cash'
                onClick={adminChashToAccountHandler}
                
                />
                </div>
            </div>
            <div>
            {wrongMessage}
            </div>
        </div>
    );
}

export default Deposits;