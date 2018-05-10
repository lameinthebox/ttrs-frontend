import { take, put, call, fork } from 'redux-saga/effects'
import api from '../../services/api'
import * as actions from './actions'

const url = 'http://127.0.0.1:8000/'

function* getCollegeList() {
  try {
    const collegeListResponse = yield call(api.get, `${url}ttrs/colleges/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log(collegeListResponse)
    yield put(actions.getCollegeListResponse(collegeListResponse))
  } catch (error) {
    console.log('Failed to get college list')
  }
}

function* signIn(username, password) {
  try {
    const hash = new Buffer(`${username}:${password}`).toString('base64')
    const signInResponse = yield call(api.get, `${url}ttrs/students/my/`, {
      headers: {
        Authorization: `Basic ${hash}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    // const grade = studentInfoResponse.grade
    // const college = studentInfoResponse.college
    // const department = studentInfoResponse.department
    // const major = studentInfoResponse.major
    // const notRecommends = studentInfoResponse.not_recommends
    // yield put(actions.signInResponse({ username, password, grade, college, department, major, notRecommends }))
    yield put(actions.signInResponse({ username, password }))
  } catch (error) {
    console.log('Invalid user')
  }
}

function* signUp(studentInfo) {
  try {
    const signUpResponse = yield call(fetch, `${url}ttrs/students/signup/`, {
      method: 'POST',
      body: studentInfo && JSON.stringify(studentInfo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log(signUpResponse)
    yield put(actions.signUpResponse(studentInfo))
  } catch (error) {
    console.log('Failed to sign up')
    console.log(error)
  }
}

function* watchSignInRequest() {
  while (true) {
    const { username, password } = yield take(actions.SIGNIN_REQUEST)
    yield call(signIn, username, password)
  }
}

function* watchSignUpRequest() {
  while (true) {
    const { studentInfo } = yield take(actions.SIGNUP_REQUEST)
    yield call(signUp, studentInfo)
  }
}

export default function* () {
  yield call(getCollegeList)
  yield fork(watchSignInRequest)
  yield fork(watchSignUpRequest)
}
