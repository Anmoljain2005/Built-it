import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8000/api/";

const BATCH_OPTIONS = ["All Batches", "1st Year", "2nd Year", "3rd Year", "4th Year"];
const BRANCH_OPTIONS = ["All Branches", "CSE", "MECH", "CIVIL", "EE", "EP", "SSE", "MEMS", "MC", "CHE"];
const DEGREE_OPTIONS = ["B.Tech", "MTech", "MSC", "PHD"];

const EditPositionForm = ({ position, onPositionUpdated, onCancel, electionId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [batchRestriction, setBatchRestriction] = useState([]);
  const [branchRestriction, setBranchRestriction] = useState([]);
  const [degreeRestriction, setDegreeRestriction] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (position) {
      setTitle(position.title || "");
      setDescription(position.description || "");
      setBatchRestriction(
        Array.isArray(position.batch_restriction) ? position.batch_restriction : []
      );
      setBranchRestriction(
        Array.isArray(position.branch_restriction) ? position.branch_restriction : []
      );
      setDegreeRestriction(
        Array.isArray(position.degree_restriction) ? position.degree_restriction : []
      );
    }
  }, [position]);

  const handleCheckboxChange = (value, selectedList, setSelectedList, allOption) => {
    if (value === allOption) {
      if (selectedList.includes(allOption)) {
        setSelectedList([]);
      } else {
        setSelectedList([allOption]);
      }
    } else {
      if (selectedList.includes(value)) {
        setSelectedList(selectedList.filter((item) => item !== value));
      } else {
        setSelectedList([...selectedList.filter((item) => item !== allOption), value]);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedPosition = {
      election: parseInt(electionId),
      title,
      description,
      batch_restriction: batchRestriction.length ? batchRestriction : ["All Batches"],
      branch_restriction: branchRestriction.length ? branchRestriction : ["All Branches"],
      degree_restriction: degreeRestriction.length ? degreeRestriction : ["All Degrees"],
    };

    console.log("Updating position:", updatedPosition);

    try {
      await axios.put(
        `${API_URL}elections/${electionId}/positions/${position.id}/`,
        updatedPosition,
        { withCredentials: true }
      );
      toast.success("Position updated successfully!");
      onPositionUpdated();
    } catch (error) {
      console.error("Error updating position:", error);
      toast.error(error.response?.data?.detail || "Error updating position");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 border-2 border-yellow-300">
      <h2 className="text-xl font-bold mb-4">Edit Position</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Position title"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Position description"
            rows="3"
          />
        </div>

        {/* Degree Restriction */}
        <div>
          <label className="block font-medium mb-1">Degree Restriction</label>
          <div className="grid grid-cols-2 gap-2">
            {DEGREE_OPTIONS.map((degree) => (
              <label key={degree} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={degreeRestriction.includes(degree)}
                  onChange={() => handleCheckboxChange(degree, degreeRestriction, setDegreeRestriction, "All Degrees")}
                  className="mr-2"
                />
                {degree}
              </label>
            ))}
          </div>
        </div>

        {/* Batch Restriction */}
        <div>
          <label className="block font-medium mb-1">Batch Restriction</label>
          <div className="grid grid-cols-2 gap-2">
            {BATCH_OPTIONS.map((batch) => (
              <label key={batch} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={batchRestriction.includes(batch)}
                  onChange={() => handleCheckboxChange(batch, batchRestriction, setBatchRestriction, "All Batches")}
                  className="mr-2"
                />
                {batch}
              </label>
            ))}
          </div>
        </div>

        {/* Department Restriction */}
        <div>
          <label className="block font-medium mb-1">Department Restriction</label>
          <div className="grid grid-cols-2 gap-2">
            {BRANCH_OPTIONS.map((branch) => (
              <label key={branch} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={branchRestriction.includes(branch)}
                  onChange={() => handleCheckboxChange(branch, branchRestriction, setBranchRestriction, "All Branches")}
                  className="mr-2"
                />
                {branch}
              </label>
            ))}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Position"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditPositionForm;
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API_URL = "http://localhost:8000/api/";

// const BATCH_OPTIONS = ["All Batches", "1st Year", "2nd Year", "3rd Year", "4th Year"];
// const BRANCH_OPTIONS = ["All Branches", "CSE", "MECH", "CIVIL", "EE", "EP", "SSE", "MEMS", "MC", "CHE", "MSC", "PHD", "MTech"];

// const EditPositionForm = ({ position, onPositionUpdated, onCancel, electionId }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [maxCandidates, setMaxCandidates] = useState(1);
//   const [maxVotes, setMaxVotes] = useState(1);
//   const [batchRestriction, setBatchRestriction] = useState([]);
//   const [branchRestriction, setBranchRestriction] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (position) {
//       setTitle(position.title || "");
//       setDescription(position.description || "");
//       setMaxCandidates(position.max_candidates || 1);
//       setMaxVotes(position.max_votes_per_voter || 1);
//       setBatchRestriction(
//         Array.isArray(position.batch_restriction)
//           ? position.batch_restriction
//           : typeof position.batch_restriction === "string"
//           ? position.batch_restriction.split(",")
//           : []
//       );
//       setBranchRestriction(
//         Array.isArray(position.branch_restriction)
//           ? position.branch_restriction
//           : typeof position.branch_restriction === "string"
//           ? position.branch_restriction.split(",")
//           : []
//       );
//     }
//   }, [position]);

//   const handleCheckboxChange = (value, selectedList, setSelectedList, allOption) => {
//     if (value === allOption) {
//       if (selectedList.includes(allOption)) {
//         setSelectedList([]);
//       } else {
//         setSelectedList([allOption]);
//       }
//     } else {
//       if (selectedList.includes(value)) {
//         setSelectedList(selectedList.filter((item) => item !== value));
//       } else {
//         setSelectedList([...selectedList.filter((item) => item !== allOption), value]);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (maxCandidates < 1 || maxVotes < 1) {
//       toast.error("Maximum candidates and votes must be at least 1.");
//       setIsSubmitting(false);
//       return;
//     }

//     const updatedPosition = {
//       election: parseInt(electionId),
//       title,
//       description,
//       max_candidates: maxCandidates,
//       max_votes_per_voter: maxVotes,
//       batch_restriction: batchRestriction.length ? batchRestriction : ["All Batches"],
//       branch_restriction: branchRestriction.length ? branchRestriction : ["All Branches"],
//     };

//     console.log("Updating position:", updatedPosition);

//     try {
//       await axios.put(
//         `${API_URL}elections/${electionId}/positions/${position.id}/`,
//         updatedPosition,
//         { withCredentials: true }
//       );
//       toast.success("Position updated successfully!");
//       onPositionUpdated();
//     } catch (error) {
//       console.error("Error updating position:", error);
//       toast.error(error.response?.data?.detail || "Error updating position");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 border-2 border-yellow-300">
//       <h2 className="text-xl font-bold mb-4">Edit Position</h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Position title"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Position description"
//             rows="3"
//           />
//         </div>

//         {/* Batch Restriction */}
//         <div>
//           <label className="block font-medium mb-1">Batch Restriction</label>
//           <div className="grid grid-cols-2 gap-2">
//             {BATCH_OPTIONS.map((batch) => (
//               <label key={batch} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={batchRestriction.includes(batch)}
//                   onChange={() => handleCheckboxChange(batch, batchRestriction, setBatchRestriction, "All Batches")}
//                   className="mr-2"
//                 />
//                 {batch}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Department Restriction */}
//         <div>
//           <label className="block font-medium mb-1">Department Restriction</label>
//           <div className="grid grid-cols-2 gap-2">
//             {BRANCH_OPTIONS.map((Department) => (
//               <label key={Department} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={branchRestriction.includes(Department)}
//                   onChange={() => handleCheckboxChange(Department, branchRestriction, setBranchRestriction, "All Branches")}
//                   className="mr-2"
//                 />
//                 {Department}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex space-x-2">
//           <button 
//             type="submit" 
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Updating..." : "Update Position"}
//           </button>
//           <button 
//             type="button" 
//             onClick={onCancel}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default EditPositionForm;
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const API_URL = "http://localhost:8000/api/";

// const BATCH_OPTIONS = ["All Batches", "1st Year", "2nd Year", "3rd Year", "4th Year"];
// const BRANCH_OPTIONS = ["All Branches", "CSE", "MECH", "CIVIL", "EE", "EP", "SSE", "MEMS", "MC","CHE", "MSC", "PHD","MTech"];

// const EditPositionForm = ({ position, onPositionUpdated, onCancel, electionId }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [maxCandidates, setMaxCandidates] = useState(1);
//   const [maxVotes, setMaxVotes] = useState(1);
//   const [batchRestriction, setBatchRestriction] = useState([]);
//   const [branchRestriction, setBranchRestriction] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // useEffect(() => {
//   //   if (position) {
//   //     setTitle(position.title || "");
//   //     setDescription(position.description || "");
//   //     setMaxCandidates(position.max_candidates || 1);
//   //     setMaxVotes(position.max_votes_per_voter || 1);
//   //     // Ensure batch and Department restrictions are arrays
//   //     setBatchRestriction(position.batch_restriction ? position.batch_restriction.split(",") : []);
//   //     setBranchRestriction(position.branch_restriction ? position.branch_restriction.split(",") : []);
//   //   }
//   // }, [position]);
//   useEffect(() => {
//     if (position) {
//       setTitle(position.title || "");
//       setDescription(position.description || "");
      
      
//       // Ensure batch and Department restrictions are treated as strings before splitting
//       setBatchRestriction(
//         Array.isArray(position.batch_restriction)
//           ? position.batch_restriction
//           : typeof position.batch_restriction === "string"
//           ? position.batch_restriction.split(",")
//           : []
//       );
  
//       setBranchRestriction(
//         Array.isArray(position.branch_restriction)
//           ? position.branch_restriction
//           : typeof position.branch_restriction === "string"
//           ? position.branch_restriction.split(",")
//           : []
//       );
//     }
//   }, [position]);
  

//   // const handleCheckboxChange = (value, selectedList, setSelectedList) => {
//   //   if (selectedList.includes(value)) {
//   //     setSelectedList(selectedList.filter((item) => item !== value));
//   //   } else {
//   //     setSelectedList([...selectedList, value]);
//   //   }
//   // };
//   const handleCheckboxChange = (value, selectedList, setSelectedList, allOption) => {
//     if (value === allOption) {
//       if (selectedList.includes(allOption)) {
//         setSelectedList([]);
//       } else {
//         setSelectedList([allOption]);
//       }
//     } else {
//       if (selectedList.includes(value)) {
//         setSelectedList(selectedList.filter((item) => item !== value));
//       } else {
//         setSelectedList([...selectedList.filter((item) => item !== allOption), value]);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
  
//     if (maxCandidates < 1 || maxVotes < 1) {
//       toast.error("Maximum candidates and votes must be at least 1.");
//       setIsSubmitting(false);
//       return;
//     }
  
//     const updatedPosition = {
//       election: parseInt(electionId),
//       title,
//       description,
      
//       batch_restriction: batchRestriction.length ? batchRestriction : ["All Batches"],  // ✅ Ensure list
//       branch_restriction: branchRestriction.length ? branchRestriction : ["All Branches"],  // ✅ Ensure list
//     };
  
//     console.log("Updating position:", updatedPosition);
  
//     try {
//       await axios.put(
//         `${API_URL}elections/${electionId}/positions/${position.id}/`,
//         updatedPosition,
//         { withCredentials: true }
//       );
//       toast.success("Position updated successfully!");
//       onPositionUpdated();
//     } catch (error) {
//       console.error("Error updating position:", error);
//       toast.error(error.response?.data?.detail || "Error updating position");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 border-2 border-yellow-300">
//       <h2 className="text-xl font-bold mb-4">Edit Position</h2>

//       <div className="space-y-4">
//         <div>
//           <label className="block font-medium mb-1">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Position title"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Position description"
//             rows="3"
//           />
//         </div>

        

//         {/* Batch Restriction */}
//         <div>
//           <label className="block font-medium mb-1">Batch Restriction</label>
//           <div className="grid grid-cols-2 gap-2">
//             {BATCH_OPTIONS.map((batch) => (
//               <label key={batch} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={batchRestriction.includes(batch)}
//                   onChange={() => handleCheckboxChange(batch, batchRestriction, setBatchRestriction)}
//                   className="mr-2"
//                 />
//                 {batch}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Department Restriction */}
//         <div>
//           <label className="block font-medium mb-1">Department Restriction</label>
//           <div className="grid grid-cols-2 gap-2">
//             {BRANCH_OPTIONS.map((Department) => (
//               <label key={Department} className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   checked={branchRestriction.includes(Department)}
//                   onChange={() => handleCheckboxChange(Department, branchRestriction, setBranchRestriction)}
//                   className="mr-2"
//                 />
//                 {Department}
//               </label>
//             ))}
//           </div>
//         </div>

//         <div className="flex space-x-2">
//           <button 
//             type="submit" 
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Updating..." : "Update Position"}
//           </button>
//           <button 
//             type="button" 
//             onClick={onCancel}
//             className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 flex-1"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default EditPositionForm;
