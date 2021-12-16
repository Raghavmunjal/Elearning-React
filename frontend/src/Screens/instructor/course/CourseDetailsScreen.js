import React, { useState, useEffect } from "react";
import axios from "axios";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import ReactMarkdown from "react-markdown";

const CourseDetailsScreen = ({ history, match }) => {
  const [course, setCourse] = useState({});
  const paramsSlug = match.params.slug;

  useEffect(() => {
    loadCourse();
    // eslint-disable-next-line
  }, [paramsSlug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${paramsSlug}`);
    setCourse(data);
  };

  return (
    <div className="container-fluid gap">
      <h1>{paramsSlug}</h1>
      {/* <pre>{JSON.stringify(course, null, 4)}</pre> */}
      {course && (
        <div className="pt-1">
          <div className="media pt-2">
            <Avatar
              size={80}
              src={course && course.image && course.image.Location}
            />
            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <h5 className="mt-2 text-primary">{course.name}</h5>
                  <p>{course.lessons && course.lessons.length} Lessons</p>
                  <h4>{course.category}</h4>
                </div>
                <div className="d-flex pt-4">
                  <Tooltip title="Edit Course">
                    <EditOutlined className="h5 pointer text-success" />
                  </Tooltip>
                  <Tooltip title="Publish">
                    <CheckOutlined className="h5 pointer text-primary" />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ReactMarkdown children={course.description} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailsScreen;
