import React, { useEffect, useState } from "react";

function App() {

const [dogs, setDogs] = useState([]);
const [doggo, setDoggo] = useState([]);
const [filter, setFilter] = useState(true);
const [holdDogs, setHoldDogs] = useState([]);
const [render, setRender] = useState(true);

  useEffect(()=>{
    fetch(`http://localhost:3001/pups/`)
    .then(res=>res.json())
    .then(data=>{console.log(data);setDogs(data)})
  },[render]);

  const displayDogs = dogs.map((dog)=>{
    return (
      <span onClick={()=>handleClick(dog)}>{dog.name}</span>
    )
  })

  function handleClick(dog){
    fetch(`http://localhost:3001/pups/${dog.id}`)
    .then(res=>res.json())
    .then(data=>{console.log(data); setDoggo(data)})} 
    
    function handleGoodDog(){

      fetch(`http://localhost:3001/pups/${doggo.id}`,
      {method:'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify({
        id: doggo.id,
        name: doggo.name,
        isGoodDog: !doggo.isGoodDog,
        image: doggo.image
      })
    })
    .then(res=>res.json())
    .then(data => setDoggo(data));

    if(filter === true && doggo.isGoodDog === false){
      setRender(!render)
    }
  }
    function handleFilter(){
      setFilter(!filter);
      setHoldDogs(dogs);
      if(filter === true ){
        setDogs(dogs.filter(dog=>dog.isGoodDog === true))
      }
      else if(filter === false){
        setDogs(holdDogs);
      }
    }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilter}>Filter good dogs: {filter ? "OFF" : "ON"}</button>
      </div>
      <div id="dog-bar">{displayDogs}</div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
            <img src={doggo.image} alt={doggo.name} />
        <h2>{doggo.name}</h2>
        <button onClick={handleGoodDog}>{doggo.isGoodDog ? "Good Dog!" : "Bad Dog!" }</button>
</div>
      </div>
    </div>
  );
}

export default App;
