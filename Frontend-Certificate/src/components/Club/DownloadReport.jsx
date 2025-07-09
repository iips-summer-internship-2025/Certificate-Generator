// import React, { useState, useEffect } from 'react';

// const DownloadReport = () => {
//   const [selectedClub, setSelectedClub] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState('');
//   const [showEvents, setShowEvents] = useState(false);
//   const [showActions, setShowActions] = useState(false);

//   // Initialize dates on component mount
//   useEffect(() => {
//     const today = new Date();
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(today.getDate() - 30);
    
//     setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
//     setEndDate(today.toISOString().split('T')[0]);
//   }, []);

//   // Mock clubs data
//   const clubs = Array.from({ length: 22 }, (_, i) => ({
//     id: `club${i + 1}`,
//     name: `Lorem Ipsum Club ${i + 1}`
//   }));

//   const handleFetchEvents = () => {
//     if (!selectedClub) {
//       alert('Please select a club');
//       return;
//     }

//     if (!startDate || !endDate) {
//       alert('Please select both start and end dates');
//       return;
//     }

//     if (new Date(startDate) > new Date(endDate)) {
//       alert('Start date cannot be after end date');
//       return;
//     }

//     // In a real app, this would be an API call
//     const mockEvents = generateMockEvents(selectedClub, startDate, endDate);
//     setEvents(mockEvents);
//     setShowEvents(true);
//     setShowActions(false);
//     setSelectedEvent('');
//   };

//   const generateMockEvents = (clubId, start, end) => {
//     const events = [];
//     const startDate = new Date(start);
//     const endDate = new Date(end);
    
//     const eventCount = Math.floor(Math.random() * 6);
    
//     for (let i = 0; i < eventCount; i++) {
//       const randomDate = new Date(
//         startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
//       );
      
//       const clubName = clubs.find(club => club.id === clubId)?.name || 'Unknown Club';
      
//       events.push({
//         id: `event_${clubId}_${i}`,
//         name: `Event ${i + 1} for ${clubName}`,
//         date: randomDate.toISOString().split('T')[0]
//       });
//     }
    
//     return events;
//   };

//   const handleDownloadReport = () => {
//     if (!selectedEvent) return;
//     alert(`Downloading PDF report for event ${selectedEvent}`);
//     // In a real app: window.location.href = `/api/events/${selectedEvent}/report`;
//   };

//   const handleViewPhotos = () => {
//     if (!selectedEvent) return;
//     alert(`Opening Cloudinary photos for event ${selectedEvent}`);
//     // In a real app: window.location.href = `/events/${selectedEvent}/photos`;
//   };

//   return (
//     <div className="form-container">
//       <h2>Club Events Management</h2>
//       <div className="form-group">
//         <label htmlFor="club">Select Club:</label>
//         <select
//           id="club"
//           value={selectedClub}
//           onChange={(e) => setSelectedClub(e.target.value)}
//           required
//         >
//           <option value="">-- Select a Club --</option>
//           {clubs.map((club) => (
//             <option key={club.id} value={club.id}>
//               {club.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-group">
//         <label htmlFor="startDate">Start Date:</label>
//         <input
//           type="date"
//           id="startDate"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="endDate">End Date:</label>
//         <input
//           type="date"
//           id="endDate"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           required
//         />
//       </div>

//       <button 
//         type="button" 
//         className="fetch-button"
//         onClick={handleFetchEvents}
//       >
//         Fetch Events
//       </button>

