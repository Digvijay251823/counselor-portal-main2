interface counselee {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  harinamInitiationPlace: string;
  chantingRounds: string;
  chantingStartedThisRoundsDate: string;
  recommendedBy: string;
  currentCounselor: counselee;
  spouce: counselee;
  husband: counselee;
  sessionsAttended: number;
  totalSessions: number;
  connectedToCounselorSince: string;
  children: [
    {
      name: string;
      age: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
}
interface devoteePlanningToRelocate {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  harinamInitiationPlace: string;
  chantingRounds: string;
  chantingStartedThisRoundsDate: string;
  recommendedBy: string;
  comments: string;
  whenwanttorelocate: string;
  whereplannedtolive: string;
  expectedsupportfromtemple: string;
  children: [
    {
      name: string;
      age: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

interface counselor {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  email: string;
  maritalStatus: string;
  address: string;
  profession: string;
  chantingRounds: number;
  chantingStartedThisRoundsDate: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  harinamInitiationPlace: string;
  children: [
    {
      name: string;
      age: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
  husband: counselor;
}

interface Activities {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface sessions {
  id: string;
  name: string;
  description: string;
  startTime: string;
  expired: boolean;
  modeOfAttendance: string;
  createdAt: string;
  updatedAt: string;
}

interface courses {
  id: string;
  code: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface counseleeActivities {
  counselee: counselee;
  description: string;
  counselor: counselor;
  activity: Activities;
  activityDate: string;
}

interface Attendance {
  id: string;
  type: string;
  isRSVP: boolean;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  counselee: counselee;
  counselor: counselor;
  modeOfAttendance: string;
  cbmMeeting: cbmMeeting;
  scheduledSession: scheduledSession;
}

interface scheduledSession {
  name: string;
  description: string;
  startTime: string;
  modeOfAttendance: string;
  course: courses;
  counselor: counselor;
}

interface cbmMeeting {
  id: string;
  name: string;
  description: string;
  startTime: string;
  expired: boolean;
  modeOfAttendance: string;
  createdAt: string;
  updatedAt: string;
}

interface Sadhana {
  id: string;
  numberOfRounds: string;
  earlyJapaRoundsBefore8AM: number;
  earlyJapaRoundsAfter8AM: number;
  first8RoundsCompletedTime: string;
  next8RoundsCompletedTime: string;
  wakeUpTime: string;
  sleepTime: string;
  prabhupadaBookReading: number;
  nonPrabhupadaBookReading: number;
  prabhupadaClassHearing: number;
  guruClassHearing: number;
  otherClassHearing: number;
  speaker: string;
  attendedArti: boolean;
  mobileInternetUsage: number;
  sadhanaDate: string;
  topic: string;
  visibleSadhana: string;
  createdAt: string;
  updatedAt: string;
  counselee: counselee;
  counselor: counselor;
}

interface attendanceCBM {
  id: string;
  reasonForCounselorChange: string;
  alreadySpokenToExistingCounselor: true;
  alreadySpokenToNewCounselor: true;
  statusOfChange: string;
  createdAt: string;
  updatedAt: string;
  modeOfAttendance: string;
  counselee: counselee;
  preferedCounselor1: counselor;
  preferedCounselor2: counselor;
  preferedCounselor3: counselor;
}

interface counselee {
  id: string;
  reasonForCounselorChange: string;
  alreadySpokenToExistingCounselor: true;
  alreadySpokenToNewCounselor: true;
  statusOfChange: string;
  createdAt: string;
  updatedAt: string;
  counselee: counselee;
  preferedCounselor1: counselor;
  preferedCounselor2: counselor;
  preferedCounselor3: counselor;
}

interface counselor {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  email: string;
  password: string;
  maritalStatus: string;
  husband: string;
  address: string;
  profession: string;
  chantingRounds: Number;
  chantingStartedThisRoundsDate: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  children?: [
    {
      name: string;
      age: 0;
    }
  ];
}

interface counselor {
  id: string;
  firstName: string;
  lastName: string;
  initiatedName: string;
  phoneNumber: string;
  gender: string;
  age: number;
  email: string;
  password: string;
  maritalStatus: string;
  husband: string;
  address: string;
  profession: string;
  chantingRounds: Number;
  chantingStartedThisRoundsDate: string;
  yourInitiatingSpiritualMaster: string;
  harinamInitiationDate: string;
  children?: [
    {
      name: string;
      age: 0;
    }
  ];
}
