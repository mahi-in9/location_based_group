import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createGroup, fetchGroups } from "../app/slice/groupSlice";

import {
  joinGroup,
  leaveGroup,
  fetchUserGroups,
} from "../app/slice/memberSlice";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { groups, loading } = useSelector((state) => state.group);

  const { myGroups, loading: memberLoading } = useSelector(
    (state) => state.member,
  );

  const [form, setForm] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [geoLoading, setGeoLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUserGroups());
  }, [dispatch]);

  const membershipMap = useMemo(() => {
    return new Set(myGroups.map((m) => m.groupId?._id || m.groupId));
  }, [myGroups]);

  const isJoined = (groupId) => membershipMap.has(groupId);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.latitude || !form.longitude) return;

    await dispatch(createGroup(form));

    setForm({
      name: "",
      description: "",
      latitude: "",
      longitude: "",
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) return;

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setGeoLoading(false);
      },
      () => setGeoLoading(false),
    );
  };

  const handleNearby = () => {
    if (!form.latitude || !form.longitude) return;

    dispatch(
      fetchGroups({
        latitude: form.latitude,
        longitude: form.longitude,
      }),
    );
  };

  const handleJoin = async (groupId) => {
    setActionLoadingId(groupId);
    await dispatch(joinGroup(groupId));
    setActionLoadingId(null);
  };

  const handleLeave = async (groupId) => {
    setActionLoadingId(groupId);
    await dispatch(leaveGroup(groupId));
    setActionLoadingId(null);
  };
  console.log(groups);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Groups</h2>

      {/* CREATE GROUP */}

      {/* NEARBY */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Nearby Groups</h3>

          <button
            onClick={handleNearby}
            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
          >
            Find Within 5km
          </button>
        </div>

        {groups.length <= 0 ? (
          <p className="text-gray-500">No nearby groups</p>
        ) : (
          groups.map((g) => (
            <GroupCard
              key={g._id}
              group={g}
              isJoined={isJoined(g._id)}
              loading={actionLoadingId === g._id}
              onJoin={handleJoin}
              onLeave={handleLeave}
            />
          ))
        )}
      </section>

      {/* ALL GROUPS */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">All Groups</h3>

        {(loading || memberLoading) && (
          <p className="text-gray-500">Loading...</p>
        )}

        {groups.length <= 0 ? (
          <p className="text-gray-500">No groups available</p>
        ) : (
          groups.map((g) => (
            <GroupCard
              key={g._id}
              group={g}
              isJoined={isJoined(g._id)}
              loading={actionLoadingId === g._id}
              onJoin={handleJoin}
              onLeave={handleLeave}
            />
          ))
        )}
      </section>
    </div>
  );
}

// ================= CARD =================
function GroupCard({ group, isJoined, loading, onJoin, onLeave }) {
  return (
    <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm">
      <div>
        <p className="font-semibold">{group.name}</p>
        <p className="text-sm text-gray-500">{group.description}</p>
      </div>

      {isJoined ? (
        <button
          onClick={() => onLeave(group._id)}
          disabled={loading}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
        >
          {loading ? "Leaving..." : "Leave"}
        </button>
      ) : (
        <button
          onClick={() => onJoin(group._id)}
          disabled={loading}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join"}
        </button>
      )}
    </div>
  );
}
