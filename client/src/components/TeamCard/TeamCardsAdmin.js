import React from 'react';
import './TeamCards.css';
var Jimp = require('jimp')
const fs = require('fs');

const updateTile = (form) => {
    return fetch("/api/update_tile", {
        method: "POST",
        body: form
    }).then(response => response.json());
};
const deleteTile = (_id, name, token) => {
    return fetch("/api/delete_tile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id, name, token })
    }).then(response => response.json());
};

class TeamCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: [],
            photo: null,
            name: '',
            position: '',
            _id: '',
        };
    }
    componentDidMount() {
        fetch('/api/get_tile')
            .then(res => {
                return res.text();
            })
            .then(res => {
                //console.log('My data is:' + res);
                var obj = JSON.parse(res);
                this.setState({
                    people: obj
                })
            })
    }
    onChange = e => {

        this.setState({
            photo: e.target.files,
        })
    }
    setName = e => {

        this.setState({
            name: e.target.value,
        })
    }
    setPosition = e => {

        this.setState({
            position: e.target.value,
        })
    }
    refresh = e => {
        this.setState(this.state);
    }


    render() {
        const cards = this.state.people.map((person, index) => {


            return (
                <div key={index} class="card">
                    <img class="fit-picture" src={`data:${person.img.contentType};base64,${Buffer.from(person.img.data).toString('base64')}`} alt="" />
                        
                    <div class="container">
                        <h4>Name: </h4> <input type="text" defaultValue={person.name} onChange={this.setName}></input>
                        <h4>Position: </h4> <input type="text" defaultValue={person.position} onChange={this.setPosition}></input>
                        <h4>Replace photo of team member: </h4>
                        <input type="file" onChange={this.onChange} ref="NewPhoto" />
                        <button
                            onClick={() => {
                                var tileForm = new FormData();
                                //console.log("New name" + this.state.name);
                                //console.log("New position" + this.state.position);
                                //console.log("New Photo" + this.state.photo);
                                //console.log("ID: " + person._id);

                                if (this.state.photo != null) tileForm.append('file', this.state.photo[0]);
                                else tileForm.append('file', null);
                                // console.log("Photo" + this.state.photo[0]); //Object

                                if (this.state.name) tileForm.append('name', this.state.name);
                                else tileForm.append('name', person.name);

                                if(this.state.position) tileForm.append('position', this.state.position);
                                else tileForm.append('position', person.position)

                                tileForm.append('originalname', person.name);
                                tileForm.append('_id', person._id);
                                tileForm.append('token', localStorage.getItem('token'));

                                //for (var pair of tileForm.entries()) {
                                //   // console.log(pair[0] + ', ' + pair[1]);
                                //}
                                if (tileForm != null) {
                                    updateTile(tileForm).then(({ message }) => {
                                        alert(message);
                                        window.location.reload(false);
                                    });
                                }
                                else {
                                    alert("Cannot update card");                                
                                }
                            }}
                        >
                            Update Card
                    </button>
                        <button
                            onClick={() => {
                                if (person.name) {
                                    deleteTile(person._id, person.name, localStorage.getItem('token')).then(({ message }) => {
                                        alert(message);
                                        window.location.reload(false);
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