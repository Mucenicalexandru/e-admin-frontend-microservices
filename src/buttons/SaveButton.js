import React from 'react';

function SaveButton(props) {
    
    return (
        <button type="submit" className="btn btn-outline-success float-right margin-top-25">{props.name}</button>
    );
}

export default SaveButton;