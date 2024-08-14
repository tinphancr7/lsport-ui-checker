export enum FootballIncident {
	Corners = 1,
	ShotsOnTarget = 2,
	ShotsOffTarget = 3,
	Attacks = 4,
	DangerousAttacks = 5,
	YellowCards = 6,
	RedCards = 7,
	Penalties = 8,
	Goals = 9,
	Substitutions = 10,
	Possession = 11,
	Fouls = 12,
	FreeKicks = 13,
	GoalKicks = 14,
	Offsides = 15,
	BlockedShots = 16,
	ThrowIns = 17,
	WoodworkShots = 18,
	Clearance = 19,
	OwnGoal = 24,
	Score = 27,
	MissedShootoutPenalties = 40,
	GoalAttempts = 117,
	PlayerAssists = 1036,
}
export enum FootballPeriods {
	FirstHalf = 10, // 1st Half
	SecondHalf = 20, // 2nd Half
	FirstExtraHalf = 30, // Overtime 1st Half
	SecondExtraHalf = 35, // Overtime 2nd Half
	Penalties = 50, // Penalties
	FullTime = 100, // Full time
	FullTimeAfterOvertime = 101, // Full time after overtime
	FullTimeAfterPenalties = 102, // Full time after penalties
}
export enum FixtureScoreboardStatus {
	NotStartedYet = 1, // The event has not started yet
	InProgress = 2, // The event is live
	Finished = 3, // The event is finished
	Cancelled = 4, // The event has been cancelled
	Postponed = 5, // The event has been postponed
	Interrupted = 6, // The event has been interrupted
	Abandoned = 7, // The event has been abandoned
	CoverageLost = 8, // The coverage for this event has been lost
	AboutToStart = 9, // The event has not started but is about to (up to 30 minutes before)
}
