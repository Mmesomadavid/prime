import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWifi, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NetworkStatus = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Function to handle online state
  const handleOnline = () => {
    setStatusMessage('You are now back online!');
    setIsVisible(true);
    // Hide the message with a sliding transition after 3 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  // Function to handle offline state
  const handleOffline = () => {
    setStatusMessage('Network Issues! Check Your Internet');
    setIsVisible(true);
  };

  useEffect(() => {
    // Initial network status check
    if (navigator.onLine) {
      handleOnline();
    } else {
      handleOffline();
    }

    // Register event listeners for online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup function
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className={`network-status ${isVisible ? 'visible' : 'hidden'}`}>
      <span className={`status-message ${isVisible ? (navigator.onLine ? 'online-message' : 'offline-message') : ''}`}>
        {navigator.onLine ? (
          <>
            <FontAwesomeIcon icon={faWifi} className="icon mr-2" />
            {statusMessage}
            <span className="green-dot"></span> {/* Green dot for online status */}
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faExclamationTriangle} className="icon mr-2 font-thin" />
            {statusMessage}
            <span className="red-dot"></span> {/* Red dot for offline status */}
          </>
        )}
      </span>
    </div>
  );
};

export default NetworkStatus;
