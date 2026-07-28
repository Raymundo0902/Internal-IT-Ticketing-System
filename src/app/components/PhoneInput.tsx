import type React from "react";
import { useState } from "react";
import { PatternFormat, type NumberFormatValues } from "react-number-format";

// This is the functional component for our phone number input
const PhoneNumberInput: React.FC = () => {
	// Use a string to manage the phone number state, which is suitable for masked input
	const [phoneNumber, setPhoneNumber] = useState<string>("");

	// Define the handler for the `onValueChange` event
	const handleValueChange = (values: NumberFormatValues) => {
		// The `values` object includes:
		// - `formattedValue`: The formatted value with the mask (e.g., "(123) 456-7890")
		// - `value`: The raw, unformatted numeric string (e.g., "1234567890")
		// - `floatValue`: The numeric representation (for this use case, a string is better)

		setPhoneNumber(values.value);
	};

	return (
		<div className="flex-1/2">
			<label
				htmlFor="phone"
				className="block  text-sm font-bold text-gray-900 dark:text-white"
			>
				Phone Number:
			</label>
			<PatternFormat
				required
				id="phone"
				name="phone"
				format="(###) ###-####" // The desired format pattern
				mask="_" // Placeholder for digits not yet entered
				value={phoneNumber} // Controlled component value
				onValueChange={handleValueChange} // Handler for value changes
				type="tel" // Use the "tel" type for mobile-friendly keyboards
				placeholder="(123) 456-7890"
				className="grow block w-full p-2 mb-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-900 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-blue-500" // Add your own custom styling
			/>
			{/* Optional: Display the raw and formatted values for debugging */}
		</div>
	);
};

export default PhoneNumberInput;
