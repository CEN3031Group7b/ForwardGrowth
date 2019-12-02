import React from 'react';
import './TeamCards.css';
import avatar from '../../assets/img_avatar.png'
const fs = require('fs');

//This file is intended to create a grid of cards pulled from the database

class TeamCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: []

        };
    }
    componentDidMount() {
        fetch('/api/get_tile')
            .then(res => {
                return res.text();
            })
            .then(res => {
                var obj = JSON.parse(res);
                this.setState({
                    people: obj
                })
            }).catch(err => { throw (err) })
    }

render() {
    const cards = this.state.people.map((person,index) => {
        
        

        return (
            <div key={index} class="card">
                <img src={`data:${person.img.contentType};base64,${Buffer.from(person.img.data).toString('base64')}`} alt="" />
                <div class="container">
                    <h4><b>{person.name}</b></h4>
                    <p>{person.position}</p>
                </div>
            </div>
        );
    });
        return (
            <div className="wrapper">
            
                {cards}
            </div>
            
        )
    }
};
export default TeamCards;


