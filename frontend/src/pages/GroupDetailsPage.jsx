import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSingleGroup } from "../app/slice/groupSlice";

const GroupDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { group, loading } = useSelector((state) => state.groups);

  console.log(id);
  useEffect(() => {
    try {
      dispatch(fetchSingleGroup(id));
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id]);

  console.log(group);

  if (loading || !group) {
    return (
      <div
        className="min-h-screen bg-black text-white flex items-center
justify-center"
      >
        group Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-80 overflow-hidden">
        <img
          src={group.image}
          alt={group.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justifybetween gap-4">
          <div>
            <h1 className="text-5xl font-bold">{group.name}</h1>
            <p className="text-zinc-400 mt-3 max-w-3xl">{group.description}</p>
          </div>
          <button className="bg-white text-black px-6 py-3 rounded-2xl fontsemibold hover:opacity-90">
            Join Group
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-2xl
p-6"
          >
            <h3 className="text-zinc-400 text-sm">Members</h3>
            <p className="text-3xl font-bold mt-2">
              {group.members?.length || 0}
            </p>
          </div>
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-2xl
p-6"
          >
            <h3 className="text-zinc-400 text-sm">Category</h3>
            <p className="text-2xl font-semibold mt-2">{group.category}</p>
          </div>
          <div
            className="bg-zinc-900 border border-zinc-800 rounded-2xl
p-6"
          >
            <h3 className="text-zinc-400 text-sm">Location</h3>
            <p className="text-2xl font-semibold mt-2">{group.locationName}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GroupDetailsPage;
