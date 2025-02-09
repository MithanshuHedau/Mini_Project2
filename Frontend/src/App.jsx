import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

function App() {
  const [keywords, setKeywords] = useState("");
  const [rankedResumes, setRankedResumes] = useState([]);

  const shortlistResumes = async () => {
    const response = await fetch("http://localhost:5000/shortlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ keywords }),
    });
    const result = await response.json();
    setRankedResumes(result.ranked_resumes);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black flex flex-col items-center justify-center py-12 px-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 text-white rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold text-orange-500 mb-6"
        >
          Resume Shortlisting
        </motion.h1>
        <div className="relative w-full">
          <motion.input
            type="text"
            placeholder="Enter keywords..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="border-2 border-gray-600 p-3 rounded-full w-full pl-12 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            whileFocus={{ scale: 1.02 }}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <motion.button
          onClick={shortlistResumes}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-6 bg-orange-500 text-white py-3 rounded-full shadow-lg font-semibold transition duration-300 hover:bg-orange-600"
        >
          Shortlist Resumes
        </motion.button>

        {rankedResumes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-gray-800 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-4 text-orange-400">
              Ranked Resumes
            </h2>
            <ul className="space-y-3">
              {rankedResumes.map((resume, index) => (
                <motion.li
                  key={index}
                  className="bg-gray-700 p-4 rounded-lg shadow-md flex justify-between items-center text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div>
                    <span className="font-medium">{resume.name}</span>
                    <p className="text-sm text-gray-400">{resume.best_fit_role}</p>
                  </div>
                  <motion.span
                    className="text-orange-500 font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Score: {resume.score}
                  </motion.span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default App;
