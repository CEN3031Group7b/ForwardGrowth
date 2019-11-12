import React from 'react';
import logo from '../../assets/OrchardGroveLogo.png';
import './Blog.css';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import InstagramEmbed from 'react-instagram-embed';

function Blog() {
    return (
        <div className="App">
            <h1>Blog Page</h1>
            <div class="row">
			  <div class="column" >
				<h2>Check us out on Twitter</h2>
				<TwitterTimelineEmbed
                sourceType="profile"
                screenName="ForwardGrowth0"
                options={{ height: 500, width: 500 }}
				/> 
			  </div>
			  <div class="column">
				<h2>Check us out on Instagram</h2>
					<InstagramEmbed
					  url='https://www.instagr.am/p/B4S2p2vBE5L'
					  maxWidth={600}
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
			</div>
        </div>
    );
}

export default Blog;
