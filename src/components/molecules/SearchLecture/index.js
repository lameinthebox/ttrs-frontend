import React from 'react'
import PropTypes from 'prop-types'
import { Button, Form, Modal, Card, Pagination, Icon, Grid, Divider } from 'semantic-ui-react'
import Lecture from '../../../containers/Lecture'

const limit = 6

class SearchLecture extends React.Component {
  state = {
    'course.name.abbrev': '',
    'course.code': '',
    instructor: '',
    collegeIndex: null,
    departmentIndex: null,
    majorIndex: null,
    'course.type': null,
    'course.grade': null,
    'course.credit.gte': '',
    'course.credit.lte': '',
    page: 1,
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSearchLecture = (page = 1) => {
    const options = {
      limit,
      offset: (page - 1) * limit,
    }
    if (this.state['course.name.abbrev']) {
      options['course.name.abbrev'] = this.state['course.name.abbrev']
    }
    if (this.state['course.code']) {
      options['course.code'] = this.state['course.code']
    }
    if (this.state.instructor) {
      options.instructor = this.state.instructor
    }
    if (this.state.collegeIndex !== null) {
      options['course.college'] = this.props.colleges[this.state.collegeIndex].id
      if (this.state.departmentIndex !== null) {
        options['course.department'] = this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].id
        if (this.state.majorIndex !== null) {
          options['course.major'] = this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].majors[this.state.majorIndex].id
        }
      }
    }
    if (this.state['course.type']) {
      options['course.type'] = this.state['course.type']
    }
    if (this.state['course.grade']) {
      options['course.grade'] = this.state['course.grade']
    }
    if (this.state['course.credit.gte']) {
      options['course.credit.gte'] = this.state['course.credit.gte']
    }
    if (this.state['course.credit.lte']) {
      options['course.credit.lte'] = this.state['course.credit.lte']
    }
    this.props.onSearchLecture(options)
  }

  handlePageChange = (e, { activePage }) => {
    this.setState({ page: activePage })
    this.handleSearchLecture(activePage)
  }

  render() {
    const collegeOptions = [{ key: -1, text: '---', value: null }]
    collegeOptions.push(...this.props.colleges.map((college, index) => ({
      key: college.id,
      text: college.name,
      value: index,
    })))
    const departmentOptions = [{ key: -1, text: '---', value: null }]
    if (this.state.collegeIndex !== null) {
      departmentOptions.push(...this.props.colleges[this.state.collegeIndex].departments.map((department, index) => ({
        key: department.id,
        text: department.name,
        value: index,
      })))
    }
    const majorOptions = [{ key: -1, text: '---', value: null }]
    if (this.state.departmentIndex !== null) {
      majorOptions.push(...this.props.colleges[this.state.collegeIndex].departments[this.state.departmentIndex].majors.map((major, index) => ({
        key: major.id,
        text: major.name,
        value: index,
      })))
    }
    const typeOptions = ['교양', '전필', '전선', '일선', '교직'].map(type => ({ key: type, text: type, value: type }))
    const gradeOptions = [1, 2, 3, 4, 5, 6].map(grade => ({ key: grade, text: grade, value: grade }))
    return (
      <div>
        <Modal
          open
          size="fullscreen"
          style={{
            marginTop: '0px !important',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          closeOnDimmerClick={false}
        >
          <Modal.Header>
            Search Lecture
          </Modal.Header>
          <Modal.Content>
            <Form
              onSubmit={() => {
                this.setState({ page: 1 })
                this.handleSearchLecture()
              }}
            >
              <Grid>
                <Grid.Row columns={5}>
                  <Grid.Column>
                    <Form.Input
                      label="Course Name"
                      name="course.name.abbrev"
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      label="Course Code"
                      name="course.code"
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Input
                      label="Instructor"
                      name="instructor"
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={5}>
                  <Grid.Column>
                    <Form.Select
                      label="College"
                      placeholder="College"
                      options={collegeOptions}
                      name="collegeIndex"
                      value={this.state.collegeIndex}
                      onChange={(e, { name, value }) => {
                        this.setState({ [name]: value })
                        this.setState({ departmentIndex: null })
                        this.setState({ majorIndex: null })
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Select
                      label="Department"
                      placeholder="Department"
                      options={departmentOptions}
                      name="departmentIndex"
                      value={this.state.departmentIndex}
                      onChange={(e, { name, value }) => {
                        this.setState({ [name]: value })
                        this.setState({ majorIndex: null })
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Select
                      label="Major"
                      placeholder="Major"
                      options={majorOptions}
                      name="majorIndex"
                      value={this.state.majorIndex}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row columns={5}>
                  <Grid.Column>
                    <Form.Select
                      label="Type"
                      placeholder="Type"
                      options={typeOptions}
                      name="course.type"
                      value={this.state['course.type']}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Select
                      label="Grade"
                      placeholder="Grade"
                      options={gradeOptions}
                      name="course.grade"
                      value={this.state['course.grade']}
                      onChange={this.handleChange}
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Group inline>
                      <Form.Input
                        label="Credit"
                        placeholder="GTE"
                        name="course.credit.gte"
                        onChange={this.handleChange}
                      />
                      <span style={{ marginTop: 10 }}>~&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <Form.Input
                        label={''}
                        placeholder="LTE"
                        name="course.credit.lte"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
              <Form.Button
                style={{ float: 'right', marginTop: -3 }}
                color="teal"
                type="submit"
                content="Search"
              />
            </Form>
            <Divider style={{ marginRight: 2 }} />
          </Modal.Content>
          <div className="scrolling content">
            <Card.Group itemsPerRow={3} doubling stackable>
              {this.props.searchLectures.map(lecture =>
                <Lecture
                  key={lecture.id}
                  lecture={lecture}
                  onAddLecture={() => this.props.onAddLecture(lecture.id)}
                  onAddToNotRecommends={() => this.props.onAddToNotRecommends(lecture.course.id)}
                />
              )}
            </Card.Group>
          </div>
          <Modal.Actions>
            {this.props.count > 0 &&
            <div align="center">
              <Pagination
                ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
                firstItem={{ content: <Icon name="angle double left" />, icon: true }}
                lastItem={{ content: <Icon name="angle double right" />, icon: true }}
                prevItem={{ content: <Icon name="angle left" />, icon: true }}
                nextItem={{ content: <Icon name="angle right" />, icon: true }}
                totalPages={Math.floor((this.props.count - 1) / limit) + 1}
                activePage={this.state.page}
                onPageChange={this.handlePageChange}
              />
            </div>}
            <Button onClick={this.props.onClose} content="Close" />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

SearchLecture.propTypes = {
  searchLectures: PropTypes.array,
  count: PropTypes.number,
  colleges: PropTypes.array,
  onSearchLecture: PropTypes.func,
  onAddLecture: PropTypes.func,
  onAddToNotRecommends: PropTypes.func,
  onClose: PropTypes.func,
}

export default SearchLecture
