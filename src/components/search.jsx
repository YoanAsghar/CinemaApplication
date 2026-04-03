const Search = ({ searchTerm, setSearchTerm}) => {
  return (
    <div className="search">
      <div>
        <img src="./search.svg" alt="Search icon" />
        <input type="text"  placeholder="Search in all our catalogue" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
      </div>
    </div>
  )
}

export default Search
