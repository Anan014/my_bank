import React from 'react';
import Spinner from './Spinner'
function Users({ users }) {
    return (
        <div className="ui container">
            <div className="users-details">
                {
                    users ? users.map((i, index) => {
                        return (
                            <div key={index} >
                                <div>
                                    id: {i.id} name: {i.name} userName: {i.userName} country: {i.country}
                                </div>
                            </div>
                        )
                    }) : <Spinner />
                }
            </div>
        </div>
    );
}

export default Users;