// cli tool to create new articles

import ulid from "ulid";
import { Command } from "commander";
import prompts from "prompts";
import { promises as fs } from "fs";
import path from "path";
import slugify from "slugify";

const cwd = process.cwd();

const program = new Command()
	.name("new-article")
	.description("create a new article")
	.version("0.0.1");

program
	.command("new")
	.description("create a new article")
	.action(async () => {
		const response = await prompts([
			{
				type: "text",
				name: "title",
				message: "Title",
				validate: (value) =>
					value.length > 0 ? true : "Title is required",
			},
			{
				type: "text",
				name: "subtitle",
				message: "Subtitle",
			},
			{
				type: "text",
				name: "date",
				message: "Date",
				initial: new Date().toISOString().split("T")[0],
			},
			{
				type: "confirm",
				name: "draft",
				message: "Draft",
				initial: false,
			},
			{
				type: "text",
				name: "description",
				message: "Description",
			},
			{
				type: "list",
				name: "tags",
				message: "Tags: delimit with comma",
				separator: ",",
				initial: "",
			},
		]);

		const id = ulid.ulid();
		console.log(`Creating article ${id}`);
		const slug = slugify(response.title, { lower: true });

		const mdmdx = await prompts({
			type: "select",
			name: "MDMDX",
			message: "MD or MDX?",
			choices: [
				{ title: "MD", value: "md" },
				{ title: "MDX", value: "mdx" },
			],
			initial: 0,
		});

		//get list of dirs in src/content

		const dirs = await fs.readdir(path.join(cwd, "src", "content"));

		const dir = await prompts({
			type: "select",
			name: "dir",
			message: "Choose a directory",
			choices: dirs
				.map((dir) => ({ title: dir, value: dir }))
				.concat({ title: "New", value: "new" }),
			initial: 0,
		});
		if (dir.dir === "new") {
			const newDir = await prompts({
				type: "text",
				name: "dir",
				message: "Enter a directory name",
			});
			await fs.mkdir(path.join(cwd, "src", "content", newDir.dir));
			dir.dir = newDir.dir;
		}

		const article = `---
title: "${response.title}"
subtitle: "${response.subtitle}"
date: ${response.date}
draft: ${response.draft}
description: "${response.description}"
tags:
${response.tags.map((tag) => `    - ${tag}`).join("\n")}
id: ${id}
---`;
		await fs.writeFile(
			path.join(cwd, "src", "content", dir.dir, `${slug}.${mdmdx.MDMDX}`),
			article
		);

		console.log("Done");
	});

program.parse();
