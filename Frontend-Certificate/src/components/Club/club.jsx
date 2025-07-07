
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, px } from 'framer-motion';
import { CalendarIcon, UsersIcon, UserIcon, LayoutListIcon, FileTextIcon, ImageIcon, XIcon, SparklesIcon, ChevronDown, ChevronRight, ChevronLeft, AwardIcon, PaletteIcon, MusicIcon, CodeIcon, CameraIcon, BookOpenIcon, GamepadIcon, LockIcon, LightbulbIcon } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../home/Header';
import Footer from '../home/Footer';

// Club data with icons
const clubs = [
  { name: 'Avertising & PR Club', icon: <CodeIcon className="text-white" />, color: "bg-blue-500" },
  { name: 'AI and Robotics Club', icon: <PaletteIcon className="text-white" />, color: "bg-purple-500" },
  { name: 'Business & analystics Club', icon: <div className="text-white">🤖</div>, color: "bg-pink-500" },
  { name: 'Coding Club', icon: <div className="text-white">🎭</div>, color: "bg-amber-500" },
  { name: 'Commerce Club', icon: <MusicIcon className="text-white" />, color: "bg-red-500" },
  { name: 'Computing Club', icon: <div className="text-white">💃</div>, color: "bg-fuchsia-500" },
  { name: 'Enterprenuership Cell', icon: <CameraIcon className="text-white" />, color: "bg-cyan-500" },
  { name: 'Environment Club', icon: <BookOpenIcon className="text-white" />, color: "bg-emerald-500" },
  { name: 'Festival Club', icon: <GamepadIcon className="text-white" />, color: "bg-green-500" },
  { name: 'Finance Club', icon: <div className="text-white">🧠</div>, color: "bg-indigo-500" },
  { name: 'Fine Arts Club', icon: <LockIcon className="text-white" />, color: "bg-yellow-500" },
  { name: 'HR Club', icon: <LightbulbIcon className="text-white" />, color: "bg-orange-500" },
  { name: 'Literary Cell', icon: <LightbulbIcon className="text-white" />, color: "bg-teal-500" },
  { name: 'Marketing Club', icon: <LightbulbIcon className="text-white" />, color: "bg-rose-500" },
  { name: 'Meditation and Self Development Club', icon: <LightbulbIcon className="text-white" />, color: "bg-sky-500" },
  { name: 'Performing Arts & Theater Club', icon: <LightbulbIcon className="text-white" />, color: "bg-lime-500" },
  { name: 'Photography Club', icon: <LightbulbIcon className="text-white" />, color: "bg-violet-500" },
  { name: 'Setu-Social Connect Club', icon: <LightbulbIcon className="text-white" />, color: "bg-rose-500" },
  { name: 'Sprots Club', icon: <LightbulbIcon className="text-white" />, color: "bg-pink-500" },
  { name: 'Student Research Cell', icon: <LightbulbIcon className="text-white" />, color: "bg-blue-500" },
  { name: 'Tourism Club', icon: <LightbulbIcon className="text-white" />, color: "bg-green-500" },
  { name: 'Yoga & Fitness', icon: <LightbulbIcon className="text-white" />, color: "bg-indigo-500" },
];


// Club Event Registration Form
export default function ClubEventForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    clubName: '',
    startDate: '',
    endDate: '',
    organizerName: '',
    eventName: '',
    reportFile: null,
    imageFile: null,
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  // Remove selected file
  const removeFile = (field) => {
    setFormData({ ...formData, [field]: null });
  };

  // // Submit form
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1500));

  //     // Show success toast
  //     toast.success('Successfully registered the event!', {
  //       position: "top-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       theme: "colored",
  //       style: {
  //         background: 'linear-gradient(to right, #0ea5e9, #6366f1)',
  //         color: '#fff',
  //         fontWeight: 'bold',
  //         borderRadius: '12px'
  //       }
  //     });

  //     // Reset form and close modal
  //     setFormData({
  //       clubName: '',
  //       startDate: '',
  //       endDate: '',
  //       organizerName: '',
  //       eventName: '',
  //       reportFile: null,
  //       imageFile: null,
  //     });
  //     setFormStep(1);
  //     setIsFormOpen(false);
  //   } catch (error) {
  //     toast.error('Failed to register event. Please try again.');
  //   }
  // };
