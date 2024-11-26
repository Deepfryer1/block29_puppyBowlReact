//NEW
import { useGetPuppiesQuery } from "./puppySlice";
import { useState } from "react";

/**
 * @component
 * Shows a list of puppies in the roster.
 * Users can select a puppy to see more information about it.
 */
export default function PuppyList({ setSelectedPuppyId }) {
  // TODO: Get data from getPuppies query
  //NEW
  const [searchInput, setSearchInput] = useState("");
  const { data: players = [], isLoading, error } = useGetPuppiesQuery();

  
    //find the searched puppy - using searchInput we want to match puppy with
  
  if (isLoading) {
    return <p>Loading puppies...</p>;
  }

  if (error) {
    return <p>Error loading puppies: {error.message}</p>;
  }
  const filteredPuppies = players.players.filter((puppy)=>
    puppy.name.includes(searchInput));

  //NEW
  return (
    <>
      <div id="searchbar">
        <form id="searchForm" onSubmit={(e) => {
          e.preventDefault(); 
          }}>
          <input
            type="text"
            value={searchInput}
            placeholder="Search for Puppies"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
        </form>
      </div>
      <article>
        <h2>Roster</h2>
        <ul className="puppies">
          {isLoading && <li>Loading puppies...</li>}
          {filteredPuppies.map((p) => (
            <li key={p.id}>
              <h3>
                {p.name} #{p.id}
              </h3>
              <figure>
                <img id="mapped" src={p.imageUrl} alt={p.name} />
              </figure>
              <button onClick={() => setSelectedPuppyId(p.id)}>
                See details
              </button>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
