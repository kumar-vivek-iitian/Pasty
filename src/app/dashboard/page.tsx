"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Paste = {
  title : string,
  id : string
}

const Dashboard = () => {
  // const {data, status} = useSession()
  const [loading, setLoading] = useState(true);
  const [pastes, setPastes] = useState<Paste[]>([]);

  useEffect(() => {
    const getPastes = async () => {
      try {
        const response = await fetch("/api/v1/get-pastes");
        if (response.ok) {
          const data = await response.json();
          console.log(data)
          setPastes(data);
          setLoading(false);
        } 
      } catch (err: unknown) {
        toast.error("Error occurred while fetching your pastes.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getPastes();
  }, []);

return (
  <div className="bg-black min-h-screen flex flex-col items-center py-12 px-4">
    <h3 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg mb-6">
      Your Pastes
    </h3>
    <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-lg">
      {loading ? (
        <p className="text-white">Loading...</p>
      ) : pastes?.length > 0 ? (
        <ul className="space-y-2">
          {pastes.map(paste => (
            <li key={paste.id}>
              <Link href={`/p/${paste.id}`} className="text-blue-400 hover:underline">
                {paste.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No Pastes.</p>
      )}
    </div>
  </div>
);

};

export default Dashboard;
