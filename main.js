const restaurantDom = document.querySelector('.restaurants-center')
let prev = 0;
let next = 6;
let total = 15
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

document.querySelector('#pagination').addEventListener('click', (e)=> {
    if(e.target.classList.contains('next') && next < total) {
        prev = prev + 6
        next = next + 6
        restaurant.getData()
        .then(res => res.json())
        .then(data => {
            restaurantDom.innerHTML = ui.displayItems(data.items, prev,next)
        })
    }
    else {
        if(prev > 0) {
            prev = prev - 6
            next = next - 6
            restaurant.getData()
            .then(res => res.json())
            .then(data => {
                restaurantDom.innerHTML = ui.displayItems(data.items, prev,next)
            })
        }
    }

})
