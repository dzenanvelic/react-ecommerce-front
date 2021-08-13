import React from 'react'

function SearchForm({keyword, setKeyword}) {
    const handleSearch=(e)=>{
e.preventDefault()
setKeyword(e.target.value.toLowerCase())
 }
    return (
        <input type="search" placeholder="Filter" value={keyword} onChange={handleSearch} className="form-control" />
    )
}

export default SearchForm
