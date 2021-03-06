import { connect } from 'react-redux'
import TimeTable from '../components/molecules/TimeTable'
import {
  addToNotRecommendsRequest, bookmarkRequest, copyToMyTimeTableRequest, getEvaluationsRequest, sendTimeTable,
  setErrors
} from '../store/ttrs/actions'
import { initialErrorUnit } from '../store/ttrs/selectors'

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
    haveSidebar: props.haveSidebar,
    isRecommended: props.isRecommended,
    haveSelection: props.haveSelection,
    isReceived: props.isReceived,
    sender: props.sender,
    type: props.type,
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
    onSendToSelf: () => {
      dispatch(setErrors('sendTimeTable', initialErrorUnit, 'You cannot send timetable to yourself.'))
    },
    onModifyContent: props.onModifyContent,
    onAddLecture: props.onAddLecture,
    onDeleteLecture: props.onDeleteLecture,
    onDeleteTimeTable: props.onDeleteTimeTable,
    onOpenSidebar: props.onOpenSidebar,
    onShowPrevRecommend: props.onShowPrevRecommend,
    onShowNextRecommend: props.onShowNextRecommend,
    onSelectBlocks: props.onSelectBlocks,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable)
