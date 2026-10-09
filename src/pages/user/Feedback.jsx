import React, { useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import { Star, CheckCircle, Send, LayoutDashboard, Calendar, History, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

const Feedback = () => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  // Mock data for recent feedback based on screenshot
  const [recentFeedback, setRecentFeedback] = useState([
    {
      id: 1,
      name: 'Harini',
      rating: 4,
      feedback: 'The hall was clean and well maintained. The booking process was easy and smooth. Staff were very helpful. Overall, a great experience!',
      date: '16 Apr 2025'
    },
    {
      id: 2,
      name: 'Rahul',
      rating: 5,
      feedback: 'Excellent service and beautiful hall. Will book again for future events.',
      date: '12 Apr 2025'
    },
    {
      id: 3,
      name: 'Priya',
      rating: 4,
      feedback: 'Good ambience and facilities. Only minor issue was the AC temperature.',
      date: '8 Apr 2025'
    },
    {
      id: 4,
      name: 'Karthik',
      rating: 5,
      feedback: 'Everything was perfect. Highly recommend this hall!',
      date: '3 Apr 2025'
    }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim()) return;

    const newFeedback = {
      id: Date.now(),
      name: user?.name || 'Guest User',
      rating,
      feedback: comment,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setRecentFeedback([newFeedback, ...recentFeedback]);
    setSubmitted(true);
    setRating(0);
    setComment('');

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const renderStars = (count) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-4 h-4 ${i < count ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} 
          />
        ))}
      </div>
    );
  };

  return (
    <UserLayout>
      {/* We emulate the sidebar and main content layout from the screenshot inside the UserLayout container */}
      <div className="flex min-h-[calc(100vh-80px)] bg-[#F8FAFC]">
        {/* Sidebar matching the screenshot exactly */}
        <div className="w-64 bg-[#F8FAFC] border-r border-slate-200 hidden md:block">
          <div className="py-6 space-y-1">
            <Link to="/event-dashboard" className="flex items-center px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600">
              <LayoutDashboard className="w-5 h-5 mr-3 text-slate-500" />
              Dashboard
            </Link>
            <Link to="/halls" className="flex items-center px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600">
              <Calendar className="w-5 h-5 mr-3 text-slate-500" />
              Book Hall
            </Link>
            <Link to="/my-bookings" className="flex items-center px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600">
              <History className="w-5 h-5 mr-3 text-slate-500" />
              My Bookings
            </Link>
            <div className="flex items-center px-6 py-3 text-sm font-semibold bg-blue-500 text-white shadow-sm rounded-r-lg mr-4">
              <MessageSquare className="w-5 h-5 mr-3 text-white" />
              Feedback
            </div>
            <Link to="/login" className="flex items-center px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 mt-4">
              <LogOut className="w-5 h-5 mr-3 text-slate-500" />
              Logout
            </Link>
          </div>
        </div>

        {/* Main Content matching the screenshot exactly */}
        <div className="flex-1 p-8 bg-white">
          <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Header and Success Alert */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-slate-700" />
                  Feedback
                </h1>
                <p className="text-sm text-slate-500 mt-1">We value your feedback. Please share your experience with us.</p>
              </div>
              
              {submitted && (
                <div className="bg-emerald-50 text-emerald-700 px-4 py-3 rounded-lg border border-emerald-200 flex items-center min-w-[300px]">
                  <CheckCircle className="w-5 h-5 mr-2 text-emerald-500" />
                  <span className="text-sm font-medium flex-1">Feedback submitted successfully!</span>
                  <button onClick={() => setSubmitted(false)} className="text-emerald-500 hover:text-emerald-700">
                    &times;
                  </button>
                </div>
              )}
            </div>

            {/* Feedback Form Card */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none"
                      >
                        <Star 
                          className={`w-8 h-8 transition-colors ${
                            star <= (hoverRating || rating) 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-slate-300'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Your Feedback</label>
                  <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm outline-none resize-y"
                    placeholder="Tell us about your experience..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={rating === 0 || !comment.trim()}
                  className={`flex items-center px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-colors ${
                    rating === 0 || !comment.trim() 
                      ? 'bg-blue-300 cursor-not-allowed' 
                      : 'bg-blue-500 hover:bg-blue-600 shadow-sm'
                  }`}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Feedback
                </button>
              </form>
            </div>

            {/* Recent Feedback Section */}
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Recent Feedback</h2>
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-[#F8FAFC] text-slate-700 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-bold w-[15%]">Name</th>
                      <th className="px-6 py-4 font-bold w-[15%]">Rating</th>
                      <th className="px-6 py-4 font-bold w-[55%]">Feedback</th>
                      <th className="px-6 py-4 font-bold w-[15%]">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentFeedback.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-slate-700">{item.name}</td>
                        <td className="px-6 py-4">
                          {renderStars(item.rating)}
                        </td>
                        <td className="px-6 py-4 text-slate-600">{item.feedback}</td>
                        <td className="px-6 py-4 text-slate-500">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Feedback;

