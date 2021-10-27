import React from 'react';

function Transfers({ idSenderFromHandler, idRecieverToHandler, cashActionHandler, senderChashToRecieverHandler , wrongMessageTransfer}) {
    return (
        <div>
            <div className='sendRecievedInputs'>

                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>

                    <div class="ui labeled input" style={{padding:'1rem 0'}}>
                        <label for="amount" class="ui label">Sender ID</label>
                        <input type='number' name='idSender' placeholder='Sender ID' onChange={idSenderFromHandler} />
                    </div>

                    <div class="ui labeled input" style={{padding:'1rem 0'}}>
                        <label for="amount" class="ui label">Recieve ID</label>
                        <input type='number' name='idReciever' placeholder='Recieve ID' onChange={idRecieverToHandler} />
                    </div>

                    <div class="ui labeled input" style={{padding:'1rem 0'}}>
                        <label for="amount" class="ui label">Amount $</label>
                        <input type='number' name='amount' placeholder='Cash amount' onChange={cashActionHandler} />
                    </div>

                </div>


                
                <div style={{padding:'1rem 0',display: 'flex', justifyContent: 'space-around' }}>
                <input className="ui button"
                type='button'
                name='bt'
                value='Send Cash'
                onClick={senderChashToRecieverHandler}
                
                />
                </div>

            </div>
            <div>
            {wrongMessageTransfer}
            </div>
        </div>
    );
}

export default Transfers;