export let AverageStarRating = (number) => {
    let elements = [];
    for(let i = 0; i < Math.floor(number); i++){
        elements.push(<i className="fas fa-star fa-sm text-warning"> </i>);
    }
    for(let j = 0; j < 5 - Math.floor(number); j++){
        elements.push(<i className="far fa-star fa-sm text-warning"> </i>);
    }
    return elements;
}