import React from "react";
import debounce from "lodash.debounce";
import styles from "./Search.module.scss";
import { useDispatch } from "react-redux";
import { setSearch } from "../../redux/slices/filter/slice";

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchInput = React.useMemo(
    () => debounce((str: string) => dispatch(setSearch(str)), 250),
    [setSearch]
  );

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    updateSearchInput(value);
  };

  const clearInput = () => {
    dispatch(setSearch(""));
    setValue("");
    updateSearchInput("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <svg
        className={`${styles.icon} ${styles["icon-search"]}`}
        height="512"
        viewBox="0 0 512 512"
        fill="#FFF"
        width="512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title />
        <path d="M456.69,421.39,362.6,327.3a173.81,173.81,0,0,0,34.84-104.58C397.44,126.38,319.06,48,222.72,48S48,126.38,48,222.72s78.38,174.72,174.72,174.72A173.81,173.81,0,0,0,327.3,362.6l94.09,94.09a25,25,0,0,0,35.3-35.3ZM97.92,222.72a124.8,124.8,0,1,1,124.8,124.8A124.95,124.95,0,0,1,97.92,222.72Z" />
      </svg>

      <input
        ref={inputRef}
        className={styles.input}
        placeholder="Поиск масок..."
        type="text"
        value={value}
        onChange={(e) => onChangeInput(e)}
      />

      {value && (
        <svg
          onClick={() => clearInput()}
          className={`${styles.icon} ${styles["icon-close"]}`}
          fill="none"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};
