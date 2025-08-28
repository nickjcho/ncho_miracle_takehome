"use client";
import { useEffect } from "react";

// Home page - Landing page for dashboard application
const Home = () => {
  // Load all trials upon viewing home page
  useEffect(() => {
    const getTrials = async () => {
      await fetch('/api/trials');
    };

    getTrials();
  },[]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 px-4 text-center">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Welcome to Miracle
      </h1>
      <p className="text-xl md:text-2xl text-gray-600">
        Your one-stop platform for clinical trial management
      </p>
    </main>
  );
};

export default Home;
