import { Button } from "antd";
import Card from "antd/es/card/Card";
const LiveEventCard = ({ match, setSelectedMatch, setShowBetPopup }) => {
    return (
        <Card
            key={match.id}
            className="bg-white/10 backdrop-blur-md border border-white/20 shadow-md text-white rounded-xl cursor-pointer"
            onClick={() => setSelectedMatch(match)}
        >
            <div className="flex justify-between items-center mb-2">
                <div>
                    <div className="font-bold team-names">{match.teamA} vs {match.teamB}</div>
                    <div className="text-sm text-gray-400">{match.score}</div>
                    <span className={`text-xs ${match?.status === 'Live' ? 'text-green-400' : 'text-orange-500'}`}>{match?.status}</span>
                </div>
                <Button
                    type="primary"
                    className="bg-pBlue rounded-full place-bet-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMatch(match);
                        setShowBetPopup(true);
                    }}
                >
                    Place Order
                </Button>
            </div>
        </Card>
    )
}

export default LiveEventCard