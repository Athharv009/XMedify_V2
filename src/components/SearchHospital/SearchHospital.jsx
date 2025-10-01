import styles from "./SearchHospital.module.css";

export default function SearchHospital({
  searchTerm,
  setSearchTerm,
  handleSearch,
}) {
  return (
    <div>
      <div>
        <form
          className={styles.content}
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className={styles.inputSearchHospital}>
            <input
              type="text"
              placeholder="Search By Hospital"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.btnSearch} type="submit" id="searchBtn">
            <img
              src={require("../../assets/search-icn-white.png")}
              alt="search"
              width="20"
              height="20"
            />
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
