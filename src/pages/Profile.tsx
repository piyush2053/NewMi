import React, { useState, useEffect } from "react";
import { Camera, MapPin, Calendar, Users, Trophy } from "lucide-react";

const useUser = () => ({
  user: {
    name: "Piyush",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFQqR79XKhXtg/profile-displayphoto-shrink_200_200/B4DZbI3ybFHAAc-/0/1747126790844?e=2147483647&v=beta&t=yWz9P1wpfn9XolGJzAK5QMpk6jrmHFd9QOy1jv-Jsnc",
    location: "Indore",
    joinDate: "Jan 2024",
    events_hosted: 24,
    followers: 22,
    events: 8,
    pastTrips: 12,
    connections: 156
  }
});

const Profile = () => {
  const { user } = useUser();
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    if (user) setIsUserLoading(false);
  }, [user]);

  if (isUserLoading) {
    return (
      <div className="min-h-screen bg-bg1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4CAF50]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg1 text-white pb-20">
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Profile</h1>
        <button className="p-2 hover:bg-bg4 rounded-lg transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Profile Card */}
      <div className="px-4 mt-4">
        <div className="bg-bg4 rounded-2xl p-6 relative">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#4CAF50]"
              />
              <button className="absolute bottom-0 right-0 bg-[#4CAF50] p-2 rounded-full shadow-lg hover:bg-[#45a049] transition">
                <Camera size={16} className="text-black" />
              </button>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-bold mt-4">{user.name}</h2>

            {/* Location & Join Date */}
            <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>Joined {user.joinDate}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4CAF50]">{user.events_hosted}</div>
                <div className="text-xs text-gray-400 mt-1">Event Hosted</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4CAF50]">{user.followers}</div>
                <div className="text-xs text-gray-400 mt-1">Followers</div>
              </div>
              <div className="w-px h-12 bg-gray-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#4CAF50]">{user.events}</div>
                <div className="text-xs text-gray-400 mt-1">Events Joined</div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="mt-6 w-full bg-[#4CAF50] text-black font-semibold py-3 rounded-full hover:bg-[#45a049] transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-4">
        {/* Past Trips Card */}
        <div className="bg-bg4 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-[#4CAF50] text-black text-xs font-bold px-2 py-1 rounded-full">
            {user.pastTrips}
          </div>
          <div className="flex flex-col items-center justify-center h-full pt-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] rounded-2xl flex items-center justify-center mb-3">
              <Trophy size={28} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-center">Past Events</p>
          </div>
        </div>
        <div className="bg-bg4 rounded-xl p-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-[#4CAF50] text-black text-xs font-bold px-2 py-1 rounded-full">
            {user.connections}
          </div>
          <div className="flex flex-col items-center justify-center h-full pt-2">
            <div className="w-16 h-16 bg-gradient-to-br from-[#00BCD4] to-[#0097A7] rounded-2xl flex items-center justify-center mb-3">
              <Users size={28} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-center">Connections</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-6">
        <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
        <div className="space-y-2">
          <button className="w-full bg-bg4 p-4 rounded-xl flex items-center justify-between hover:bg-opacity-80 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4CAF50] bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#4CAF50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-medium">Account Settings</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

      
          <button className="w-full bg-bg4 p-4 rounded-xl flex items-center justify-between hover:bg-opacity-80 transition">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium">Help & Support</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Footer Navigation Placeholder */}
      <div className="h-20"></div>
    </div>
  );
};

export default Profile;