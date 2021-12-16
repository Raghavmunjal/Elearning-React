import React, { useState, useEffect } from "react";
import InstructorNav from "../../components/nav/InstructorNav";
import axios from "axios";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/course//instructor-courses");
    setCourses(data);
  };

  return (
    <>
      <div className="container-fluid gap">
        <div className="row">
          <div className="col-md-2 text-center">
            <InstructorNav />
          </div>
          <div className="col-md-10">
            <h1>Hey Instructor</h1>
            {JSON.stringify(courses)}
            {courses &&
              courses.map((c) => (
                <div key={c._id}>
                  <div className="media pt-2">
                    <Avatar size={80} src={c.image.Location} />
                    <div className="media-body pl-2">
                      <div className="row">
                        <div className="col">
                          <Link
                            to={`/instructor/course/${c.slug}`}
                            className="pointer"
                          >
                            <span className="h5 mt-2 text-primary">
                              {c.name}
                            </span>
                          </Link>
                          <p style={{ marginTop: "7px" }}>
                            {c.lessons.length} Lessons
                          </p>

                          {c.lessons.length < 5 ? (
                            <p>At least 5 lessons are required to publish</p>
                          ) : c.published ? (
                            <p>Your course is live in marketplace</p>
                          ) : (
                            <p>Your course is ready to be published</p>
                          )}
                        </div>
                        <div className="col-md-3 mt-3 text-center">
                          {c.published ? (
                            <div>
                              <CheckCircleOutlined className="h5 pointer text-success" />
                            </div>
                          ) : (
                            <div>
                              <CloseCircleOutlined className="h5 pointer text-danger" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorIndex;
