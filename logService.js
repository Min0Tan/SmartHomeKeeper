// logService.js

import { ref, set } from "firebase/database";

export function logEvent(db, eventType, eventDetails) {
  const timestamp = Date.now();

  set(ref(db, 'users/control/tv' + timestamp), {
    eventType: eventType,
    eventDetails: eventDetails,
    timestamp: timestamp
  });
}
