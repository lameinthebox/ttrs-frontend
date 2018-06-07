import { initialState, initialTimeTable, initialError, initialResponse, initialSearch } from './selectors'
import * as actions from './actions'
import { SET_FIELDS_AND_TYPES } from './actions'

const studentInfo = (state = [], action) => {
  switch (action.type) {
    case actions.SIGN_IN_RESPONSE:
      return {
        ...state,
        ...action.studentInfo,
      }
    case actions.UPDATE_STUDENT_INFO_RESPONSE:
      return {
        ...state,
        ...action.info,
      }
    case actions.ADD_TO_NOT_RECOMMENDS_RESPONSE:
      return {
        ...state,
        notRecommends: action.notRecommends,
      }
    case actions.DELETE_FROM_NOT_RECOMMENDS_RESPONSE:
      return {
        ...state,
        notRecommends: action.notRecommends,
      }
    default:
      return state
  }
}

const belongInfo = (state = [], action) => {
  switch (action.type) {
    case actions.GET_COLLEGE_LIST:
      return {
        colleges: action.colleges,
      }
    default:
      return state
  }
}

const timeTable = (state = [], action) => {
  let bookmarkedTimeTables
  let bookmarkedTimeTable
  let receivedTimeTables
  let lectures
  let creditSum
  switch (action.type) {
    case actions.CREATE_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTable: action.myTimeTable,
      }
    case actions.ADD_LECTURE_TO_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          lectures: [
            ...state.myTimeTable.lectures,
            action.newLecture,
          ],
        },
      }
    case actions.UPDATE_MY_TIME_TABLE_INFO:
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          ...action.updatedInfo,
        },
      }
    case actions.DELETE_LECTURE_FROM_MY_TIME_TABLE:
      lectures = []
      state.myTimeTable.lectures.forEach((lecture) => {
        if (lecture.id !== action.lectureId) {
          lectures.push(lecture)
        }
      })
      return {
        ...state,
        myTimeTable: {
          ...state.myTimeTable,
          lectures,
        },
      }
    case actions.CREATE_BOOKMARKED_TIME_TABLES:
      return {
        ...state,
        bookmarkedTimeTables: [...action.bookmarkedTimeTables],
        bookmarkedTimeTable: action.bookmarkedTimeTables.length === 0 ? initialTimeTable.bookmarkedTimeTable : action.bookmarkedTimeTables[0],
      }
    case actions.SELECT_BOOKMARKED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        bookmarkedTimeTable: action.bookmarkedTimeTable,
      }
    case actions.ADD_LECTURE_TO_BOOKMARKED_TIME_TABLE:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.forEach((timeTable, index) => {
        if (timeTable.id === action.timeTableId) {
          bookmarkedTimeTables[index] = {
            ...state.bookmarkedTimeTable,
            lectures: [
              ...state.bookmarkedTimeTable.lectures,
              action.newLecture,
            ],
            creditSum: state.bookmarkedTimeTable.creditSum + action.newLecture.course.credit,
          }
          bookmarkedTimeTable = bookmarkedTimeTables[index]
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable,
      }
    case actions.UPDATE_BOOKMARKED_TIME_TABLE_INFO:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.forEach((timeTable, index) => {
        if (timeTable.id === action.timeTableId) {
          bookmarkedTimeTables[index] = {
            ...state.bookmarkedTimeTable,
            ...action.updatedInfo,
          }
          bookmarkedTimeTable = bookmarkedTimeTables[index]
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable,
      }
    case actions.BOOKMARK_RESPONSE:
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.push(action.bookmarkedTimeTable)
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: bookmarkedTimeTables.length === 1 ? action.bookmarkedTimeTable : state.bookmarkedTimeTable,
      }
    case actions.DELETE_LECTURE_FROM_BOOKMARKED_TIME_TABLE:
      lectures = []
      creditSum = state.bookmarkedTimeTable.creditSum
      state.bookmarkedTimeTable.lectures.forEach((lecture) => {
        if (lecture.id !== action.deleteLectureId) {
          lectures.push(lecture)
        } else {
          creditSum -= lecture.course.credit
        }
      })
      bookmarkedTimeTables = [...state.bookmarkedTimeTables]
      bookmarkedTimeTables.forEach((timeTable, index) => {
        if (timeTable.id === action.timeTableId) {
          bookmarkedTimeTables[index] = {
            ...state.bookmarkedTimeTable,
            lectures,
            creditSum,
          }
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: {
          ...state.bookmarkedTimeTable,
          lectures: [
            ...lectures,
          ],
          creditSum,
        },
      }
    case actions.CREATE_RECEIVED_TIME_TABLES:
      return {
        ...state,
        receivedTimeTables: [...action.receivedTimeTables],
        receivedTimeTable: action.receivedTimeTables.length === 0 ? initialTimeTable.receivedTimeTable : action.receivedTimeTables[0],
      }
    case actions.SELECT_RECEIVED_TIME_TABLE_RESPONSE:
      receivedTimeTables = [...state.receivedTimeTables]
      receivedTimeTables[action.index] = {
        ...action.receivedTimeTable,
      }
      return {
        ...state,
        receivedTimeTables: [...receivedTimeTables],
        receivedTimeTable: action.receivedTimeTable,
      }
    case actions.CREATE_RECOMMENDED_TIME_TABLES:
      return {
        ...state,
        recommendedTimeTables: [...action.recommendedTimeTables],
        recommendedTimeTable: action.recommendedTimeTables.length === 0 ? initialTimeTable.recommendedTimeTable : action.recommendedTimeTables[0],
      }
    case actions.SELECT_RECOMMENDED_TIME_TABLE_RESPONSE:
      return {
        ...state,
        recommendedTimeTable: action.recommendedTimeTable,
      }
    case actions.COPY_TO_MY_TIME_TABLE_RESPONSE:
      return {
        ...state,
        myTimeTable: action.myTimeTable,
      }
    case actions.DELETE_MY_TIME_TABLE:
      return {
        ...state,
        myTimeTable: initialTimeTable.myTimeTable,
      }
    case actions.DELETE_BOOKMARKED_TIME_TABLE:
      bookmarkedTimeTables = []
      state.bookmarkedTimeTables.forEach((timeTable) => {
        if (timeTable.id !== action.timeTableId) {
          bookmarkedTimeTables.push(timeTable)
        }
      })
      return {
        ...state,
        bookmarkedTimeTables: [...bookmarkedTimeTables],
        bookmarkedTimeTable: action.timeTable,
      }
    case actions.DELETE_RECEIVED_TIME_TABLE:
      receivedTimeTables = []
      state.receivedTimeTables.forEach((timeTable) => {
        if (timeTable.id !== action.timeTableId) {
          receivedTimeTables.push(timeTable)
        }
      })
      return {
        ...state,
        receivedTimeTables: [...receivedTimeTables],
        receivedTimeTable: action.timeTable,
      }
    default:
      return state
  }
}

const search = (state = [], action) => {
  let lectures = []
  switch (action.type) {
    case actions.SEARCH_LECTURE_RESPONSE:
      return {
        ...state,
        lectures: action.lectures,
        count: action.count,
      }
    case actions.SET_EVALUATIONS_RESPONSE:
      lectures = state.lectures
      lectures.forEach((lecture, index) => {
        if (lecture.id === action.lectureDetail.id) {
          lectures[index] = action.lectureDetail
        }
      })
      return {
        ...state,
        lectures: [...lectures],
      }
    case actions.CLEAR_SEARCH_LECTURE:
      return initialSearch
    default:
      return state
  }
}

const error = (state = initialError, action) => {
  switch (action.type) {
    case actions.CLEAR_STATE:
      return initialError
    case actions.SET_ERRORS:
      return {
        ...state,
        [action.identifier]: action.errors,
      }
    default:
      return state
  }
}

const newResponse = (response, success) => {
  return success ? Math.max(1, response + 1) : Math.min(-1, response - 1)
}

const response = (state = initialResponse, action) => {
  switch (action.type) {
    case actions.CLEAR_STATE:
      return initialResponse
    case actions.SIGN_UP_RESPONSE:
      return {
        ...state,
        signUp: newResponse(state.signUp, true),
      }
    case actions.UPDATE_STUDENT_INFO_RESPONSE:
      return {
        ...state,
        settingsTab: newResponse(state.settingsTab, true),
      }
    case actions.SET_ERRORS:
      return (Object.keys(action.errors.bools).length > 0 || Object.keys(action.errors.texts).length > 0)
        ? {
          ...state,
          [action.identifier]: newResponse(state[action.identifier], false),
        }
        : state
    default:
      return state
  }
}

const ttrsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_SEMESTER_LIST:
      return {
        ...state,
        semesters: action.semesters,
      }
    case actions.SIGN_IN_RESPONSE:
      return {
        ...state,
        studentInfo: studentInfo(state.studentInfo, action),
        toHome: true,
      }
    case actions.SIGN_UP_RESPONSE:
      return {
        ...state,
        toSignIn: true,
        response: response(state.response, action),
      }
    case actions.CLEAR_STATE:
      return {
        ...initialState,
        belongInfo: belongInfo(state.belongInfo, action),
        semesters: state.semesters,
      }
    case actions.SET_NOT_RECOMMEND_COURSES:
      return {
        ...state,
        notRecommendCourses: action.notRecommendCourses,
      }
    case actions.SET_EVALUATIONS_RESPONSE:
      return {
        ...state,
        evaluations: action.evaluations,
        lectureDetail: action.lectureDetail,
        search: search(state.search, action),
      }
    case actions.SET_FIELDS_AND_TYPES:
      return {
        ...state,
        fields: action.fields,
        types: action.types,
      }
    default:
      return {
        ...state,
        studentInfo: studentInfo(state.studentInfo, action),
        belongInfo: belongInfo(state.belongInfo, action),
        timeTable: timeTable(state.timeTable, action),
        search: search(state.search, action),
        error: error(state.error, action),
        response: response(state.response, action),
      }
  }
}

export default ttrsReducer
