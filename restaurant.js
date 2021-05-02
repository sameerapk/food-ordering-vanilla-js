class Restaurant {
    getData = () => {
        let url = 'restaurants.json'
        return fetch(url)
    }
}
