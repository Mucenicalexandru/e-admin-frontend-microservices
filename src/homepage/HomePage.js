import React from 'react';



function HomePage(props) {



    return (

        <div>
            <img className="card mx-auto shadow" src={`/images/homepage.jpeg`} alt={"Smart City Picture"} style={{"width" : "85%", "height" : "85%", "marginTop" : "25px", "borderRadius": "10px"}}/>
        </div>
    );
}

export default HomePage;