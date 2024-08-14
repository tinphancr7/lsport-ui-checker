"use client";
import Error422 from "@/components/error-422";
import React, {useEffect, useState} from "react";

const LiveMatch = ({eventId}) => {
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const scriptId = "STATSCOREWidgetsEmbederScript";
		if (!document.getElementById(scriptId)) {
			window.STATSCOREWidgets = {};
			window.STATSCOREWidgets.onLoadCallbacks = [];
			window.STATSCOREWidgets.onLoad = function (callback) {
				window.STATSCOREWidgets.onLoadCallbacks.push(callback);
			};

			const script = document.createElement("script");
			script.src = "https://wgt-s3-cdn.statscore.com/bundle/Embeder.js";
			script.async = true;
			script.id = scriptId;
			script.addEventListener("error", (error) => {
				console.error("Script load error:", error);
				setHasError(true);
				for (
					let i = 0;
					i < window.STATSCOREWidgets.onLoadCallbacks.length;
					i++
				) {
					window.STATSCOREWidgets.onLoadCallbacks[i](error);
				}
			});
			try {
				document.body.appendChild(script);
			} catch (error) {
				console.error("Error appending script:", error);
				setHasError(true);
				setIsLoading(false);
			}
		}

		window.STATSCOREWidgets.onLoad((error) => {
			if (error) {
				console.error("Widget load error:", error);
				setHasError(true);
				setIsLoading(false);
				return;
			}
			try {
				new window.STATSCOREWidgets.Widget(
					document.getElementById("STATSCOREWidget172069609323210"),
					"667a652d4d3f464953936b4a",
					{language: "vi", eventId: eventId},
					{loader: {enabled: true}}
				);
			} catch (widgetError) {
				console.error("Widget instantiation error:", widgetError);
				setHasError(true);
			}
			setIsLoading(false);
		});
	}, [eventId]);

	useEffect(() => {
		console.log("isLoading", isLoading);
		const live = document.getElementById(
			"STATSCOREWidget172069609323210"
		)?.innerHTML;
		if (live?.includes("could not be loaded")) {
			setHasError(true);
		}
	}, [isLoading]);

	return (
		<>
			{hasError ? (
				<Error422 />
			) : (
				<div id="STATSCOREWidget172069609323210"></div>
			)}
		</>
	);
};

export default LiveMatch;
