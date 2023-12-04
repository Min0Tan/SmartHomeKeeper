// logService.js

import { ref, set } from "firebase/database";    //Firebase DB에서 필요한 함수 ref와 set 가져오기

//logEvent 함수를 정의. logEvent는 Firebase Realtime Database에 이벤트 로그를 저장하는 역할
export function logEvent(db, type, eventCode) {
  const eventDetails = { type, eventCode };
  set(ref(db, 'logs/users/control'), eventDetails);
}
