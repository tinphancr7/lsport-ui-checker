"use client";
import React, {useEffect} from "react";

const Simulation = ({eventId}) => {
	useEffect(() => {
		const loadScript = () => {
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
					window.STATSCOREWidgets.onLoadCallbacks.forEach((callback) =>
						callback(error)
					);
				});

				document.body.appendChild(script);
			}
		};

		const initWidget = (error) => {
			if (error) {
				console.error(error);
				return;
			}

			new window.STATSCOREWidgets.Widget(
				document.getElementById("STATSCOREWidget17204074411643"),
				"667a65484d3f464953936b4b",
				{language: "vi", eventId: eventId},
				{loader: {enabled: true}}
			);
		};

		window.STATSCOREWidgets?.onLoad(initWidget);

		loadScript();
	}, [eventId]);
	return <div id="STATSCOREWidget17204074411643"></div>;
};

export default Simulation;
