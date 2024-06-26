import React, { ChangeEvent, useState } from "react";
import styles from "../CSSModules/Search.module.css";
import { FaSearch } from "react-icons/fa";

const Search: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchRadio, setSearchRadio] = useState([
    {
      _id: "602749",
      _score: 165.90909,
      _source: {
        code: "US",
        subtitle: "Austin TX, United States",
        type: "channel",
        title: "KUTX FM 98.9",
        url: "/listen/kutx-98-9/vbFsCngB",
      },
    },
    {
      _id: "602748",
      _score: 165.90909,
      _source: {
        code: "US",
        subtitle: "Austin TX, United States",
        type: "channel",
        title: "KUTX FM 98.9",
        url: "/listen/kutx-98-9/vbFsCngB",
      },
    },
  ]);

  const searchQuery = (query: string) =>{
    
  }
  
  const handleFocus = () => {
    if (searchInput !== "") {
      setDropdown(true);
    }
  };

  const handleBlur = () => {
    setDropdown(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
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
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <button type="submit" className={styles.btn}>
          <FaSearch />
        </button>
      </div>
      {dropdown && (
        <ul className={styles.dropdown}>
          {searchRadio.map((item) => (
            <li className={styles.dropdownList} key={item._id}>
              {item._source.title.replaceAll(/[0-9.]/g, "")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
