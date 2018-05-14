export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_RESPONSE = 'SIGN_IN_RESPONSE'
export const GO_SIGN_UP_PAGE = 'GO_SIGN_UP_PAGE'
export const SIGN_UP = 'SIGN_UP'
export const CLEAR_STATE = 'CLEAR_STATE'
export const GO_RECOMMEND_TAB = 'GO_RECOMMEND_TAB'
export const GO_BOOKMARK_TAB = 'GO_BOOKMARK_TAB'
export const GO_RECEIVE_TAB = 'GO_RECEIVE_TAB'
export const GO_SETTINGS_TAB = 'GO_SETTINGS_TAB'
export const MODIFY_MEMO = 'MODIFY_MEMO'
export const MODIFY_TITLE = 'MODIFY_TITLE'
export const GET_COLLEGE_LIST = 'GET_COLLEGE_LIST'
export const CHANGE_DEPARTMENT_LIST = 'CHANGE_DEPARTMENT_LIST'
export const CHANGE_MAJOR_LIST = 'CHANGE_MAJOR_LIST'
export const SEARCH_LECTURE_REQUEST = 'SEARCH_LECTURE_REQUEST'
export const SEARCH_LECTURE_RESPONSE = 'SEARCH_LECTURE_RESPONSE'
export const GET_MY_TIME_TABLE = 'GET_MY_TIME_TABLE'
export const ADD_LECTURE_TO_MY_TIME_TABLE_REQUEST = 'ADD_LECTURE_TO_MY_TIME_TABLE_REQUEST'
export const ADD_LECTURE_TO_MY_TIME_TABLE_RESPONSE = 'ADD_LECTURE_TO_MY_TIME_TABLE_RESPONSE'


export const signInRequest = (username, password) => {
  return {
    type: SIGN_IN_REQUEST,
    username,
    password,
  }
}

export const signInResponse = (studentInfo) => {
  return {
    type: SIGN_IN_RESPONSE,
    studentInfo,
  }
}

export const goSignUpPage = () => {
  return {
    type: GO_SIGN_UP_PAGE,
  }
}

export const signUp = (studentInfo) => {
  return {
    type: SIGN_UP,
    studentInfo,
  }
}

export const clearState = () => {
  return {
    type: CLEAR_STATE,
  }
}

export const goRecommendTab = () => {
  return {
    type: GO_RECOMMEND_TAB,
  }
}

export const goBookmarkTab = () => {
  return {
    type: GO_BOOKMARK_TAB,
  }
}

export const goReceiveTab = () => {
  return {
    type: GO_RECEIVE_TAB,
  }
}

export const goSettingsTab = () => {
  return {
    type: GO_SETTINGS_TAB,
  }
}

export const modifyMemo = (content) => {
  return {
    type: MODIFY_MEMO,
    content,
  }
}

export const modifyTitle = (content) => {
  return {
    type: MODIFY_TITLE,
    content,
  }
}

export const getCollegeList = (colleges) => {
  return {
    type: GET_COLLEGE_LIST,
    colleges,
  }
}

export const changeDepartmentList = (collegeIndex) => {
  return {
    type: CHANGE_DEPARTMENT_LIST,
    collegeIndex,
  }
}

export const changeMajorList = (departmentIndex) => {
  return {
    type: CHANGE_MAJOR_LIST,
    departmentIndex,
  }
}

export const searchLectureRequest = (courseName) => {
  return {
    type: SEARCH_LECTURE_REQUEST,
    courseName,
  }
}

export const searchLectureResponse = (lectures) => {
  return {
    type: SEARCH_LECTURE_RESPONSE,
    lectures,
  }
}

export const getMyTimeTable = (lectures) => {
  return {
    type: GET_MY_TIME_TABLE,
    lectures,
  }
}

export const addLectureToMyTimeTableRequest = (lectureIds, newLectureId) => {
  return {
    type: ADD_LECTURE_TO_MY_TIME_TABLE_REQUEST,
    lectureIds,
    newLectureId,
  }
}

export const addLectureToMyTimeTableResponse = (lecture) => {
  return {
    type: ADD_LECTURE_TO_MY_TIME_TABLE_RESPONSE,
    lecture,
  }
}
