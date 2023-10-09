import { Children } from "react";
import { parse } from "node-html-parser";

const ImageGallery = ({ children }) => {
    if (children.length) {
        return "null";
    }

    const html = children.props.value
    const images = Array.from(parse(html).querySelectorAll("img"));

    console.log(images)


	return (
		<div className="image-gallery">
			{images.map((child, idx) => {
                console.log(child.attrs.src)
				return (
					<div
						className="test"
					>
                        test
                    </div>
				);
			})}
		</div>
	);
};

export { ImageGallery };
