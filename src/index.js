const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyCollectionDiv = document.getElementById('toy-collection')
const addToyForm = document.querySelector('.add-toy-form')

//Form visibility
addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

//All events

document.addEventListener("DomContentLoaded", fetchToysFromAPI())

toyCollectionDiv.addEventListener('click', fetchToUpdateOrDelete)

addToyForm.addEventListener('submit', fetchToCreateToy)

//GET Toys from API

   function fetchToysFromAPI() {
    fetch('http://localhost:3000/toys')

      .then(res => res.json())
      // .then(data => slapToysToTheDOM(data))
      .then(toyObjects=>toyObjects.forEach(slapToyToTheDOM))
  }


// CREATE new Toy

function fetchToCreateToy(event){
  event.preventDefault(); 
  debugger
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": `${event.target.name.value}`,
        "image": `${event.target.image.value}`,
        "likes": 0
      })
    })
      .then(res => res.json())
      .then(slapToyToTheDOM)
      event.target.reset()
      event.target.reset()
      
}

//SHOW Toy on DOM

function slapToyToTheDOM(toyObject) {

  toyCollectionDiv.innerHTML += `
      <div class ="card" data-id="${toyObject.id}">
      <h2>${toyObject.name}</h2>
      <img src ="${toyObject.image}" class="toy-avatar" />
      <p> ${toyObject.likes} Likes </p>
      <button class="like-btn"> Like <3</button>
      <button class="delete-btn"> Remove </button>
    </div>`

}


// UPDATE OR DELETE

// STEP 1 Select DOM element
// const likeButton = document.querySelector('.like-btn')

// STEP 2 Add event Listener to Selected element
//toyCollectionDiv.addEventListener('click', fetchToUpdateOrDelete)

// STEP 3 Write function to fetch

  function fetchToUpdateOrDelete(event){

      const id = event.target.parentElement.dataset.id
      const divCard = event.target.parentElement
  
      if (event.target.className ==='like-btn'){
    
          updateToy(id);
    
      }
      else if(event.target.className === 'delete-btn'){
    
          deleteToy(id)
          divCard.remove();
      }

  }

  // UPDATE Toy

  function updateToy(id){

     const atrLikes = event.target.previousElementSibling
     const likes = parseInt(atrLikes.innerText) + 1
     atrLikes.innerText = `${likes} Likes`

     fetch(`http://localhost:3000/toys/${id}`, {
         method: 'PATCH',
         headers:
         {
           "Content-Type": "application/json",
            Accept: "application/json"
         },
         body: JSON.stringify({
              "likes": likes
         })
     })
  }

  //DELETE toy

    function deleteToy(id){

      fetch(`http://localhost:3000/toys/${id}`,{
         method: 'DELETE'
         })
    }





