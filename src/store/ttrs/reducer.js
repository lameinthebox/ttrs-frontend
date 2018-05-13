import { initialState } from './selectors'
import * as actions from './actions'

const tabs = (state = [], action) => {
  switch (action.type) {
    case actions.RECOMMENDTAB_REQUEST:
      return {
        isRecommendTab: true,
        isBookmarkTab: false,
        isReceivedTab: false,
        isSettingTab: false,
      }
    case actions.BOOKMARKTAB_REQUEST:
      return {
        isRecommendTab: false,
        isBookmarkTab: true,
        isReceivedTab: false,
        isSettingTab: false,
      }
    case actions.RECEIVEDTAB_REQUEST:
      return {
        isRecommendTab: false,
        isBookmarkTab: false,
        isReceivedTab: true,
        isSettingTab: false,
      }
    case actions.SETTINGTAB_REQUEST:
      return {
        isRecommendTab: false,
        isBookmarkTab: false,
        isReceivedTab: false,
        isSettingTab: true,
      }
  }
}

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGNIN_RESPONSE:
      return {
        ...state,
        ...action.studentInfo,
        isSignedIn: true,
      }
    case actions.GO_SIGNUPPAGE_REQUEST:
      return {
        ...state,
        isSignUpPage: true,
      }
    case actions.CLEAR_STATE_REQUEST:
      return {
        ...initialState,
        colleges: state.colleges,
        departments: state.colleges[0].departments,
        majors: state.colleges[0].departments[0].majors,
      }
    case actions.RECOMMENDTAB_REQUEST:
      return {
        ...state,
        tabs: tabs(state.tabs, action),
      }
    case actions.BOOKMARKTAB_REQUEST:
      return {
        ...state,
        tabs: tabs(state.tabs, action),
      }
    case actions.RECEIVEDTAB_REQUEST:
      return {
        ...state,
        tabs: tabs(state.tabs, action),
      }
    case actions.SETTINGTAB_REQUEST:
      return {
        ...state,
        tabs: tabs(state.tabs, action),
      }
    case actions.MODIFY_MEMO_REQUEST:
      return {
        ...state,
        memo: action.content,
      }
    case actions.MODIFY_TITLE_REQUEST:
      return {
        ...state,
        title: action.content,
      }
    case actions.GET_COLLEGELIST_RESPONSE:
      return {
        ...state,
        colleges: action.colleges,
        departments: action.colleges[0].departments,
        majors: action.colleges[0].departments[0].majors,
      }
    case actions.CHANGE_DEPARTMENTLIST_REQUEST:
      console.log(action.collegeIndex)
      console.log(state.colleges)
      return {
        ...state,
        departments: state.colleges[action.collegeIndex].departments,
        majors: state.colleges[action.collegeIndex].departments.length === 0 ? [] : state.colleges[action.collegeIndex].departments[0].majors,
      }
    case actions.CHANGE_MAJORLIST_REQUEST:
      return {
        ...state,
        majors: action.departmentIndex === '' ? [] : state.departments[action.departmentIndex].majors,
      }
    case actions.SEARCH_LECTURE_RESPONSE:
      return {
        ...state,
        lectures: action.lectures,
      }
    case actions.GET_MYTIMETABLE_RESPONSE:
      return {
        ...state,
        lecturesOfMyTimeTable: action.lecturesOfMyTimeTable,
      }
    case actions.ADD_LECTURE_TO_MY_TIMETABLE_RESPONSE:
      return {
        ...state,
        lecturesOfMyTimeTable: [
          ...state.lecturesOfMyTimeTable,
          action.lecture
        ]
      }
    default:
      return state
  }
}

export default ttrsReducer
