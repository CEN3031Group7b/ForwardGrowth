import React from 'react';
import logo from '../../assets/logo.svg';
import './Blog.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
//import twttr from '../../assets/index.html'

function Blog() {
    return (
		
        <div className="App">
			<h1>Blog Post Page</h1>
			<TwitterTimelineEmbed
			  sourceType="profile"
			  screenName="elonmusk"
			  options={{height: 500, width: 500}}
			/>
            <InstagramEmbed
			  url='https://www.instagram.com/elonmusk/?hl=en'
			  maxWidth={500}
			  hideCaption={false}
			  containerTagName='div'
			  protocol=''
			  injectScript
			  onLoading={() => {}}
			  onSuccess={() => {}}
			  onAfterRender={() => {}}
			  onFailure={() => {}}
			/>
        </div>
    );
}

export default Blog;
