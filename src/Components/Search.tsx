import { ChangeEvent, useContext, useState } from "react";

import CustomRadio from "./CustomRadio";
import { FaSearch } from "react-icons/fa";
import RadioProvider from "./RadioProvider";
import axios from "axios";
import { playerInterface } from "../interface";
import { radioContext } from "../Contexts/radioContext";
import styles from "../CSSModules/Search.module.css";

function Search() {
  const { setStation } = useContext(radioContext);
  const [dropdown, setDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchRadio, setSearchRadio] = useState<playerInterface[]>([]);

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
    setSearchInput(value);

    if (value.trim() === "") {
      setDropdown(false);
      return;
    }

    searchQuery(value);
    setDropdown(true);
  };

  const hanndleItemClick = (item: playerInterface) => {
    setSearchInput(item._source.title);
    setDropdown(false);
    setStation(item);
  };
  return (
    <div className={styles.searchCtn}>
      <div className={styles.inputBtnCtn}>
        <input
          type="text"
          placeholder="Search countries, places and radio stations"
          className={styles.textInput}
          value={searchInput}
          // onBlur={handleBlur}
          onChange={handleChange}
          onInput={handleChange}
          // onFocus={handleFocus}
        />
        <button type="submit" className={styles.btn}>
          <FaSearch />
        </button>
      </div>
      {dropdown && searchRadio.length >= 1 && (
        <ul className={styles.dropdown}>
          {searchRadio.map((item: playerInterface) => (
            <div
              className={styles.dropdownList}
              key={item._id}
              onClick={() => {
                hanndleItemClick(item);
              }}>
              {
                item._source.title

                // .replaceAll(/[0-9.]/g, "")
              }
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
