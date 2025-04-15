const searchPhone = async (value,fromNxtBtn) => {
    const ref = await fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`)
    const data = await ref.json()
    const phones = data.data

    displayEachPhone(phones,fromNxtBtn)

}

const displayEachPhone = (phones,fromNxtBtn) => {
    console.log(phones.length)
    
    const showMoreSec = document.getElementById('showMoreSec')
    if (phones.length > 12 && !fromNxtBtn ) {
        phones = phones.slice(0, 12)
        showMoreSec.classList.remove('hidden')
    }
    else{
        showMoreSec.classList.add('hidden')
    }

    const displayPhoneSec = document.getElementById('display-phone-sec')
    displayPhoneSec.innerText = ''
    phones.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div')
        div.innerHTML = `
      <figure>
              <img
                src="${phone.image}"
                alt="Phones" />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>There are many variations of passages of available, but the majority have suffered</p>
              <div class="card-actions justify-center">
                <button onclick="newModal('${phone.slug}')" class="btn btn-primary">Show More</button>
              </div>
      
      `
        displayPhoneSec.appendChild(div)
        div.classList.add('bg-green-100', 'card', 'p-4', 'shadow-sm')

    });
    loading(false)
}

const searchButton = (fromNxtBtn) => {

    const inputField = document.getElementById('inputField')
    const inputValue = inputField.value
    loading(true)
    searchPhone(inputValue,fromNxtBtn)

}

const nxtBtn=()=>{
    searchButton(true)

}

const loading = (isLoading) => {
    const loadingScreen = document.getElementById('loadingScreen')

    if (isLoading) {
        loadingScreen.classList.remove('hidden')
    }
    else {
        loadingScreen.classList.add('hidden')
    }


}
const newModal = async (id) => {
    loading(true)
    const ref = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await ref.json()
    const phoneData = data.data

    handelDetails(phoneData)

}

const handelDetails = (phone) => {
    console.log(phone)
    my_modal_5.showModal()
    const modal = document.getElementById('modal')
    modal.innerHTML = `
            <img
                src="${phone.image}"
                alt="Phones" />

             <h3 class="text-lg font-bold">${phone.name}</h3>
             <p>${phone.mainFeatures.
            memory

        }</p>
             <p>${phone.mainFeatures.chipSet
        }</p>
            <p>${phone.mainFeatures.displaySize

        }</p>

    `
    loading(false)   
}
