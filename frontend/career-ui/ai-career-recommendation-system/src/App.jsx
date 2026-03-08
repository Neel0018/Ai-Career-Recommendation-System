import { useState } from "react";
import axios from "axios";

function App() {
  const [interest, setInterest] = useState("");
  const [performance, setPerformance] = useState("");
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched]=useState(false);

  const getCareer = async () => {
    // Basic validation
    if (!interest || !performance) {
      alert("Please select both an interest and a performance level.");
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const res = await axios.post("http://127.0.0.1:5000/recommend", {
        interest,
        performance,
      });
      setCareers(res.data);
    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to fetch data. Is your Flask backend running on port 5000?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <div className="bg-white shadow-md p-4 flex justify-between items-center px-10">
        <h1 className="text-xl font-bold text-indigo-600">AI Career System</h1>
        <span className="text-gray-500 font-medium">Smart Career Guidance</span>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">
        <h2 className="text-4xl font-bold">AI Career Recommendation System</h2>
        <p className="mt-3 text-lg opacity-90">
          Discover the best career path based on your interests and strengths
        </p>
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-6 -mt-10">
        
        {/* Input Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-700">
            Enter Your Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option value="" disabled>Select Interest</option>
              <option value="AI">AI</option>
              <option value="Web">Web</option>
              <option value="Security">Security</option>
              <option value="Programming">Programming</option>
            </select>

            <select
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={performance}
              onChange={(e) => setPerformance(e.target.value)}
            >
              <option value="" disabled>Select Performance</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
            </select>
          </div>

          <button
            onClick={getCareer}
            disabled={loading}
            className="mt-6 w-full md:w-auto bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400"
          >
            {loading ? "Analyzing..." : "Get Recommendation"}
          </button>
        </div>

        {/* Result Section */}
        {searched && !loading && careers.length === 0 && (
  <p className="text-center text-gray-500 mt-6">
    No matching career found.
  </p>
)}

        {careers.length > 0 && (
          <div className="mt-10 mb-10">
            <h3 className="text-2xl font-bold mb-6 text-gray-700">
              Recommended Careers
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              {careers.map((c, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition border border-gray-100">
                  <h4 className="text-xl font-bold text-indigo-600">{c.career}</h4>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {c.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
