import React from 'react';

function CancelButton(props) {
    return (
        <button className="btn btn-outline-danger margin-top-25">{props.name}</button>
    );
}

export default CancelButton;