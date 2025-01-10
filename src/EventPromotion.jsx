import React, { useState } from "react";

const EventPromotion = () => {
  const [events] = useState([
    { id: 1, title: 'The Introduction', date: 'January 11, 2025', description: 'This will be an introduction to the One thing.' },
    { id: 2, title: 'The Strategy', date: 'January 14, 2025', description: 'How will i be consistent?.' },
    { id: 3, title: 'The Growth', date: 'January 16, 2025', description: "I have set everything up. It's time for 'GROWTH!'." },
  ]);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const reserveSpot = (eventId) => {
    setNotificationMessage(`You have reserved a spot for Event ID: ${eventId}. An email will be sent to you if you have subscribed.`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // Hide notification after 3 seconds
  };

  return (
    <section id="events" className="py-20 bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-4xl font-extrabold mb-10">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
              <h3 className="text-2xl font-semibold text-gray-800">{event.title}</h3>
              <p className="text-gray-500">{event.date}</p>
              <p className="mt-4 text-gray-700">{event.description}</p>
              <button onClick={() => reserveSpot(event.id)} className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors">
                Reserve Spot
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Notification */}
      {showNotification && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-md shadow-lg mb-4">
          {notificationMessage}
        </div>
      )}
    </section>
  );
};

export default EventPromotion;
