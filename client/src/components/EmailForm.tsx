import { FormControl, Input, useToast } from "@chakra-ui/react";

interface EmailFormProps {
	latitude: number;
	longitude: number;
}

export const EmailForm = ({ latitude, longitude }: EmailFormProps) => {
	const toast = useToast();
	const handleSubmit = (e: any) => {
		e.preventDefault();
		toast({
			position: "top-right",
			title: `New user created with email ${e.target.value}`,
			status: "success",
			duration: 2000,
			isClosable: true,
		});
		fetch(
			`/user/?email=${e.target.value}&latitude=${latitude}&longitude=${longitude}`,
			{ method: "POST" },
		).then((response) => response.json());
	};

	return (
		<FormControl
			position="absolute"
			top="1vh"
			left="1vw"
			background-color="white"
			boxSize="300px">
			<Input
				id="email"
				type="email"
				fontSize="smaller"
				placeholder="Enter email to receive providers updates"
				onKeyPress={(e) => {
					if (e.key === "Enter") handleSubmit(e);
				}}
			/>
		</FormControl>
	);
};
