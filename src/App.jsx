import { useState, useEffect } from 'react'


function App() {

  const [data,setData] = useState([]);
  const [search,setSearch] = useState("");


  useEffect(()=>{
    async function getData(params) {
      const response = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()
      setData(response);
    }
    getData();
  },[]);

  useEffect(()=>{
    console.log(search);
  },[search])

  return (
    <div>
      <input type="text" value={search} onChange={e => {setSearch(e.target.value)}} />
      <div>
        {data.map((item)=>{
          return <p key={item.id}>{item.name}</p>
        })}
      </div>
    </div>
  )
}

export default App
