import React from 'react';
import Spinner from './Spinner'
function Users({ users, total }) {
    return (
        <div className="ui container">


            <div className="users-details">
                {
                    users ? users.map((i, index) => {
                        return (
                            <div key={index} >
                            <div className="ui segment">
                                    <div className="ui divided items">
                                        <div className="item">
                                            <div className="image">
                                                <div style={{
                                                    backgroundImage: `url(${i.avatar})`,
                                                    height: '150px',
                                                    width: '150px',
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat'
                                                }}></div>
                                            </div>
                                            <div className="content">
                                                <a className="header">Name: {i.name}</a>
                                                <div className="meta">
                                                    <span>Amount: {total[index]}</span>
                                                </div>
                                                <div className="description">

                                                    <p>Country: {i.country}</p>
                                                    <p>UserName: {i.userName}</p>
                                                    <p>Password: {i.password}</p>
                                                </div>
                                                <div className="extra">
                                                    <p>ID: {i.id}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* <div>
                                    id: {i.id} name: {i.name} userName: {i.userName} country: {i.country} total Amount: {total[index]}
                                </div>
                                <hr/> */}
                                    {/* {index<users.length-1 ? <hr/>:""} */}
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