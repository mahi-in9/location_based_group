import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../app/slice/groupSlice";

function CreateGroup() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [geoLoading, setGeoLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);

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

  return (
    <>
      <section className="bg-gray-900 shadow rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold">Create Group</h3>

        <form onSubmit={handleCreate} className="grid gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              className="border p-2 rounded"
              placeholder="Latitude"
              value={form.latitude}
              onChange={(e) => setForm({ ...form, latitude: e.target.value })}
            />

            <input
              className="border p-2 rounded"
              placeholder="Longitude"
              value={form.longitude}
              onChange={(e) => setForm({ ...form, longitude: e.target.value })}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={getCurrentLocation}
              className="bg-gray-900 px-3 py-2 rounded hover:bg-gray-300"
            >
              {geoLoading ? "Detecting..." : "Use My Location"}
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default CreateGroup;
