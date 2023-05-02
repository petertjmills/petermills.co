import { useState, useEffect } from "react";
import { Toggle } from "./ui/toggle";
import { Search as SearchIcon } from "lucide-react";

import "react-cmdk/dist/cmdk.css";
import CommandPalette from "react-cmdk";

import algoliasearch from "algoliasearch";
const algoliaAppID = process.env.REACT_APP_ALGOLIA_APP_ID;
const algoliaSearchKey = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;

const client = algoliasearch(algoliaAppID, algoliaSearchKey);
const index = client.initIndex("eclare");

const CommandMenu = ({ searchClicked, setSearchClicked }) => {
  const [page, setPage] = useState("root");
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (searchClicked) {
      index.search(search, { hitsPerPage: 10 }).then(({ hits }) => {
        console.log(hits);
        setData(hits);
      });
    }
  }, [search, searchClicked]);

  return (
    <CommandPalette
      onChangeSearch={setSearch}
      onChangeOpen={setSearchClicked}
      search={search}
      isOpen={searchClicked}
      page={page}
    >
      <CommandPalette.List key="root" heading="Search Results">
        {data.map((item) => (
          <CommandPalette.ListItem
            key={item.objectID}
            onClick={() => {
              const tag = item.metadata.tags[0].sys.id;
			  const slug = item.fields.slug['en-US'];
			  const url = `/${tag}/${slug}`;

			  //redirect to url
			  window.location.href = url;
            }}
          >
			{item.fields.title['en-US']}
          </CommandPalette.ListItem>
        ))}

        
      </CommandPalette.List>
    </CommandPalette>
  );
};

const Search = () => {
  const [searchClicked, setSearchClicked] = useState(false);

  const handleClick = () => {
    setSearchClicked(!searchClicked);
    console.log(searchClicked);
  };

  return (
    <Toggle
      onPressedChange={handleClick}
      pressed={searchClicked}
      className={"align-center"}
    >
      <SearchIcon />
      {searchClicked && (
        <CommandMenu
          searchClicked={searchClicked}
          setSearchClicked={setSearchClicked}
        />
      )}
    </Toggle>
  );
};

export { Search };
