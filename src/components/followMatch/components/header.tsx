import Info from "./info";

const matchInfo: any = {
    homeTeam: {
        name: "Chelsea",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Chelsea_FC.svg/1200px-Chelsea_FC.svg.png",
        score: 4,
    },
    awayTeam: {
        name: "Manu",
        logo: "https://upload.wikimedia.org/wikipedia/vi/a/a1/Man_Utd_FC_.svg",
        score: 1,
    }
}

function Header() {
    return (  
        <div className="bg-light rounded-lg flex items-center justify-center gap-3 py-3">
            <Info item={matchInfo.homeTeam} reverse={false} />
            <span className="text-xl font-bold text-dark">:</span>
            <Info item={matchInfo.awayTeam} reverse={true} />
        </div>
    );
}

export default Header;