//       {showEvents && (
//         <div className="form-group">
//           <label htmlFor="event">Select Event:</label>
//           <select
//             id="event"
//             value={selectedEvent}
//             onChange={(e) => {
//               setSelectedEvent(e.target.value);
//               setShowActions(!!e.target.value);
//             }}
//           >
//             <option value="">-- Select an Event --</option>
//             {events.map((event) => (
//               <option key={event.id} value={event.id}>
//                 {event.name} ({event.date})
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {showActions && (
//         <div className="action-buttons">
//           <button 
//             type="button" 
//             className="download-btn"
//             onClick={handleDownloadReport}
//           >
//             Download Event Report (PDF)
//           </button>
//           <button 
//             type="button" 
//             className="photos-btn"
//             onClick={handleViewPhotos}
//           >
//             View Event Photos
//           </button>
//         </div>
//       )}

//       <style jsx>{`
//         .form-container {
//           font-family: Arial, sans-serif;
//           max-width: 800px;
//           margin: 0 auto;
//           padding: 20px;
//           background-color: #f5f5f5;
//         }
//         .form-container > div {
//           background-color: white;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
//         .form-group {
//           margin-bottom: 15px;
//         }
//         label {
//           display: block;
//           margin-bottom: 5px;
//           font-weight: bold;
//         }
//         select, input {
//           width: 100%;
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           box-sizing: border-box;
//         }
//         button {
//           color: white;
//           padding: 10px 15px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 16px;
//         }
//         button:hover {
//           opacity: 0.9;
//         }
//         .fetch-button {
//           background-color: #4CAF50;
//         }
//         .fetch-button:hover {
//           background-color: #45a049;
//         }
//         .action-buttons {
//           margin-top: 20px;
//           display: flex;
//           gap: 10px;
//         }
//         .action-buttons button {
//           flex: 1;
//         }
//         .download-btn {
//           background-color: #2196F3;
//         }
//         .download-btn:hover {
//           background-color: #0b7dda;
//         }
//         .photos-btn {
//           background-color: #ff9800;
//         }
//         .photos-btn:hover {
//           background-color: #e68a00;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DownloadReport;
// import React, { useState, useEffect } from 'react';

// const DownloadReport = () => {
//   const [selectedClub, setSelectedClub] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState('');
//   const [showEvents, setShowEvents] = useState(false);
//   const [showActions, setShowActions] = useState(false);

//   useEffect(() => {
//     const today = new Date();
//     const thirtyDaysAgo = new Date();
//     thirtyDaysAgo.setDate(today.getDate() - 30);
    
//     setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
//     setEndDate(today.toISOString().split('T')[0]);
//   }, []);

//   const clubs = [
//     { id: "advertising-pr", name: "Advertising & PR Club" },
//     { id: "ai-robotics", name: "AI and Robotics Club" },
//     { id: "business-analytics", name: "Business & Analytics Club" },
//     { id: "coding", name: "Coding Club" },
//     { id: "commerce", name: "Commerce Club" },
//     { id: "computing", name: "Computing Club" },
//     { id: "entrepreneurship", name: "Entrepreneurship Cell" },
//     { id: "environment", name: "Environment Club" },
//     { id: "festival", name: "Festival Club" },
//     { id: "finance", name: "Finance Club" },
//     { id: "fine-arts", name: "Fine Arts Club" },
//     { id: "hr", name: "HR Club" },
//     { id: "literary", name: "Literary Cell" },
//     { id: "marketing", name: "Marketing Club" },
//     { id: "meditation", name: "Meditation and Self Development Club" },
//     { id: "performing-arts", name: "Performing Arts & Theater Club" },
//     { id: "photography", name: "Photography Club" },
//     { id: "setu", name: "Setu-Social Connect Club" },
//     { id: "sports", name: "Sports Club" },
//     { id: "student-research", name: "Student Research Cell" },
//     { id: "tourism", name: "Tourism Club" },
//     { id: "yoga", name: "Yoga & Fitness" }
//   ];

//   const handleFetchEvents = () => {
//     if (!selectedClub) return alert('Please select a club');
//     if (!startDate || !endDate) return alert('Please select both dates');
//     if (new Date(startDate) > new Date(endDate)) return alert('Start date cannot be after end date');

//     // Mocked event generation - replace this with API call in production
//     const mockEvents = generateMockEvents(selectedClub, startDate, endDate);
//     setEvents(mockEvents);
//     setShowEvents(true);
//     setShowActions(false);
//     setSelectedEvent('');
//   };

//   const generateMockEvents = (clubId, start, end) => {
//     const events = [];
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const eventCount = Math.floor(Math.random() * 6);

//     for (let i = 0; i < eventCount; i++) {
//       const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
//       const clubName = clubs.find(club => club.id === clubId)?.name || 'Unknown Club';

//       events.push({
//         id: `event_${clubId}_${i}`,
//         name: `Event ${i + 1} for ${clubName}`,
//         date: randomDate.toISOString().split('T')[0]
//       });
//     }

//     return events;
//   };

//   const handleDownloadReport = () => {
//     if (!selectedEvent) return;
//     alert(`Downloading PDF report for event ${selectedEvent}`);
//     // window.location.href = `/api/events/${selectedEvent}/report`;
//   };

//   const handleViewPhotos = () => {
//     if (!selectedEvent) return;
//     alert(`Opening Cloudinary photos for event ${selectedEvent}`);
//     // window.location.href = `/events/${selectedEvent}/photos`;
//   };

//   return (
//     <div className="form-container">
//       <h2>Club Events Management</h2>
//       <div className="form-group">
//         <label htmlFor="club">Select Club:</label>
//         <select
//           id="club"
//           value={selectedClub}
//           onChange={(e) => setSelectedClub(e.target.value)}
//           required
//         >
//           <option value="">-- Select a Club --</option>
//           {clubs.map((club) => (
//             <option key={club.id} value={club.id}>
//               {club.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="form-group">
//         <label htmlFor="startDate">Start Date:</label>
//         <input
//           type="date"
//           id="startDate"
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           required
//         />
//       </div>

//       <div className="form-group">
//         <label htmlFor="endDate">End Date:</label>
//         <input
//           type="date"
//           id="endDate"
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           required
//         />
//       </div>

//       <button type="button" className="fetch-button" onClick={handleFetchEvents}>
//         Fetch Events
//       </button>

//       {showEvents && (
//         <div className="form-group">
//           <label htmlFor="event">Select Event:</label>
//           <select
//             id="event"
//             value={selectedEvent}
//             onChange={(e) => {
//               setSelectedEvent(e.target.value);
//               setShowActions(!!e.target.value);
//             }}
//           >
//             <option value="">-- Select an Event --</option>
//             {events.map((event) => (
//               <option key={event.id} value={event.id}>
//                 {event.name} ({event.date})
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {showActions && (
//         <div className="action-buttons">
//           <button type="button" className="download-btn" onClick={handleDownloadReport}>
//             Download Event Report (PDF)
//           </button>
//           <button type="button" className="photos-btn" onClick={handleViewPhotos}>
//             View Event Photos
//           </button>
//         </div>
//       )}

//       <style jsx>{`
//         .form-container {
//           font-family: Arial, sans-serif;
//           max-width: 800px;
//           margin: 0 auto;
//           padding: 20px;
//           background-color: #f5f5f5;
//         }
//         .form-container > div {
//           background-color: white;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//         }
//         .form-group {
//           margin-bottom: 15px;
//         }
//         label {
//           display: block;
//           margin-bottom: 5px;
//           font-weight: bold;
//         }
//         select, input {
//           width: 100%;
//           padding: 8px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           box-sizing: border-box;
//         }
//         button {
//           color: white;
//           padding: 10px 15px;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//           font-size: 16px;
//         }
//         button:hover {
//           opacity: 0.9;
//         }
//         .fetch-button {
//           background-color: #4CAF50;
//         }
//         .fetch-button:hover {
//           background-color: #45a049;
//         }
//         .action-buttons {
//           margin-top: 20px;
//           display: flex;
//           gap: 10px;
//         }
//         .action-buttons button {
//           flex: 1;
//         }
//         .download-btn {
//           background-color: #2196F3;
//         }
//         .download-btn:hover {
//           background-color: #0b7dda;
//         }
//         .photos-btn {
//           background-color: #ff9800;
//         }
//         .photos-btn:hover {
//           background-color: #e68a00;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default DownloadReport;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DownloadReport = () => {
  const [selectedClub, setSelectedClub] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showEvents, setShowEvents] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    setStartDate(thirtyDaysAgo.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  const clubs = [
    "Advertising & PR Club",
    "AI and Robotics Club",
    "Business & Analytics Club",
    "Coding Club",
    "Commerce Club",
    "Computing Club",
    "Entrepreneurship Cell",
    "Environment Club",
    "Festival Club",
    "Finance Club",
    "Fine Arts Club",
    "HR Club",
    "Literary Cell",
    "Marketing Club",
    "Meditation and Self Development Club",
    "Performing Arts & Theater Club",
    "Photography Club",
    "Setu-Social Connect Club",
    "Sports Club",
    "Student Research Cell",
    "Tourism Club",
    "Yoga & Fitness"
  ];

  const handleFetchEvents = async () => {
    if (!selectedClub || !startDate || !endDate) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.get(`/api/events/`, {
        params: {
          club: selectedClub,
          start_date: startDate,
          end_date: endDate,
        }
      });

      setEvents(response.data || []);
      setShowEvents(true);
      setSelectedEvent('');
      setShowActions(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      alert('Failed to fetch events.');
    }
  };

  const handleDownloadReport = () => {
    if (!selectedEvent) return;
    window.location.href = `/api/events/${selectedEvent}/report/`;
  };

  const handleViewPhotos = () => {
    if (!selectedEvent) return;
    window.open(`/api/events/${selectedEvent}/photos/`, '_blank');
  };

  return (
    <div className="form-container">
      <h2>Club Events Management</h2>
      <div className="form-group">
        <label htmlFor="club">Select Club:</label>
        <select
          id="club"
          value={selectedClub}
          onChange={(e) => setSelectedClub(e.target.value)}
          required
        >
          <option value="">-- Select a Club --</option>
          {clubs.map((club, index) => (
            <option key={index} value={club}>
              {club}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </div>

      <button 
        type="button" 
        className="fetch-button"
        onClick={handleFetchEvents}
      >
        Fetch Events
      </button>

      {showEvents && (
        <div className="form-group">
          <label htmlFor="event">Select Event:</label>
          <select
            id="event"
            value={selectedEvent}
            onChange={(e) => {
              setSelectedEvent(e.target.value);
              setShowActions(!!e.target.value);
            }}
          >
            <option value="">-- Select an Event --</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.name} ({event.date})
              </option>
            ))}
          </select>
        </div>
      )}

      {showActions && (
        <div className="action-buttons">
          <button 
            type="button" 
            className="download-btn"
            onClick={handleDownloadReport}
          >
            Download Event Report (PDF)
          </button>
          <button 
            type="button" 
            className="photos-btn"
            onClick={handleViewPhotos}
          >
            View Event Photos
          </button>
        </div>
      )}

      <style jsx>{`
        .form-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .form-container > div {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .form-group {
          margin-bottom: 15px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        select, input {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }
        button {
          color: white;
          padding: 10px 15px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover {
          opacity: 0.9;
        }
        .fetch-button {
          background-color: #4CAF50;
        }
        .fetch-button:hover {
          background-color: #45a049;
        }
        .action-buttons {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }
        .action-buttons button {
          flex: 1;
        }
        .download-btn {
          background-color: #2196F3;
        }
        .download-btn:hover {
          background-color: #0b7dda;
        }
        .photos-btn {
          background-color: #ff9800;
        }
        .photos-btn:hover {
          background-color: #e68a00;
        }
      `}</style>
    </div>
  );
};

export default DownloadReport;

