import React from 'react';
import './TeamCards.css';
var Jimp = require('jimp')
const fs = require('fs');

const updateTile = (originalname, name, position, photo) => {
    return fetch("/api/update_tile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalname, name, position, photo })
    }).then(response => response.json());
};
const deleteTile = (name) => {
    return fetch("/api/delete_tile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
    }).then(response => response.json());
};

class TeamCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
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
            })
    }


    render() {
        const cards = this.state.people.map((person, index) => {


            return (
                <div key={index} class="card">
                    <img src={`data:${person.img.contentType};base64,${Buffer.from(person.img.data).toString('base64')}`} alt="" />
                    <div class="container">
                        <h4>Name: </h4> <textfield type="text" defaultValue={person.name} ref="NewName"></textfield>
                        <h4>Position: </h4> <textfield type="text" defaultValue={person.position} ref="NewPosition"></textfield>
                        <h4>Replace photo of team member: </h4>
                        <input type="file" onChange={this.onChange} ref="NewPhoto"/>
                        <button
                            onClick={() => {
                                if (this.refs.NewName.value && this.refs.NewPosition.value)
                                    updateTile(person.name,this.refs.NewName.value, this.refs.NewPosition.value,this.refs.NewPhoto.value).then(({ message }) => {
                                        alert(message);
                                    });
                                else alert("Ensure that the name and position of the team member is valid.");
                            }}
                        >
                            Update Card
                    </button>
                        <button
                            onClick={() => {
                                if (person.name) {
                                    deleteTile(person.name).then(({ message }) => {
                                        alert(message);
                                    });
                                }
                            }}
                        >
                            Delete Card
                    </button>
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