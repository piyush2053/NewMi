import { Tooltip, Progress } from "antd";

const ProgressBar = ({ attendees, eventData }:any) => {
    const max = eventData?.MaxMembers || 5;
    const current = attendees?.length || 0;

    const percent = (current / max) * 100;

    return (
        <div className="mx-10">
            
            <Tooltip title={`${current} joined / ${max-current} vacant [Total ${max}]`}>
                <Progress 
                    percent={percent} 
                    showInfo={false}
                    strokeColor="#4CAF50"
                    trailColor="#555"
                />
            </Tooltip>

        </div>
    );
};

export default ProgressBar;
