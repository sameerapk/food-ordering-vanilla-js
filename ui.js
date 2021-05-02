class UI {
    displayItems = (restaurants) => {
        let output = ''
        restaurants.forEach(restaurant => {
            output += `
            <div class='restaurant'>
                <div class='img-container' id=${restaurant.id}>
                    <img src="${restaurant.image}" alt ='restaurant' class='restaurant-img' />
                </div>
                <h3>${restaurant.name}</h3>
                <h4>Location - ${restaurant.location}</h4>
                <h4>Ratings - ${restaurant.rating}</h4>
                <h4>ETA - ${restaurant.ETA}</h4>
            </div>
            `
        })
        return output
    }
}