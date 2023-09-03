import { ulid } from "ulid";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import { useEffect, useState } from "react";

import { useToast } from "./ui/use-toast";

const Ulid = () => {
	const [id, setId] = useState(ulid());
	const [copy, setCopy] = useState(false);
	const { toast } = useToast();

	useEffect(() => {
		if (copy) {
			toast({
				title: "Copied to clipboard",
				description: id,
			});
		}
	}, [copy]);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(id);
		setCopy(true);

		setTimeout(() => setCopy(false), 1000);
	};

	return (
		<div className="flex justify-center pt-5">
			<div className="flex flex-col justify-center w-1/2 gap-5">
				<Input value={id} onChange={()=>{}} className="align-center" />
				<Button
					onClick={() => {
						setId(ulid());
						copyToClipboard();
					}}
                    className="text-light"
				>
					Generate
				</Button>
			</div>
		</div>
	);
};

export default Ulid;
