import React from 'react';
import logo from '../../assets/OrchardGroveLogo.png';
import './Blog.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';


class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            instagramlink: ''
        }
    }//Create an instagram link object
    getInsta() {
         

            fetch('/api/instagramlink')
                .then(res => {
                    return res.text();
                })
                .then(res => {
                    if (this.state.instagramlink !== res) {
                        this.setState({
                            instagramlink: res
                        })
                    }
                })


        
    }

    
    render() {
        this.getInsta(); //call instagram link

        const urlll = this.state.instagramlink; //make variable to call instagram link
        //console.log(urlll);
        if (urlll == '') {
            return(<div/>);
        } //returns nothing if instagram link does not exist
        return (
            <div className="App" > 
                <h1>Blog</h1>
                <div class="row"> {/*Twitter widget*/}
                    <h2>Check out our Twitter and Instagram!</h2>
                    <div class="column" >
                        <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName="ForwardGrowth0"
                            options={{ height: 840, width: 500 }}
                        />{/*sourceType sets widget to display timeline, screenName is Twitter handle
                         .https://www.npmjs.com/package/react-twitter-embed */}
                    </div>
                    <div class="column2">
                        {/*Instagram widget, edit link through admin dashboard
                         .https://www.npmjs.com/package/react-instagram-embed */}
                        <InstagramEmbed
                            url={urlll}
                            maxWidth={500}
                            hideCaption={false}
                            containerTagName='div'
                            protocol=''
                            injectScript
                            onLoading={() => { }}
                            onSuccess={() => { }}
                            onAfterRender={() => { }}
                            onFailure={() => { }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}



export default Blog;