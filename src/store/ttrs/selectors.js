export const initialState = {
  username: undefined,
  password: undefined,
  email: undefined,
  grade: undefined,
  college: undefined,
  department: undefined,
  major: undefined,
  notRecommends: [],
  myTimeTables: [],
  bookmarkedTimeTables: [],
  receivedTimeTables: [],
  colleges: [],
  departments: [],
  majors: [],
  isSignedIn: false,
  isSignUpPage: false,
  tabs: {
    isRecommendTab: true,
    isBookmarkTab: false,
    isReceivedTab: false,
    isSettingTab: false,
  },
  title: 'write title',
  memo: 'write memo',
  timeSlots: [],
  lectures: [],
  lecturesOfMyTimeTable: []
}
