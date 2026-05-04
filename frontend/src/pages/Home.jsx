import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div className=" bg-linear-to-br from-[#5d5f5c] via-[#191414] to-[#0F0F0F]">
        <div className="flex flex-col items-center justify-center pt-20 h-[80vh]">
          <h1 className="text-4xl font-bold mb-4 text-[#ad0202]  text-shadow-emerald-200 ">
            Welcome to Nearby Chat
          </h1>
          <p className=" text-[#F5F5F5] text-sm opacity-65">
            Join to chat with peoples around
          </p>

          <Link
            to="/dashboard"
            className="bg-[#ad0202] hover:text-black font-semibold active:scale-105 duration-300 px-4 py-2 rounded mt-4
         hover:bg-[#dc5a5a] text-white active:bg-[#b00000] cursor-pointer "
          >
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
