import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await (
        await fetch("https://jsonplaceholder.typicode.com/users")
      ).json();
      setData(response);
    }
    getData();
  }, []);

  useEffect(() => {
    
    const timer = setTimeout(()=>{
      console.log(search);
      setFilterData(
        data.filter((user) =>
          user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        ),
      )},
      150,
    );
    console.log(filterData);
    return ()=> clearTimeout(timer);
  }, [search]);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div>
        {(search ? filterData : data).map((item) => {
          return <p key={item.id}>{item.name}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
