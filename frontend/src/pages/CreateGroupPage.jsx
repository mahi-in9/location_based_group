import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GroupForm from "./GroupForm";
import { createGroup } from "../app/slice/groupSlice";

const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.groups);
  const handleCreateGroup = async (data) => {
    const result = await dispatch(createGroup(data));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/groups");
    }
  };
  console.log(error);
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-5xl font-bold">Create Group</h1>
          <p className="text-zinc-400 mt-3">Build your own local community.</p>
        </div>
        <GroupForm onSubmit={handleCreateGroup} loading={loading} />
      </div>
    </div>
  );
};
export default CreateGroupPage;
