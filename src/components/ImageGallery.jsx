import { Children } from "react";
import { parse } from "node-html-parser";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const ImageGallery = ({ children }) => {
	const [open, setOpen] = useState(false);
	if (children.length) {
		return "null";
	}

	const html = children.props.value;
	const images = Array.from(parse(html).querySelectorAll("img"));
	const [selectedImage, setSelectedImage] = useState(images[0]);

	let col1 = [];
	let col2 = [];
	let col3 = [];

	if (html) {
		col1 = images.filter((image, index) => {
			if (index % 3 === 0) {
				return image;
			}
		});

		col2 = images.filter((image, index) => {
			if (index % 3 === 1) {
				return image;
			}
		});

		col3 = images.filter((image, index) => {
			if (index % 3 === 2) {
				return image;
			}
		});
	}

	const handleClick = (child) => {
		setOpen(true);
		setSelectedImage(child);
	};

	const getNextImage = () => {
		const index = images.findIndex(
			(obj) => obj.rawAttrs === selectedImage.rawAttrs
		);
		const nextIndex = index + 1;
		if (nextIndex < images.length) {
			setSelectedImage(images[nextIndex]);
		}
	};

	const getPrevImage = () => {
		const index = images.findIndex(
			(obj) => obj.rawAttrs === selectedImage.rawAttrs
		);
		const prevIndex = index - 1;
		if (prevIndex >= 0) {
			setSelectedImage(images[prevIndex]);
		}
	};

	return (
		<div className="grid grid-cols-3 no-type">
			<div className="flex flex-col">
				{col1.map((child, idx) => (
					<Image
						child={child}
						key={idx}
						onClick={() => handleClick(child)}
					/>
				))}
			</div>
			<div className="flex flex-col">
				{col2.map((child, idx) => (
					<Image
						child={child}
						key={idx}
						onClick={() => handleClick(child)}
					/>
				))}
			</div>
			<div className="flex flex-col">
				{col3.map((child, idx) => (
					<Image
						child={child}
						key={idx}
						onClick={() => handleClick(child)}
					/>
				))}
			</div>
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{selectedImage.attrs.alt}</DialogTitle>
						<div className="flex gap-2">
							<button onClick={getPrevImage}>
								<ArrowBigLeft />
							</button>
							<Image child={selectedImage} />
							<button onClick={getNextImage}>
								<ArrowBigRight />
							</button>
						</div>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
};

const Image = ({ child, onClick }) => {
	if (!child) return null;

	const a = child.attrs;
	return (
		<div onClick={onClick}>
			<img
				src={child.attrs.src}
				alt={a.alt}
				height={a.height}
				width={a.width}
				loading="lazy"
				decoding="async"
			/>
		</div>
	);
};

export { ImageGallery };
