import Restraunt from "./Restraunt";
import { useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import searchImg from "../assets/search.svg";
import useData from "../hooks/useData";
import useSearch from "../hooks/useSearch";

const Body = () => {
    const [query, setQuery] = useState("");
    const [seeAllRestaurants, filteredRestraunts, setFilteredRestraunts] =
        useData();
    return (
        <div className="body flex items-center flex-col">
            <div
                data-testid="search-div"
                className="w-mobile sm:w-tablet lg:w-pc pl-2 mt-6 mb-3"
            >
                <input
                    data-testid="search-input"
                    className="text-xs border px-2 py-1 mr-2 rounded outline-none"
                    placeholder="Search Restraunts"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    data-testid="search-btn"
                    onClick={() =>
                        useSearch(
                            seeAllRestaurants,
                            query,
                            setFilteredRestraunts
                        )
                    }
                    className="align-middle"
                >
                    <img src={searchImg} className="w-4" />
                </button>
            </div>
            <div
                data-testid="restraunt-card"
                className="allrestraunts grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 place-items-center w-mobile sm:w-tablet lg:w-pc gap-3"
            >
                {filteredRestraunts?.[0]
                    ? filteredRestraunts?.map((restraunt) => {
                          return (
                              <Link
                                  to={`/restraunt/${restraunt.data.id}`}
                                  key={restraunt.data.uuid}
                              >
                                  <Restraunt {...restraunt.data} />
                              </Link>
                          );
                      })
                    : Array(15)
                          .fill("")
                          .map((s, i) => <Shimmer key={i} />)}
            </div>
        </div>
    );
};

export default Body;
