import { useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const VenueSection = ({ hostedVenues, navigate }) => {
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [search, setSearch] = useState("");
    const maxVisible = 3;
    const visibleVenues = hostedVenues.slice(0, maxVisible);
    const remainingCount = hostedVenues.length - maxVisible;

    const filteredVenues = hostedVenues.filter((v) =>
        v.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <section className="p-3 bg-bg4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">
                Have a space for hosting events?{" "}
                <span className="text-[#29C9FF]">List it & earn money!</span>
            </h2>

            <div className="flex gap-4 mb-4 overflow-x-auto scrollbar-hide"  >
                <div
                    className="w-28 h-28 rounded-lg flex items-center justify-center cursor-pointer transform hover:scale-105 transition-transform duration-300 relative overflow-hidden bg-gradient-to-t from-[#0c2050] to-[#29C9FF] shadow-[#29C9FF]/40
 flex-shrink-0"
                    onClick={() => navigate("/add_venue")}
                >
                    <FiPlus size={32} color="white" />
                </div>
                {visibleVenues?.map((venue, index) => {
                    if (index === maxVisible - 1 && remainingCount > 0) {
                        return (
                            <motion.div
                                key="show-more"
                                className="w-28 h-28 rounded-lg overflow-hidden relative cursor-pointer shadow-lg transform hover:scale-105 transition-transform duration-300 flex items-center justify-center bg-black/40 backdrop-blur-sm text-white font-bold text-sm flex-shrink-0"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ opacity: 0.8 }}
                                onClick={() => setShowMoreModal(true)}
                            >
                                +{remainingCount} more
                            </motion.div>
                        );
                    }

                    return (
                        <div
                            key={venue.id}
                            className="w-28 h-28 rounded-lg overflow-hidden relative cursor-pointer shadow-lg transform hover:scale-105 transition-transform duration-300 flex-shrink-0"
                            onClick={() => navigate(`/manage-venue/${venue.id}`)}
                        >
                            <img
                                src={venue.img}
                                alt={venue.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-sm p-2 text-center font-semibold">
                                {venue.name}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {showMoreModal && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm scrollbar-hide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-bg1 w-11/12 max-w-md rounded-lg p-4 relative shadow-xl scrollbar-hide"
                            initial={{ y: -50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -50, opacity: 0 }}
                        >
                            <button
                                onClick={() => setShowMoreModal(false)}
                                className="absolute top-3 right-3 text-white text-lg scrollbar-hide"
                            >
                                <FiX />
                            </button>

                            <input
                                type="text"
                                placeholder="Search venues..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full mb-4 px-3 py-2 rounded-lg bg-black/20 text-white placeholder-gray-300 focus:outline-none"
                            />

                            <div className="max-h-80 overflow-y-auto scrollbar-hide">
                                {filteredVenues.length > 0 ? (
                                    filteredVenues.map((venue) => (
                                        <div
                                            key={venue.id}
                                            className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-white/10 rounded-lg p-2 transition"
                                            onClick={() => {
                                                navigate(`/manage-venue/${venue.id}`);
                                                setShowMoreModal(false);
                                            }}
                                        >
                                            <img
                                                src={venue.img}
                                                alt={venue.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                            <div className="text-white font-semibold">{venue.name}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-gray-300 text-center">No venues found</div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default VenueSection;
