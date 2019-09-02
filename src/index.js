const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})
// OR HERE!

function addToyToDOM(toy) {
  div = document.querySelector("#toy-collection")
  newDiv = document.createElement("div")
  newDiv.classList.add("card")
  newDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes} Likes </p>
  <button class="like-btn" data-likes=${toy.likes} data-id=${toy.id}>Like <3</button>
  `
  div.appendChild(newDiv)
}

let loaded = window.addEventListener("DOMContentLoaded", function(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => {
    data.forEach(toy => addToyToDOM(toy))
  })
  .then(next => likes())
})

let form = document.querySelector("form")
form.addEventListener("submit", function(event){
  event.preventDefault()
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      name: document.querySelector("form").children[1].value,
      image: document.querySelector("form").children[3].value,
      likes: 0
    })
  })
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    if (data.name && data.image){addToyToDOM(data)}
  })
})

function likes(){
  let cards = document.querySelectorAll(".card")
  cards.forEach(function(card){
    card.addEventListener("click", function(){
      if (event.target.tagName = "BUTTON"){
        console.log(parseInt(event.target.dataset.likes) + 1)
        let id = event.target.dataset.id
        updateLikes(event, id)
      }
    })
  })
}

function updateLikes(event, id){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      likes: parseInt(event.target.dataset.likes) + 1
    })
  })
  .then(resp => resp.json())
  .then(data => {
    event.target.dataset.likes = data.likes
    event.target.parentElement.querySelector("p").innerText =
    `${data.likes} Likes`
  })
}
