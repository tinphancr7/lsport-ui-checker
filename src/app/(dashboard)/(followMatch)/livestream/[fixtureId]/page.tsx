"use client";

import React, {useEffect, useState} from "react";
import Simulation from "./components/Simulation/Simulation";
import livestreamApi from "@/apis/livestream.api";
import fixtureApi from "@/apis/fixtures.api";
import Live from "./components/Live/Live";
import {useParams} from "next/navigation";
import LiveMatch from "./components/LiveMatch/LiveMatch";
import Error422 from "@/components/error-422";

const Livestream = ({}) => {
	const {fixtureId} = useParams();
	const [eventId, setEventId] = useState("");
	const [videoURL, setVideoURL] = useState("");
	const [status, setStatus] = useState("1");
	const getDataBookedEvent = async () => {
		try {
			const bookedEventResponse = await fixtureApi.getBookedEvent({
				fixtureId: fixtureId.toString(),
			});
			const eventId = bookedEventResponse?.data?.results?.id || "";
			setEventId(eventId);
		} catch (error) {
			console.log(error);
		}
	};

	const getDataLivestreamResponse = async () => {
		try {
			const livestreamResponse = await livestreamApi.getLivestream({
				fixtureId: fixtureId.toString(),
			});
			console.log(livestreamResponse);
			const videoURL = livestreamResponse?.data?.data?.videoURL || "";
			setStatus(livestreamResponse?.data?.Status || "1");
			setVideoURL(videoURL);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getDataBookedEvent();
		getDataLivestreamResponse();
	}, [fixtureId]);
	return (
		<div>
			<div>{videoURL && status != "3" && <Live url={videoURL} />}</div>

			<div className={`${videoURL ? "mt-10" : ""}`}>
				{eventId && status === "1" ? (
					<Simulation eventId={eventId} />
				) : (
					<LiveMatch eventId={eventId} />
				)}
			</div>
		</div>
	);
};

export default Livestream;
