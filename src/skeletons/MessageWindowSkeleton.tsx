import FooterNav from "../components/FooterNav"

const MessageWindowSkeleton = () => {
    return (<div className="h-[90vh] bg-bg1 text-white flex flex-col animate-pulse p-4 space-y-4">

        {/* Header Loader */}
        <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-full bg-bg4"></div>
            <div className="flex-1 h-5 bg-bg4 rounded-full"></div>
            <div className="w-6 h-6 bg-bg1"></div>
        </div>

        {/* Members Info Loader */}
        <div className="bg-[#2C2C2C] rounded-xl p-4 space-y-3">
            <div className="h-4 w-1/3 bg-bg4 rounded"></div>
            <div className="w-full h-2 bg-bg4 rounded"></div>
        </div>

        {/* Messages Label Loader */}
        <div className="mx-auto w-24 h-4 bg-bg4 rounded-full"></div>

        {/* Messages List Loader */}
        <div className="flex-1 space-y-3 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-[70%] h-10 bg-bg4 rounded-full"></div>
            ))}
        </div>
        <div className="w-full h-12 bg-bg4 rounded-full"></div>
        <FooterNav />
    </div>)
}

export default MessageWindowSkeleton;