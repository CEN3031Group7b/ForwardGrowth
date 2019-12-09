import React from 'react';
import './TeamCards.css';
var Jimp = require('jimp')
const fs = require('fs');

//requests to update and delete tiles and render existing the existing data of tiles
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

//team cards admin component to use in admin dashboard
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
    //show current data of tiles to later edit
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

    //used to upload photo
    onChange = e => {

        this.setState({
            photo: e.target.files,
        })
    }
    //set name and position of team member
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


    render() {
        //map to each person and put into cards const
        const cards = this.state.people.map((person, index) => {

            return (
                <div key={index} class="card">
                    <img class="fit-picture" src={`data:${person.img.contentType};base64,${Buffer.from(person.img.data).toString('base64')}`} alt="" />
                        
                    <div class="container">
                        {/* display current information in editable text input box */}
                        <h4>Name: </h4> <input type="text" defaultValue={person.name} onChange={this.setName}></input>
                        <h4>Position: </h4> <input type="text" defaultValue={person.position} onChange={this.setPosition}></input>
                        <h4>Replace photo of team member: </h4>
                        <input type="file" onChange={this.onChange} ref="NewPhoto" />
                        {/* Button to update cards */}
                        <button
                            onClick={() => {
                                var tileForm = new FormData();

                                // Update forms if the texts/photo are changed
                                // If not, keep previous data
                                if (this.state.photo != null) tileForm.append('file', this.state.photo[0]);
                                else tileForm.append('file', null);

                                if (this.state.name) tileForm.append('name', this.state.name);
                                else tileForm.append('name', person.name);

                                if(this.state.position) tileForm.append('position', this.state.position);
                                else tileForm.append('position', person.position)

                                tileForm.append('originalname', person.name);
                                tileForm.append('_id', person._id);
                                tileForm.append('token', localStorage.getItem('token'));

                                // Updata tile form and reload window
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
                        {/* Button to delete cards and reload page */}
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