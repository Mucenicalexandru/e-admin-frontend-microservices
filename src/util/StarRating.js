export let StarRating = (totalStars) => {
    let elements = [];
    for(let i = 0; i < totalStars; i++){
        elements.push(<i className="fas fa-star fa-sm text-warning"> </i>);
    }
    for(let j = 0; j < 5 - totalStars; j++){
        elements.push(<i className="far fa-star fa-sm text-warning"> </i>);
    }
    return elements;
}