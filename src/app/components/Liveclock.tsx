"use client";

import { useState, useEffect } from "react";

export default function LiveClock() {
	const [currentTime, setCurrentTime] = useState("");
	const formatter = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		hour12: true,
		timeZone: "America/Los_Angeles",
	});

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(formatter.format(new Date()));
		}, 1000); // Update every second
		return () => clearInterval(interval);
	});

	return (
		<div className="justify-self-center self-center font-bold pl-[10px]">
			{currentTime}
		</div>
	);
}
