// src/pages/Dashboard.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNearbyGroups } from "../app/slice/groupSlice";
import Logout from "../components/Logout";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { nearbyGroups, loading, error } = useSelector((state) => state.group);

  useEffect(() => {
    const coords = user?.location?.coordinates;

    if (!coords || coords.length !== 2) return;

    const [longitude, latitude] = coords;

    dispatch(fetchNearbyGroups({ latitude, longitude }));
  }, [dispatch, user]);

  console.log(user);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <Logout />
      </div>

      {/* Content */}
      <section>
        <h3 className="text-lg font-medium mb-4">Nearby Groups</h3>

        {/* Loading */}
        {loading && (
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-1/3 animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2 animate-pulse"></div>
            <div className="h-4 bg-gray-800 rounded w-1/4 animate-pulse"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-red-500 bg-red-100 p-3 rounded">{error}</div>
        )}

        {/* Empty State */}
        {!loading && !error && nearbyGroups.length === 0 && (
          <div className="text-gray-500">
            No nearby groups found. Try creating one.
          </div>
        )}

        {/* Data */}
        {!loading && !error && nearbyGroups.length > 0 && (
          <ul className="space-y-3">
            {nearbyGroups.map((group) => (
              <li
                key={group._id}
                className="p-4 bg-gray-900 shadow rounded border hover:shadow-md transition"
              >
                <h4 className="font-semibold">{group.name}</h4>
                {group.description && (
                  <p className="text-sm text-gray-600">{group.description}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
