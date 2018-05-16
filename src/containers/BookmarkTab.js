import { connect } from 'react-redux'
import BookmarkTab from '../components/organisms/BookmarkTab'
import { selectBookmarkedTimeTableRequest, updateBookmarkedTimeTableRequest, updateMyTimeTableRequest } from '../store/ttrs/actions'

const mapStateToProps = (state) => {
  return {
    isMainPage: state.ttrs.isMainPage,
    currentTab: state.ttrs.currentTab,
    myTimeTable: state.ttrs.timeTable.myTimeTable,
    bookmarkedTimeTables: state.ttrs.timeTable.bookmarkedTimeTables,
    bookmarkedTimeTable: state.ttrs.timeTable.bookmarkedTimeTable,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSelectBookmarkedTimeTable: (bookmarkedTimeTable) => {
      dispatch(selectBookmarkedTimeTableRequest(bookmarkedTimeTable))
    },
    onUpdateMyTimeTable: (myTimeTableId, updatedInfo, newLectureId) => {
      dispatch(updateMyTimeTableRequest(myTimeTableId, updatedInfo, newLectureId))
    },
    onUpdateBookmarkedTimeTable: (index, timeTableId, updatedInfo, deleteLectureId) => {
      dispatch(updateBookmarkedTimeTableRequest(index, timeTableId, updatedInfo, deleteLectureId))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkTab)