//submit form with API call
  const handleSubmit = async (e) => {
  e.preventDefault();

  const formPayload = new FormData();
  formPayload.append('clubName', formData.clubName);
  formPayload.append('startDate', formData.startDate);
  formPayload.append('endDate', formData.endDate);
  formPayload.append('organizerName', formData.organizerName);
  formPayload.append('eventName', formData.eventName);
  formPayload.append('reportFile', formData.reportFile);
  formPayload.append('imageFile', formData.imageFile);

  try {
    const response = await fetch('https://your-backend-api.com/api/events', {
      method: 'POST',
      body: formPayload
    });

    if (!response.ok) {
      throw new Error('API call failed');
    }

    // Show success toast
    toast.success('Successfully registered the event!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        background: 'linear-gradient(to right, #0ea5e9, #6366f1)',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '12px'
      }
    });

    // Reset form and close modal
    setFormData({
      clubName: '',
      startDate: '',
      endDate: '',
      organizerName: '',
      eventName: '',
      reportFile: null,
      imageFile: null,
    });
    setFormStep(1);
    setIsFormOpen(false);
  } catch (error) {
    toast.error('Failed to register event. Please try again.');
    console.error('Submit error:', error);
  }
};

  // Auto-advance carousel
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide(prev => (prev + 1) % clubs.length);
  }, 2000); // Slide every 5 seconds

  return () => clearInterval(interval);
}, [clubs.length]);

