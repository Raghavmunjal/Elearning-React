import InstructorNav from "../../components/nav/InstructorNav";

const instructorIndex = () => {
  return (
    <>
      <div className="container-fluid gap">
        <div className="row">
          <div className="col-md-2 text-center">
            <InstructorNav />
          </div>
          <div className="col-md-10">Hey Instructor</div>
        </div>
      </div>
    </>
  );
};

export default instructorIndex;
