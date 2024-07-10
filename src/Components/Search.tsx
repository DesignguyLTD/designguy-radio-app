import { ChangeEvent, useState, useContext } from "react";
import { PlayerContext } from  "../Contexts/playerContext";
import styles from "../CSSModules/Search.module.css";
import { FaSearch } from "react-icons/fa";
import { playerInterface } from "../interface";
import axios from "axios";

function Search() {
  const {setStation} = useContext(PlayerContext)
  const [dropdown, setDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchRadio, setSearchRadio] = useState<playerInterface[]>([]);

  const searchQuery = (query: string) => {
    axios
      .get(`https://radio.garden/api/search?q=${query}`)
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
  }
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
            <li className={styles.dropdownList} key={item._id} onClick={() => {
              hanndleItemClick(item)
              }}>
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
