import { FaSearch } from 'react-icons/fa';

interface SearchItemProps {
  search: string;
  setSearch: (search: string) => void;
}

const SearchItem: React.FC<SearchItemProps> = ({ search, setSearch }) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
      <span className='search'>
        <FaSearch />
      </span>
      <label 
        className='label'
        htmlFor="searchItem">Search</label>
      <input
        type="text"
        className='searchItem'
        id='searchItem'
        role="searchbox"
        placeholder='Search Item'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
