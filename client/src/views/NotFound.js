import React from 'react';

class NotFound extends React.Component {
        //Page not found HTML, matches rest of site
        render() {
                return (
                        <div className="App" >
                                <h1>Oops! Page not found</h1>
                                <p>Sorry, but the page you are looking for is not found. <br></br>
                                        Please make sure you have typed the correct URL.</p>
                        </div>
                );
        }
}


export default NotFound;
