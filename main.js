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

document.querySelector('#sort').addEventListener('change', (e)=>{
    restaurant.getData()
    .then(res => res.json())
    .then(data=>{
        switch(e.target.value) {
            case 'ETA':
                data.items = data.items.sort((a,b)=>parseInt(a.ETA) - parseInt(b.ETA))
                break;
            case 'name':
                data.items = data.items.sort((a,b)=> a.name.localeCompare(b.name))
                break;
            case 'rating':
                data.items = data.items.sort((a,b)=>parseFloat(a.rating) - parseFloat(b.rating))
        }
        let renderData = ui.displayItems(data.items)
        restaurantDom.innerHTML = renderData
    })
})

document.querySelector('#filter').addEventListener('change', (e) => {
    restaurant.getData()
    .then(res=>res.json())
    .then(data=> {
        let filterTags = data.items.filter(item => item.tags.includes(e.target.value))
        restaurantDom.innerHTML =ui.displayItems(filterTags)
    })
})

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
}
