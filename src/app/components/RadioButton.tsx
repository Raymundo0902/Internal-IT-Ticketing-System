"use client";

interface RadioButtonProps {
	department: string;
}

export default function RadioButton({ department }: RadioButtonProps) {
	return (
		<li className="flex flex-1 w-40 rounded-md">
			<label
				htmlFor={`horizontal-list-radio-${department}`}
				className="flex w-full justify-center space-x-2 py-3 mb-1 mx-1 text-lg font-medium text-white bg-gradient-to-r from-red-500 via-red-500 to-red-600 hover:bg-gradient-to-br [&:has(:checked)]:bg-none [&:has(:checked)]:bg-gray-600 dark:[&:has(:checked)]:bg-gray-500 rounded-md "
			>
				<input
					required
					id={`horizontal-list-radio-${department}`}
					type="radio"
					value={department}
					name="department"
					className="mr-2 text-red-600 dark:bg-gray-600 dark:border-gray-500 "
				/>
				{department}
			</label>
		</li>
	);
}
