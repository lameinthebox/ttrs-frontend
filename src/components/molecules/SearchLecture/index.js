import React from 'react'
import Lecture from '../../atoms/Lecture'
import Button from '../../atoms/Button'


export const SearchLecture = ({ isSignedIn, lectures, onSearchLecture, onAddLectureToTimeTable }) => {
  let inputCourseName

  const onSubmitCourseName = () => {
    onSearchLecture(inputCourseName.value)
  }

  if (isSignedIn) {
    return (
      <div>
        <input ref={node => { inputCourseName = node }} placeholder={'type course name'} /> <br />
        <Button type="submit" onClick={onSubmitCourseName}>Search</Button>
        <br />
        Lectures
        {lectures.map(lecture =>
          <div>
            <Lecture
            key={lecture.id}
            {...lecture}
            />
            <Button
              key={lecture.id+1}
              type="submit"
              onClick={() => onAddLectureToTimeTable(lecture.id)}
            >Add To TimeTable</Button>
          </div>
        )}
      </div>
    )
  }
  return null
}

export default SearchLecture