// Smooth scroll to current slide
useEffect(() => {
  if (!carouselRef.current) return;

  const container = carouselRef.current;
  const containerWidth = container.offsetWidth;
  const slideWidth = container.scrollWidth / clubs.length;

  const scrollTo = (slideWidth * currentSlide) - (containerWidth / 2) + (slideWidth / 2);

  // Only scroll if needed
  container.scrollTo({
    left: scrollTo,
    behavior: 'smooth'
  });
}, [currentSlide, clubs.length]);



  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50 to-blue-100 relative overflow-hidden">
      <Header />
      <ToastContainer />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full mix-blend-soft-light opacity-30 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full mix-blend-soft-light opacity-40 blur-3xl"></div>

      {/* Welcome Container - 2/3 screen height */}
      <div className="min-h-[66vh] flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-8 py-12 md:py-24 gap-10 md:gap-20">
        {/* Left side - Animated SVG */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="max-w-sm sm:max-w-md md:max-w-lg"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-[2rem] blur-2xl opacity-40 animate-pulse z-0"></div>
              <div className="relative bg-gradient-to-br from-white to-sky-100 p-10 rounded-[2rem] shadow-2xl border border-sky-100 z-0 overflow-hidden">
                <img
                  src="/assets/template_image.png" // Ensure logo.jpg is in your public folder or use the correct path
                  alt="Logo"
                  className="w-full h-auto object-contain rounded-2xl"
                  style={{ maxHeight: 320 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side - Welcome Text */}
        <div className="w-full md:w-1/2 text-center md:text-right mb-16 md:mb-0 px-6 md:px-12">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-yellow-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">IIPS Clubs</span>
          </motion.h1>

          <motion.p
            className="text-xl text-sky-800 max-w-xl mx-auto md:ml-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Where creativity meets opportunity. Join our vibrant community of innovators, creators, and thinkers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(245, 158, 11, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className="mt-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 px-3 rounded font-bold text-lg shadow-xl hover:shadow-2xl transition-all items-center"
            >
              {/* <AwardIcon className="mr-2 flex " size={24} /> */}
              Register Event
            </motion.button>


          </motion.div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="relative py-8 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2
              className=" mx-4 my-4 text-3xl font-bold text-sky-800 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Clubs</span>
            </motion.h2>
            <motion.p
              className="text-sky-600 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Discover our vibrant community of clubs where passion meets innovation
            </motion.p>
          </div>

          <div className="relative">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4 px-4"
              style={{ scrollbarWidth: 'none' }}
            >
              {clubs.map((club, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-72 mx-4 snap-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: currentSlide === index ? 1.05 : 0.95
                  }}
                  transition={{
                    duration: 0.2,
                    
                  }}
                >
                  <div className={`relative h-80 rounded-3xl overflow-hidden shadow-xl group ${club.color} bg-gradient-to-br`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                    <div className="absolute top-30 right-30 bg-white/20 backdrop-blur-sm p-3 rounded-full">
                      {club.icon}
                    </div>

                    <div className="absolute bottom-0 left-0 p-6 w-full text-center items-center text-white">
                      <h3 className="text-2xl font-bold text-white mb-2">{club.name}</h3>
                      <p className="text-sky-100 mb-4">Join our community of passionate members</p>

                    </div>

                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setCurrentSlide(prev => (prev - 1 + clubs.length) % clubs.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-sky-50 transition-colors"
            >
              <ChevronLeft className="text-sky-700" />
            </button>

            <button
              onClick={() => setCurrentSlide(prev => (prev + 1) % clubs.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-sky-50 transition-colors"
            >
              <ChevronRight className="text-sky-700" />
            </button>
          </div>

          <div className="flex justify-center mt-8">
            <div className="inline-flex space-x-2 bg-white/80 backdrop-blur-sm p-2 rounded-full">
              {clubs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-gradient-to-r from-amber-500 to-orange-500 w-6' : 'bg-sky-300'
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden"
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-700 px-8 py-6 text-white">
                <div className="flex justify-between items-center mb-6 my-2 mx-4">
                  <h2 className="text-2xl font-bold flex items-center">
                    {/* <AwardIcon className="mr-2 text-amber-300" size={24} /> */}
                    Register Event
                  </h2>
                  <button
                    onClick={() => {
                      setIsFormOpen(false);
                      setFormStep(1);
                    }}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    <XIcon size={24} />
                  </button>
                </div>

                {/* Stepper */}
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center justify-center my-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${formStep === 1
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                      : 'bg-white/20 text-white'
                      }`}>
                      {formStep > 1 ? "✓" : "1"}
                    </div>
                    <div className={`w-16 h-1 mx-2 transition-all ${formStep >= 2 ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-white/30'
                      }`}></div>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${formStep === 2
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md'
                      : 'bg-white/20 text-white'
                      }`}>
                      2
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="flex flex-col mx-4 my-4 gap-4 overflow-y-auto p-8 space-y-8">
                <AnimatePresence mode="wait">
                  {formStep === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {/* Club Name */}
                      <div className="space-y-2 mx-2">
                        <label className="block text-sky-700 font-medium flex items-center ">
                          <UsersIcon className="mr-2 text-indigo-500" size={18} />
                          Club Name
                        </label>
                        <div className="relative">
                          <select
                            name="clubName"
                            value={formData.clubName}
                            onChange={handleChange}
                            className="w-full p-3 border border-sky-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white appearance-none"
                            required
                          >
                            <option value="">Select your club</option>
                            {clubs.map((club, index) => (
                              <option key={index} value={club.name}>{club.name}</option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-sky-600">
                            <ChevronDown />
                          </div>
                        </div>
                      </div>

                      {/* Date Range */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
                        <div className="space-y-2">
                          <label className="block text-sky-700 font-medium flex items-center">
                            <CalendarIcon className="mr-2 text-indigo-500" size={18} />
                            Start Date
                          </label>
                          <div className="flex items-center border border-sky-200 rounded-xl p-3 bg-white">
                            <input
                              type="date"
                              name="startDate"
                              value={formData.startDate}
                              onChange={handleChange}
                              className="w-full focus:outline-none text-sky-800"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sky-700 font-medium flex items-center">
                            <CalendarIcon className="mr-2 text-indigo-500" size={18} />
                            End Date
                          </label>
                          <div className="flex items-center border border-sky-200 rounded-xl p-3 bg-white">
                            <input
                              type="date"
                              name="endDate"
                              value={formData.endDate}
                              onChange={handleChange}
                              className="w-full focus:outline-none text-sky-800"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Organizer Name */}
                      <div className="space-y-2">
                        <label className="block text-sky-700 font-medium flex items-center">
                          <UserIcon className="mr-2 text-indigo-500" size={18} />
                          Organizer Name
                        </label>
                        <div className="flex items-center border border-sky-200 rounded-xl p-3 bg-white">
                          <input
                            type="text"
                            name="organizerName"
                            value={formData.organizerName}
                            onChange={handleChange}
                            placeholder="Organizer's name"
                            className="w-full focus:outline-none text-sky-800 placeholder-sky-300"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex justify-center my-4 pt-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setFormStep(2)}
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-2 px-2 rounded-xl font-medium transition-all flex items-center"
                        >
                          Next Step
                          <ChevronRight className="ml-2" size={20} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 mx-4 gap-4"
                    >
                      {/* Event Name */}
                      <div className="space-y-2 mx-4  ">
                        <label className="block text-sky-700 font-medium flex items-center">
                          <LayoutListIcon className="mr-2 text-indigo-500" size={18} />
                          Event Name
                        </label>
                        <div className="flex items-center border border-sky-200 rounded-xl p-3 bg-white">
                          <input
                            type="text"
                            name="eventName"
                            value={formData.eventName}
                            onChange={handleChange}
                            placeholder="Enter event name"
                            className="w-full focus:outline-none text-sky-800 placeholder-sky-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Upload Report */}
                      <div className="mx-4 my-4">
                        <label className="block text-sky-700 font-medium mb-2 flex items-center">
                          <FileTextIcon className="mr-2 text-indigo-500" size={18} />
                          Upload Report (PDF/DOC)
                        </label>
                        {formData.reportFile ? (
                          <div className="flex items-center justify-between bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 shadow-sm">
                            <div className="flex items-center">
                              <FileTextIcon className="text-sky-600 mr-3" size={20} />
                              <span className="text-sky-800 truncate max-w-xs">{formData.reportFile.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile('reportFile')}
                              className="text-red-500 hover:text-red-700"
                            >
                              <XIcon size={20} />
                            </button>
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="border-2 border-dashed border-sky-300 rounded-2xl min-h-[60px] flex items-center justify-center bg-sky-50 hover:bg-sky-100 transition-all duration-200 cursor-pointer"
                          >
                            <label className="flex flex-col mx-4 items-center justify-center cursor-pointer w-full h-full py-6">
                              <span className="text-sky-700 font-medium">Click to upload report </span>
                              <span className="text-sm text-sky-500 mt-1"> (PDF, DOC, DOCX (max 5MB))</span>
                              <input
                                type="file"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={(e) => handleFileChange(e, 'reportFile')}
                              />
                            </label>
                          </motion.div>
                        )}
                      </div>

                      {/* Upload Image */}
                      <div className="mx-4 my-6">
                        <label className="block text-sky-700 font-medium mb-2 flex items-center">
                          <ImageIcon className="mr-2 text-indigo-500" size={18} />
                          Upload Event Image
                        </label>
                        {formData.imageFile ? (
                          <div className="flex items-center justify-between bg-sky-50 border border-sky-200 rounded-2xl px-4 py-3 shadow-sm">
                            <div className="flex items-center">
                              <ImageIcon className="text-sky-600 mr-3" size={20} />
                              <span className="text-sky-800 truncate max-w-xs">{formData.imageFile.name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile('imageFile')}
                              className="text-red-500 hover:text-red-700"
                            >
                              <XIcon size={20} />
                            </button>
                          </div>
                        ) : (
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="border-2 border-dashed border-sky-300 rounded-2xl min-h-[60px] flex items-center justify-center bg-sky-50 hover:bg-sky-100 transition-all duration-200 cursor-pointer"
                          >
                            <label className="flex flex-col  mx-4 items-center justify-center cursor-pointer w-full h-full py-6">
                              <span className="text-sky-700 font-medium ">Click to upload image </span>
                              <span className="text-sm text-sky-500 mt-1"> (JPG, JPEG, PNG, HEIC (max 10MB))</span>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => handleFileChange(e, 'imageFile')}
                              />
                            </label>
                          </motion.div>
                        )}
                      </div>


                      <div className="flex justify-between items-center ">
                        {/* Back Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setFormStep(1)}
                          className="bg-sky-100 hover:bg-sky-200 text-sky-700 py-2 px-1 rounded-2xl m-4 font-semibold transition-all flex items-center shadow-md"
                        >
                          <ChevronLeft className="mr-4" size={18} />
                          <span className='mx-2'>Back</span>
                        </motion.button>

                        {/* Submit Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-2 px-1 rounded-xl font-semibold transition-all flex items-center shadow-md"
                        >

                          <span className='mx-2'>Submit Event</span>
                          <SparklesIcon className="ml-2" size={18} />
                        </motion.button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />

      {/* Styles for scrollbar hiding */}
      <style >{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// // Custom ChevronDownIcon component
// const ChevronDown = () => (
//   <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
//     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
//   </svg>
// );