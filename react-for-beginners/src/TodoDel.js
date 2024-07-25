import { useState, useEffect } from "react"

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo((prev) => event.target.value);

  const delClick = (event) =>{
    setToDos((currentArray) => currentArray.filter((item, index) => index != event.target.getAttribute("data-len")));
  }

  const onSubmit = (event) => {
    event.preventDefault();
    if(toDo === "") return;
    setToDo("");
    setToDos(currentArray => [...currentArray, toDo])
  }
  useEffect(() => {
    console.log(toDos)
  }, [toDos])

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input 
          onChange={onChange} 
          value={toDo}
          type="text" 
          placeholder="Write your to do..."/>
        <button>Add To Do</button>
      </form>
      <hr/>
      <ul>
        {toDos.map((item, index) =>  (
            <li key={index}>{item} <button data-len={index} onClick={delClick}>삭제</button></li>
          ))}
      </ul>
    </div>
  );
}

export default App;
