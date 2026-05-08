import { Link } from "react-router-dom";
const GroupCard = ({ group }) => {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflowhidden hover:border-zinc-700 transition-all">
      <img
        src={group.image}
        alt={group.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{group.name}</h2>
          <span
            className="text-xs bg-green-500/20 text-green-400 px-3 py-1
rounded-full"
          >
            Active
          </span>
        </div>
        <p className="text-zinc-400 text-sm line-clamp-2">
          {group.description}
        </p>
        <div className="flex items-center justify-between pt-2">
          <span className="text-zinc-500 text-sm">
            {group.members?.length || 0} members
          </span>
          <Link
            to={`/groups/${group._id}`}
            className="bg-white text-black px-4 py-2 rounded-xl text-sm fontmedium hover:opacity-90"
          >
            View Group
          </Link>
        </div>
      </div>
    </div>
  );
};
export default GroupCard;
