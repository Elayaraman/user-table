import { useState, useEffect } from "react";
function App() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch,setDebouncedSearch]= useState("");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    async function getData() {
      const response = await (
        await fetch("https://jsonplaceholder.typicode.com/users")
      ).json();
      setData(response);
      return;
    }
    getData();
  }, []);

  const filteredData = data
    .filter((user) => user.name.toLowerCase().includes(debouncedSearch.toLowerCase()))
    .sort((a, b) => {
      return sort === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    useEffect(()=>{
      const timer = setTimeout(()=>{
        console.log(search)
        setDebouncedSearch(search)
      },300);
      return ()=> clearTimeout(timer);
    },[search])

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        name="sort"
        id=""
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
      </select>
      <div>
        {filteredData.map((item) => {
          return <p key={item.id}>{item.name}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
