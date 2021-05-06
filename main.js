const restaurantDom = document.querySelector('.restaurants-center')
const search = document.querySelector('.typeahead')
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

search.addEventListener('input', (e)=> {
    restaurant.getData()
    .then(res=>res.json())
    .then(data=> {
        let resBasedOnSearch = data.items.filter(item=>{
            return item.name.toLowerCase().includes(e.target.value)
        })
    this.outputSearchRes(resBasedOnSearch)
    })
})

outputSearchRes = (filteredItems) => {
    if(search.value !== '') {
        let output = ''

        filteredItems.map(item=>{
            output += `
                <p class='autocomplete'>${item.name}</p>
            `
        })
        document.querySelector('#target').addEventListener('click', (e)=>{
            search.value = e.target.innerText
            ui.displayItems(filteredItems)
            document.querySelector('#target').innerHTML = ''    
        })     
        document.querySelector('#target').innerHTML = output
        return
    }
    document.querySelector('#target').innerHTML = ''
}

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
