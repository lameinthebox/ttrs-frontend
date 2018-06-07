import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import { addToNotRecommendsRequest, bookmarkRequest, copyToMyTimeTableRequest, getEvaluationsRequest, sendTimeTable } from '../store/ttrs/actions'

const mapStateToProps = (state, props) => {
  return {
    username: state.ttrs.studentInfo.username,
    id: props.id,
    memo: props.memo,
    title: props.title,
    lectures: props.lectures,
    canModify: props.canModify,
    canCopyToMy: props.canCopyToMy,
    canDelete: props.canDelete,
    canCreate: props.canCreate,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onCopyToMy: (timeTableId) => {
      dispatch(copyToMyTimeTableRequest(timeTableId))
    },
    onBookmark: (timeTableId) => {
      dispatch(bookmarkRequest(timeTableId))
    },
    onSend: (sendInfo) => {
      dispatch(sendTimeTable(sendInfo))
    },
    onModifyContent: props.onModifyContent,
    onAddLecture: props.onAddLecture,
    onDeleteLecture: props.onDeleteLecture,
    onDeleteTimeTable: props.onDeleteTimeTable,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
