// src/pages/Group.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGroups,
  createGroup,
  fetchNearbyGroups,
} from "../redux/groupSlice";
import { joinGroup, leaveGroup, fetchUserGroups } from "../redux/memberSlice";

export default function Group() {
  const dispatch = useDispatch();

  const {
    groups,
    nearbyGroups,
    loading: groupLoading,
  } = useSelector((state) => state.groups);

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

  // ================= FETCH INITIAL DATA =================
  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUserGroups());
  }, [dispatch]);

  // ================= MEMBERSHIP MAP (O(1) lookup) =================
  const membershipMap = useMemo(() => {
    const map = new Set();
    myGroups.forEach((m) => {
      if (m.groupId?._id) {
        map.add(m.groupId._id);
      }
    });
    return map;
  }, [myGroups]);

  const isJoined = (groupId) => membershipMap.has(groupId);

  // ================= CREATE GROUP =================
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

  // ================= GEOLOCATION =================
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
      () => {
        setGeoLoading(false);
      },
    );
  };

  // ================= FETCH NEARBY =================
  const handleNearby = () => {
    if (!form.latitude || !form.longitude) return;

    dispatch(
      fetchNearbyGroups({
        latitude: form.latitude,
        longitude: form.longitude,
      }),
    );
  };

  // ================= JOIN / LEAVE =================
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

  // ================= RENDER =================
  return (
    <div style={{ padding: "20px" }}>
      <h2>Groups</h2>

      {/* ================= CREATE GROUP ================= */}
      <section>
        <h3>Create Group</h3>

        <form onSubmit={handleCreate}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <input
            placeholder="Latitude"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
          />

          <input
            placeholder="Longitude"
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
          />

          <button type="button" onClick={getCurrentLocation}>
            {geoLoading ? "Detecting..." : "Use My Location"}
          </button>

          <button type="submit">Create</button>
        </form>
      </section>

      {/* ================= NEARBY ================= */}
      <section>
        <h3>Nearby Groups</h3>

        <button onClick={handleNearby}>Find Within 5km</button>

        {nearbyGroups.length === 0 && <p>No nearby groups</p>}

        {nearbyGroups.map((g) => (
          <GroupCard
            key={g._id}
            group={g}
            isJoined={isJoined(g._id)}
            loading={actionLoadingId === g._id}
            onJoin={handleJoin}
            onLeave={handleLeave}
          />
        ))}
      </section>

      {/* ================= ALL GROUPS ================= */}
      <section>
        <h3>All Groups</h3>

        {(groupLoading || memberLoading) && <p>Loading...</p>}

        {groups.map((g) => (
          <GroupCard
            key={g._id}
            group={g}
            isJoined={isJoined(g._id)}
            loading={actionLoadingId === g._id}
            onJoin={handleJoin}
            onLeave={handleLeave}
          />
        ))}
      </section>
    </div>
  );
}

// ================= REUSABLE COMPONENT =================
function GroupCard({ group, isJoined, loading, onJoin, onLeave }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        margin: "10px 0",
        padding: "10px",
      }}
    >
      <p>
        <strong>{group.name}</strong>
      </p>
      <p>{group.description}</p>

      {isJoined ? (
        <button onClick={() => onLeave(group._id)} disabled={loading}>
          {loading ? "Leaving..." : "Leave"}
        </button>
      ) : (
        <button onClick={() => onJoin(group._id)} disabled={loading}>
          {loading ? "Joining..." : "Join"}
        </button>
      )}
    </div>
  );
}
