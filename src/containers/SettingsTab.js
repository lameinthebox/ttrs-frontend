import { connect } from 'react-redux'
import SettingsTab from '../components/organisms/SettingsTab'
import { deleteFromNotRecommendsRequest, getNotRecommendCoursesRequest, setErrors,
  updateStudentInfoRequest, withdrawRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    password: state.ttrs.studentInfo.password,
    grade: state.ttrs.studentInfo.grade,
    college: state.ttrs.studentInfo.college,
    department: state.ttrs.studentInfo.department,
    major: state.ttrs.studentInfo.major,
    notRecommends: state.ttrs.studentInfo.notRecommends,
    notRecommendCourses: state.ttrs.notRecommendCourses,
    colleges: state.ttrs.belongInfo.colleges,
    errors: state.ttrs.error.settingsTab,
    notRecommendsLoading: state.ttrs.loading.notRecommendsLoading,
    updateProfileLoading: state.ttrs.loading.updateProfileLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateInfo: (info) => {
      dispatch(updateStudentInfoRequest(info))
    },
    onWithdraw: () => {
      dispatch(withdrawRequest())
    },
    onGetNotRecommendCourses: (notRecommends) => {
      dispatch(getNotRecommendCoursesRequest(notRecommends))
    },
    onDeleteFromNotRecommends: (notRecommends, courseId) => {
      dispatch(deleteFromNotRecommendsRequest(notRecommends, courseId))
    },
    onSetError: (errors) => {
      dispatch(setErrors('settingsTab', errors))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
