import React, { useEffect, useState } from "react";

function App() {

const [dogs, setDogs] = useState([]);
const [doggo, setDoggo] = useState([]);

  useEffect(()=>{
    fetch(`http://localhost:3001/pups/`)
    .then(res=>res.json())
    .then(data=>{console.log(data);setDogs(data)})
  },[]);

  const displayDogs = dogs.map((dog)=>{
    return (
      <span onClick={()=>handleClick(dog)}>{dog.name}</span>
    )
  })

  function handleClick(dog){
    fetch(`http://localhost:3001/pups/${dog.id}`)
    .then(res=>res.json())
    .then(data=>{console.log(data); setDoggo(data)})}    

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">{displayDogs}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
            <img src={doggo.image} alt={doggo.name} />
        <h2>{doggo.name}</h2>
        <button>Good Dog!</button>
</div>
      </div>
    </div>
  );
}

export default App;
