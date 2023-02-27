const lodePPhone = async (searchText,dataLiment) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displayPhone(data.data,dataLiment);
}

const displayPhone = (phones,dataLiment)  =>{
    const phonContainer = document.getElementById('phone-container')
    phonContainer.innerHTML = ' '
    const showAll = document.getElementById('show-all')
    if(dataLiment && phones.length > 10){
        phones = phones.slice(0,10)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }


    // display no phone found
    const noPhone =  document.getElementById('no-found')
        if(phones.length === 0){
            noPhone.classList.remove('d-none')
        }
        else{
            noPhone.classList.add('d-none')
        }
        

    phones.forEach(phone =>{
        console.log(phone);
        // display all phone
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card p-3">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="showPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show details</button>
                        </div>
                      </div>

        `

        phonContainer.appendChild(div)
    })
    // stop loader
    toggleSpin(false)
}
const prossces = dataLiment=>{
    toggleSpin(true)
    const searchFile = document.getElementById('search-filde');
    const searchText = searchFile.value;
    lodePPhone(searchText,dataLiment)
}
// search btn
document.getElementById('search-btn').addEventListener('click',function(){
    prossces(10)
})
// search by enter btn
document.getElementById('search-filde').addEventListener('keypress',function(e){
    console.log(e.key);
    if(e.key === 'Enter'){
        prossces(10)
    }
})



const toggleSpin = isLodging =>{
    const loader = document.getElementById('loader')
    if(isLodging){
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none')
    }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
    prossces()
})



const showPhoneDetails = async id =>{
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url)
    const data = await res.json()
    displayPhoneDetaile(data.data);
}

const displayPhoneDetaile = data=>{
    console.log(data);
    document.getElementById('exampleModalLabel').innerText = data.name;
    document.getElementById('releaseDate').innerHTML = `
        <p>Release Date: ${data.releaseDate ? data.releaseDate : 'No Released Date found'}</p>
        <p>Main Features : ${data.mainFeatures ? data.mainFeatures.memory : 'No Released Date found'}</p>
        <p>Bluetooth: ${data.others ? data.others.Bluetooth: 'Bluetooth not found'}</p>
    `
}
