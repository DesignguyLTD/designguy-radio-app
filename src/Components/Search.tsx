import React, { ChangeEvent, useState } from "react";
import styles from "../CSSModules/Search.module.css";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

interface searchItem {
  _id: string;
  _score: number;
  _source: {
    code: string;
    subtitle: string;
    type: string;
    title: string;
    url: string;
  };
}

const Search: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchRadio, setSearchRadio] = useState<searchItem[]>([]);

  const searchQuery = (query: string) => {
    axios
      .get(`/search?q=${query}`)
      .then((response) => {
        const { hits } = response.data.hits;

        setSearchRadio(hits);
      })
      .catch((err) => console.log(err));
  };

  // const handleFocus = () => {
  //   if (searchInput !== "") {
  //     setDropdown(true);
  //   }
  // };

  // const handleBlur = () => {
  //   setDropdown(false);
  // };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    searchQuery(value);
    setSearchInput(value);
    if (dropdown === false) {
      setDropdown(true);
    }
  };

  return (
    <div className={styles.searchCtn}>
      <div className={styles.inputBtnCtn}>
        <input
          type="text"
          placeholder="Search countries, places and radio stations"
          className={styles.textInput}
          // onBlur={handleBlur}
          onChange={handleChange}
          // onFocus={handleFocus}
        />
        <button type="submit" className={styles.btn}>
          <FaSearch />
        </button>
      </div>
      {dropdown && searchRadio.length >= 1 && (
        <ul className={styles.dropdown}>
          {searchRadio.map((item) => (
            <li className={styles.dropdownList} key={item._id}>
              {item._source.title
              // .replaceAll(/[0-9.]/g, "")
              }
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
