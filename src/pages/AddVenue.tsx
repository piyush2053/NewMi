import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FiUploadCloud, FiMapPin } from "react-icons/fi";
import FooterNav from "../components/FooterNav";

const AddVenue = () => {
    const [placeName, setPlaceName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [location, setLocation] = useState<any>(null);
    const [loadingLocation, setLoadingLocation] = useState(false);

    // // Handle drag/drop or select
    // const handleImageUpload = (e) => {
    //     const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    //     if (file) {
    //         setImage(file);
    //         setPreview(URL.createObjectURL(file));
    //     }
    // };

    // const handleDragOver = (e) => e.preventDefault();
    // const handleDrop = (e) => {
    //     e.preventDefault();
    //     handleImageUpload(e);
    // };

    // Get current location
    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation not supported by your browser.");
            return;
        }

        setLoadingLocation(true);
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                setLocation({ latitude, longitude });

                // Reverse geocode using OpenStreetMap Nominatim
                fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
                    .then((res) => res.json())
                    .then((data) => setAddress(data.display_name || ""))
                    .catch(() => alert("Unable to fetch address."))
                    .finally(() => setLoadingLocation(false));
            },
            () => {
                alert("Location access denied.");
                setLoadingLocation(false);
            }
        );
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!placeName || !description || !image || !address) {
            alert("Please fill all fields and upload an image.");
            return;
        }

        console.log({
            placeName,
            description,
            address,
            location,
            image,
        });

        alert("Venue submitted successfully!");
    };

    return (
        <div className="min-h-screen flex flex-col bg-bg1 text-white font-display">
            <Helmet>
                <title>Add Venue - NearMi</title>
            </Helmet>

            <main className="flex-1 p-4 space-y-6">
                <h2 className="text-xl font-bold">Add Your Venue</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Place Name */}
                    <div>
                        <label className="block text-sm mb-2">Place Name</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                            placeholder="e.g., Carlton Banquet Hall"
                            value={placeName}
                            onChange={(e) => setPlaceName(e.target.value)}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm mb-2">Description</label>
                        {/* <textarea
                            className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CAF50] resize-none"
                            placeholder="e.g., This is a Turf (Cricket Box)"
                            rows="3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        /> */}
                    </div>

                    {/* Image Upload */}
                    {/* <div
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        className="border-2 border-dashed border-gray-500 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer relative"
                        onClick={() => document.getElementById("venueImageInput").click()}
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        ) : (
                            <>
                                <FiUploadCloud size={40} />
                                <p className="text-gray-300">Drag & Drop or Click to Upload</p>
                            </>
                        )}
                        <input
                            type="file"
                            id="venueImageInput"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div> */}

                    {/* Location */}
                    <div>
                        <label className="block text-sm mb-2">Venue Location</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                className="w-full p-3 rounded-lg bg-[#2C2C2C] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
                                placeholder="Enter or detect location"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            {/* <button
                                type="button"
                                onClick={getLocation}
                                className="px-3 rounded-lg bg-green-600 flex items-center justify-center"
                            >
                                {loadingLocation ? (
                                    <span className="animate-pulse">...</span>
                                ) : (
                                    // <FiMapPin size={20} />
                                )}
                            </button> */}
                        </div>
                        {location && (
                            <p className="text-xs mt-1 text-gray-400">
                                📍 Lat: {location.latitude.toFixed(4)}, Lon:{" "}
                                {location.longitude.toFixed(4)}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="bg-[#4CAF50] transform transition-transform duration-200 hover:scale-110 relative py-3 rounded-full text-bg1 px-5 font-semibold text-sm hover:bg-[#45a049] transition-colors"
                    >
                        Submit Venue
                    </button>
                </form>
            </main>

            <FooterNav />
        </div>
    );
};

export default AddVenue;
