import fs from "fs";
import fm from "front-matter";
import algoliasearch from "algoliasearch";
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const algoliaAdmin = process.env.ALGOLIA_ADMIN_KEY;

const client = algoliasearch(process.env.ALGOLIA_APP_ID, algoliaAdmin);

const index = client.initIndex("petermills.co");

const getPosts = () => {
	const folders = fs.readdirSync("./src/content");

	//from each folder get all md and mdx files
	const posts = folders
		.map((folder) => {
			const files = fs.readdirSync(`./src/content/${folder}`);
			const postFiles = files.filter(
				(file) => file.endsWith(".md") || file.endsWith(".mdx")
			);
			//read file contents
			const posts = postFiles.map((post) => {
				const postContent = fs.readFileSync(
					`./src/content/${folder}/${post}`,
					"utf8"
				);

				const { attributes, body } = fm(postContent);
				if (attributes.draft) return;
				if (!body) return;
				return {
					attributes,
					body,
					//path: `/${folder}/${post.replace(".md", "")`, this only works for md files for both:
					path: `/${folder}/${post.replace(
						/(\.md|\.mdx)$/,
						""
					)}`.replace("/main", ""),
					objectID: attributes.id,
				};
			});

			return posts;
		})
		.flat();

	return posts.filter((post) => post);
};

index.saveObjects(getPosts(), (err, content) => {
	if (err) throw err;
	console.log("Algolia import done");
});
