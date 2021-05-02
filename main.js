const restaurantDom = document.querySelector('.restaurants-center')

const restaurant = new Restaurant()

const ui = new UI()
window.onload = () => {
    restaurant.getData()
    .then(res => res.json())
    .then(data=>{
        let renderData = ui.displayItems(data.items)
        restaurantDom.innerHTML = renderData
    })
    .catch(err => console.log(err))
}
