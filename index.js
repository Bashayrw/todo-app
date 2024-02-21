const todos = ["do the dishes","sleep" ]
const container = document.querySelector(".container")
const ul = document.createElement("ul")
container.appendChild(ul)
todos.forEach ((Element)=> { 
 const li = document.createElement("li")
 li.textContent=Element
 ul.appendChild(li)
})