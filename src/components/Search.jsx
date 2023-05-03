import { useState, useEffect } from "react";
import { Toggle } from "./ui/toggle";
import { Search as SearchIcon } from "lucide-react";

import "react-cmdk/dist/cmdk.css";
import CommandPalette from "react-cmdk";

import algoliasearch from "algoliasearch";

import "/src/assets/Algolia-mark-circle-blue.svg";

const client = algoliasearch("3GWKJ0JPKW", "5d03bfda15113f49d9f4a8d80556d7a5");
const index = client.initIndex("petermills.co");

const CommandMenu = ({ searchClicked, setSearchClicked }) => {
	const [page, setPage] = useState("root");
	const [search, setSearch] = useState("");
	const [data, setData] = useState([]);

	useEffect(() => {
		if (searchClicked) {
			index.search(search, { hitsPerPage: 10 }).then(({ hits }) => {
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

							//redirect to url
							window.location.href = item.path;
						}}
					>
						{item.attributes.title}
					</CommandPalette.ListItem>
				))}

				<CommandPalette.ListItem
					key="root"
					onClick={() => {
						window.location.href = "https://algolia.com";
					}}
				>
					<img
						src="/src/assets/Algolia-mark-circle-blue.svg"
						width={25}
						height={25}
						alt="Algolia"
					/>
				</CommandPalette.ListItem>
			</CommandPalette.List>
		</CommandPalette>
	);
};

const Search = () => {
	const [searchClicked, setSearchClicked] = useState(false);

	const handleClick = () => {
		setSearchClicked(!searchClicked);
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
