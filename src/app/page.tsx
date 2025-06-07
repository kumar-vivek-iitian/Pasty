import Navbar from "@/components/Navbar";
import { Geist_Mono } from "next/font/google";

const geist = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
});

const Home = () => {
  return (
    <div>
      <Navbar />
      <div
        className={`min-h-screen bg-black text-white flex items-center justify-center px-4 ${geist.className} tracking-tighter`}
      >
        <div className="text-center animate-fade-in">
          <h1 className="text-7xl font-extrabold text-white drop-shadow-glow mb-6">
            <span className="text-blue-400">P</span>asty
          </h1>
          <p className="text-2xl text-gray-300 max-w-xl mx-auto">
            Paste, save, and share your code with ease. Fast. Clean. Easy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
