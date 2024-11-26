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
  const [puppies, setPuppies] = useState([]);
  const { data: players = [], isLoading, error } = useGetPuppiesQuery();

  const searchForPup = (searchInput) => {
    //find the searched puppy - using searchInput we want to match puppy with
  };

  if (isLoading) {
    return <p>Loading puppies...</p>;
  }

  if (error) {
    return <p>Error loading puppies: {error.message}</p>;
  }

  //NEW
  return (
    <>
      <div id="searchbar">
        <form id="searchForm" onSubmit={() => searchForPup(searchInput)}>
          <input
            type="text"
            value={searchInput}
            placeholder="Search for Puppies"
            onChange={(e) => setSearchInput(e.target.value)}
          ></input>
          <button onClick={() => searchForPup(searchInput)}>Search</button>
        </form>
      </div>
      <article>
        <h2>Roster</h2>
        <ul className="puppies">
          {isLoading && <li>Loading puppies...</li>}
          {puppies.map((p) => (
            <li key={p.id}>
              <h3>
                {p.name} #{p.id}
              </h3>
              <figure>
                <img src={p.imageUrl} alt={p.name} />
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
