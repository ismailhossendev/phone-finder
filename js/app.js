// global variable
const loader = document.getElementById('loader');
const appleDefult = document.getElementById('home-catagory');
const showMore = document.getElementById('show-more');




const mainApi = async(phone,isLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phone}`
    const res = await  fetch(url)
    const data = await res.json()
    loader.classList.add('d-none')
    
    if (isLimit === true) {
        const limit = data.data.slice(0,8)
        displayData(limit)
    }
    else {
        const limit = data.data
        displayData(limit)
    }
}

const displayData = (phones) => {
    const cardContainer = document.getElementById('card-container');
    const noData = document.getElementById('no-data');
    if (phones.length === 0) {
        noData.classList.remove('d-none')
        showMore.classList.add('d-none')
    }
    else {
        noData.classList.add('d-none')
    }
    cardContainer.innerHTML = ``
    
    phones.forEach(phone => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card rounded-4 p-1">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button onclick="phoneDetailsApi('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">View Details</button>

        </div>
    </div>

        `
        cardContainer.appendChild(cardDiv)  
    });
};
const phoneDetailsApi = async(slug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${slug}`
    const res = await fetch(url);
    const data = await res.json();
    phoneDetails(data.data)
}
const phoneDetails = (phone) => {
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="phoneModalLabel">${phone.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Brand</th>
            <th scope="col">${phone.brand}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Model</td>
            <td>${phone.name}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Realese</td>
            <td>${phone.releaseDate}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Storage</td>
            <td>${phone.mainFeatures.storage}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Memory</td>
            <td>${phone.mainFeatures.memory}</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <th>Others</th>
            <th></th>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>GPS:${phone.others?.GPS},Bluetooth:${phone.others?.Bluetooth},</td>
            <td>WLAN:${phone.others?.WLAN},Radio:${phone.others?.Radio}</td>
          </tr>
        </tbody>
      </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
        
 `    
}
//  search sections
const serch = (lmt) => {
    mainApi(inputValue.value,lmt)
    appleDefult.innerHTML = `` 
    loader.classList.remove('d-none')
    showMore.classList.remove('d-none')
}

const inputValue = document.getElementById('src-input');
document.getElementById('src-btn').addEventListener('click', function () {
    serch(true)

})
inputValue.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        serch(true)
    }
});

const bydef = async(phn) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${phn}`
    const res = await  fetch(url)
    const data = await res.json()
    const fourPhone = data.data.slice(0, 4)
    fourPhone.forEach(phone => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        
        <div class="card rounded-4 p-1">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <button onclick="phoneDetailsApi('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneModal">View Details</button>

        </div>
    </div>

        `
        appleDefult.appendChild(cardDiv)
    })
}
bydef("iphone")
bydef("oppo")
bydef("samsung")

document.getElementById('more-btn').addEventListener('click', function () {
    serch()
    showMore.classList.add('d-none')
})