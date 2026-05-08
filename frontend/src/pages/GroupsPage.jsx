import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../app/slice/groupSlice";
import GroupCard from "../components/group/GroupCard";
import GroupSkeleton from "../components/group/GroupSkelton";

const GroupsPage = () => {
  const dispatch = useDispatch();

  const { groups, loading } = useSelector((state) => state.groups);

  const [search, setSearch] = useState("");

  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  const [locationError, setLocationError] = useState("");

  // ASK LOCATION ACCESS
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setCoordinates({
          latitude,
          longitude,
        });
      },
      (error) => {
        setLocationError(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  }, []);

  // FETCH GROUPS AFTER LOCATION
  useEffect(() => {
    if (coordinates.latitude && coordinates.longitude) {
      dispatch(
        fetchGroups({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }),
      );
    }
  }, [coordinates, dispatch]);

  console.log(groups);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold">Groups</h1>

            <p className="text-zinc-400 mt-2">
              Discover nearby communities and interest-based groups.
            </p>

            {locationError && (
              <p className="text-red-500 mt-2 text-sm">{locationError}</p>
            )}
          </div>

          <input
            type="text"
            placeholder="Search groups..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-xl
              px-4
              py-3
              outline-none
              w-full
              md:w-96
            "
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <GroupSkeleton key={index} />
            ))}

          {!loading &&
            groups?.map((group) => <GroupCard key={group._id} group={group} />)}
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
