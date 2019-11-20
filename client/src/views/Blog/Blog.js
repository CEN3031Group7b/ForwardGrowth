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
    }
    //  componentDidMount() {
    //    //fetch('/api/instagramlink')
    //    //    .then(res => res.json())
    //    //    .then(result => console.log(result)/*this.setState({ instagramlink: result })*/)
    //      fetch('/api/instagramlink')
    //        .then(res => {
    //            return res.text();
    //        })
    //        .then(res => {
    //            if (this.state.instagramlink !== res) {
    //                this.setState({
    //                    instagramlink: res 
    //                })
    //            }
    //        })


    //}
    getInsta() {
         
            //fetch('/api/instagramlink')
            //    .then(res => res.json())
            //    .then(result => console.log(result)/*this.setState({ instagramlink: result })*/)
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
        this.getInsta();

        const urlll = this.state.instagramlink;
        console.log(urlll);
        if (urlll == '') {
            return(<div/>);
        }
        return (
            <div className="App" >
                <h1>Blog</h1>
                <div class="row">
                    <h2>Check out our Twitter and Instagram!</h2>
                    <div class="column" >
                        {/* <h2>Check us out on Twitter</h2> */}
                        <TwitterTimelineEmbed
                            sourceType="profile"
                            screenName="ForwardGrowth0"
                            options={{ height: 840, width: 500 }}
                        />
                    </div>
                    <div class="column2">
                        {/* <h2>Check us out on Instagram</h2> */}
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