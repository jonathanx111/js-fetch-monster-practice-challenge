const createMonsterDiv = document.querySelector('#create-monster')
const monsterContainer = document.querySelector('#monster-container')
const monsterForm = document.createElement('form')
const nameInput = document.createElement('input')
const ageInput = document.createElement('input')
const descriptionInput = document.createElement('input')
const createButton = document.createElement('button')
const backButton = document.querySelector('#back')
const forwardButton = document.querySelector("#forward")
let pageNumber = 1

nameInput.id = "name"
nameInput.placeholder = "name..."

ageInput.id = "age"
ageInput.placeholder = "age..."

descriptionInput.id = "description"
descriptionInput.placeholder = "description"

createButton.textContent = "Create"

monsterForm.id = "monster-form"
monsterForm.append(nameInput, ageInput, descriptionInput, createButton)
createMonsterDiv.append(monsterForm)


function fetchMonsters() {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
        .then(response => response.json())
        .then(resObj => {
            resObj.forEach(appendMonster)
        })
}

appendMonster = (monsterObj) => {
   
    monsterContainer.innerHTML += `
    <div>
        <h2>${monsterObj.name}</h2>
        <h4>Age: ${monsterObj.age}</h4>
        <p>${monsterObj.description}</p>
    </div>
    `
}

newMonsterEvent = (event) => {
    event.preventDefault()
    let formData = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }

    postNewMonster(formData)
}

postNewMonster = (newMonster) => {
    const configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newMonster)
    }

    fetch("http://localhost:3000/monsters", configObj)
        .then(response => response.json())
        .then(serverMonster => appendMonster(serverMonster))
        .then(toyForm.reset)
}

monsterForm.addEventListener('submit', newMonsterEvent)

increasePageNumber = (event) => {
    pageNumber += 1
    monsterContainer.innerHTML = ""
    fetchMonsters()
    console.log(pageNumber)
}
forwardButton.addEventListener("click", increasePageNumber)


decreasePageNumber = (event) => {
    if (pageNumber > 1) {
        pageNumber -= 1
    }
    
    monsterContainer.innerHTML = ""
    fetchMonsters()
    console.log(pageNumber)
}
backButton.addEventListener("click", decreasePageNumber)
fetchMonsters()