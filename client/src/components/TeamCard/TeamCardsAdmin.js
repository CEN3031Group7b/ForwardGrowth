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
            photo: null,
            name: '',
            position:'',
        };
    }
    componentDidMount() {
        fetch('/api/get_tile')
            .then(res => {
                return res.text();
            })
            .then(res => {
                console.log('My data is:' + res);
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
    onChangename = e => {

        this.setState({
            name: e.target.text,
        })
    }
    onChangeposition = e => {

        this.setState({
            position: e.target.text,
        })
    }
    

    render() {
        const cards = this.state.people.map((person, index) => {


            return (
                <div key={index} class="card">
                    <img src={`data:${person.img.contentType};base64,${Buffer.from(person.img.data).toString('base64')}`} alt="" />
                    <div class="container">
                        <h4>Name: </h4> <input type="text" defaultValue={person.name} onChange={this.onChangename}></input>
                        <h4>Position: </h4> <input type="text" defaultValue={person.position} onChange={this.onChangeposition}></input>
                        <h4>Replace photo of team member: </h4>
                        <input type="file" onChange={this.onChange} ref="NewPhoto"/>
                        <button
                            onClick={() => {
                                var tileForm = new FormData();
                                // if((this.refs.NewName.value = null) && (this.refs.NewPosition.value = null))
                                //     alert("Ensure that the name and position of the team member is valid."); 
                                console.log("New name" + this.state.name);
                                console.log("New position" + this.state.position);
                                console.log("New Photo" + this.state.photo);

                                if(this.state.photo != null) tileForm.append('file', this.state.photo[0]);
                                else tileForm.append('file', null);
                                // console.log("Photo" + this.state.photo[0]); //Object

                                // if (this.refs.NewName.value) 
                                tileForm.append('name', this.refs.NewName.value);
                                // else tileForm.append('name', null);

                                // if(this.refs.NewPosition.value) 
                                tileForm.append('position', this.refs.NewPosition.value);
                                // else tileForm.append('position', null)

                                tileForm.append('originalname', person.name);

                                for (var pair of tileForm.entries()) {
                                    console.log(pair[0]+ ', ' + pair[1]); 
                                }

                                updateTile(tileForm).then(({ message }) => {
                                    alert(message);  
                                });
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