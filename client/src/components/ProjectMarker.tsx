import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverHeader,
	PopoverArrow,
	Divider,
	PopoverBody,
	Checkbox,
	Flex,
	Spacer,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";

interface providersType {
	name: string;
	description: string;
	lat: number;
	lng: number;
	last_updated: string;
}

export const providersMarker = ({
	name,
	description,
	last_updated,
}: providersType) => (
	<Popover>
		<PopoverTrigger>
			<InfoIcon w={3} h={3} color="red.500"></InfoIcon>
		</PopoverTrigger>
		<PopoverContent>
			<PopoverArrow />
			<PopoverHeader fontWeight="bold" fontSize="md" textAlign="left">
				<Flex>
					{name}
					<Spacer></Spacer>
					<Checkbox size="sm" on></Checkbox>
				</Flex>
			</PopoverHeader>
			<PopoverBody textAlign="left">{description}</PopoverBody>
			<Divider />
			<PopoverBody fontWeight="hairline" fontSize="smaller">
				Last updated: {last_updated}
			</PopoverBody>
		</PopoverContent>
	</Popover>
);
