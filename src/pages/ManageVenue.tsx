import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
import FooterNav from "../components/FooterNav";

const ManageVenue = () => {
  const { venueId } = useParams();

  const [slots, setSlots] = useState([
    { id: 1, time: "08:00 AM - 10:00 AM", booked: false },
    { id: 2, time: "10:00 AM - 12:00 PM", booked: true },
    { id: 3, time: "12:00 PM - 02:00 PM", booked: false },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newSlot, setNewSlot] = useState({ start: "", end: "" });
  const [editingSlot, setEditingSlot] = useState(null);

  // Add a new slot
  const handleAddSlot = () => {
    if (!newSlot.start || !newSlot.end) {
      alert("Please fill both start and end times.");
      return;
    }
    const newId = slots.length ? Math.max(...slots.map((s) => s.id)) + 1 : 1;
    setSlots([...slots, { id: newId, time: `${newSlot.start} - ${newSlot.end}`, booked: false }]);
    setNewSlot({ start: "", end: "" });
    setIsAdding(false);
  };

  // Edit existing slot
  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    const [start, end] = slot.time.split(" - ");
    setNewSlot({ start, end });
  };

  const handleSaveEdit = () => {
    setSlots((prev) =>
      prev.map((s) =>
        s.id === editingSlot.id ? { ...s, time: `${newSlot.start} - ${newSlot.end}` } : s
      )
    );
    setEditingSlot(null);
    setNewSlot({ start: "", end: "" });
  };

  // Delete slot
  const handleDeleteSlot = (id) => {
    if (window.confirm("Are you sure you want to delete this slot?")) {
      setSlots(slots.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg1 text-white font-display">
      <Helmet>
        <title>Manage Venue - NearMi</title>
      </Helmet>

      <main className="flex-1 p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Manage Venue #{venueId}</h2>
            <p className="text-sm text-gray-400">Add, edit or manage your booking slots</p>
          </div>
          <button
            onClick={() => {
              setEditingSlot(null);
              setIsAdding(true);
            }}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full font-semibold text-sm transition-transform hover:scale-105"
          >
            <FiPlus /> Add Slot
          </button>
        </div>

        {/* Slot Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          <AnimatePresence>
            {slots.map((slot) => (
              <motion.div
                key={slot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl relative ${
                  slot.booked ? "bg-gray-700" : "bg-green-800/60"
                }`}
              >
                <p className="font-semibold">{slot.time}</p>
                {slot.booked && (
                  <p className="text-xs text-red-300 mt-1">(Booked)</p>
                )}

                {/* Actions */}
                {!slot.booked && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleEditSlot(slot)}
                      className="p-1 bg-yellow-500/70 hover:bg-yellow-600 rounded-full"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="p-1 bg-red-500/70 hover:bg-red-600 rounded-full"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add or Edit Modal */}
        {(isAdding || editingSlot) && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1e1e1e] p-6 rounded-2xl w-[90%] max-w-sm space-y-4"
            >
              <h3 className="text-lg font-semibold">
                {editingSlot ? "Edit Slot" : "Add New Slot"}
              </h3>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-gray-400">Start Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 08:00 AM"
                    className="w-full p-2 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500"
                    value={newSlot.start}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, start: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">End Time</label>
                  <input
                    type="text"
                    placeholder="e.g., 10:00 AM"
                    className="w-full p-2 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500 focus:ring-2 focus:ring-green-500"
                    value={newSlot.end}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, end: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingSlot(null);
                    setNewSlot({ start: "", end: "" });
                  }}
                  className="flex items-center gap-1 text-gray-400 hover:text-gray-200"
                >
                  <FiX /> Cancel
                </button>
                <button
                  onClick={editingSlot ? handleSaveEdit : handleAddSlot}
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full font-semibold text-sm"
                >
                  <FiCheck /> {editingSlot ? "Save" : "Add"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <FooterNav />
    </div>
  );
};

export default ManageVenue;
