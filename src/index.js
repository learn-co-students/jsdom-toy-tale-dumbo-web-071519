const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const addNewToyForm = document.querySelector('.add-toy-form')
const toyContainer = document.querySelector('#toy-collection')
let addToy = false

function fetchAllToys() {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => renderToys(toys))
}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

function renderToys(toys) {
  toyContainer.innerHTML = ""
  toys.forEach((toy) => makeNewToy(toy))
}

function makeNewToy(obj){
  let newToy = `<div class="card" data-id="${obj.id}">
    <h2>${obj.name}</h2>
    <img class="toy-avatar" src="${obj.image}"/>
    <p>${obj.likes} likes</p>
    <button class="like-btn"> Like <3 </button>
  </div>`
  toyContainer.innerHTML += newToy
}

function addNewToy(e){
  e.preventDefault()

  const data = {
    'name': `${e.target.name.value}`,
    'image': `${e.target.image.value}`,
    'likes': 0
  }

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch('http://localhost:3000/toys', config).then(resp => resp.json()).then(toy => makeNewToy(toy))
}

function buttonClicked(e) {
  e.preventDefault()
  if (e.target.classList.contains('like-btn')) {
    likeEnvoked(e.target.parentElement)
  }
  
}

function likeEnvoked(toy) {
  let toyId = toy.dataset.id
  let likesUpdated = parseInt(toy.childNodes[5].innerText) + 1

  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      likes: likesUpdated
    })
  }

  fetch(`http://localhost:3000/toys/${toyId}`, config)
  .then(res => res.json())
  .then(json => {
    toy.childNodes[5].innerText = `${json.likes} likes`
    fetchAllToys
  })

}

addNewToyForm.addEventListener('submit', addNewToy)
toyContainer.addEventListener('click', buttonClicked)
fetchAllToys()