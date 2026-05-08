import { useState } from "react";

const GroupForm = ({ onSubmit, loading }) => {
  const [geoLoading, setGeoLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    locationName: "",
    latitude: null,
    longitude: null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    setGeoLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }));

        setGeoLoading(false);
      },
      (error) => {
        console.log(error);
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.latitude === null || formData.longitude === null) {
      alert("Location required");
      return;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      locationName: formData.locationName,

      location: {
        type: "Point",
        coordinates: [Number(formData.longitude), Number(formData.latitude)],
      },
    };

    onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-5
        bg-zinc-900
        border
        border-zinc-800
        p-8
        rounded-3xl
      "
    >
      <input
        type="text"
        name="name"
        placeholder="Group Name"
        onChange={handleChange}
        className="
          w-full
          bg-black
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3
        "
      />

      <textarea
        name="description"
        placeholder="Description"
        rows="5"
        onChange={handleChange}
        className="
          w-full
          bg-black
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3
        "
      />

      <input
        type="text"
        name="category"
        placeholder="Category"
        onChange={handleChange}
        className="
          w-full
          bg-black
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3
        "
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
        className="
          w-full
          bg-black
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3
        "
      />

      <input
        type="text"
        name="locationName"
        placeholder="Location Name"
        onChange={handleChange}
        className="
          w-full
          bg-black
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3
        "
      />

      <button
        type="button"
        onClick={getCurrentLocation}
        className="
          w-full
          bg-zinc-800
          py-3
          rounded-xl
          hover:bg-zinc-700
        "
      >
        {geoLoading ? "Detecting Location..." : "Use Current Location"}
      </button>

      {formData.latitude && formData.longitude && (
        <div className="text-sm text-green-500">
          Location captured successfully
        </div>
      )}

      <button
        disabled={loading}
        className="
          w-full
          bg-white
          text-black
          py-3
          rounded-xl
          font-semibold
          hover:opacity-90
          disabled:opacity-50
        "
      >
        {loading ? "Creating..." : "Create Group"}
      </button>
    </form>
  );
};

export default GroupForm;
