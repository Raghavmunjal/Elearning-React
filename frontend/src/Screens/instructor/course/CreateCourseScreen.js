import { useState } from "react";
import Resizer from "react-image-file-resizer";
import InstructorNav from "../../../components/nav/InstructorNav";
import CourseCreateForm from "../../../components/forms/CourseCreate";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import axios from "axios";

const CreateCourseScreen = () => {
  const history = useHistory();

  const [values, setVaues] = useState({
    name: "",
    description: "",
    price: "3499",
    uploading: false,
    paid: true,
    loading: false,
    category: "development",
  });
  const [uploadedButtonText, setUploadedButtonText] = useState("Upload Image");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState({});
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleChange = (e) => {
    setVaues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRemoveImage = async () => {
    try {
      setVaues({ ...values, loading: true });
      await axios.post("/api/course/remove-image", { image }, config);

      setPreview("");
      setImage({});
      setUploadedButtonText("Upload Image");
      setVaues({ ...values, loading: false });
    } catch (error) {
      console.log(error);
      toast.error(error);
      setVaues({ ...values, loading: false });
    }
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setVaues({ ...values, loading: true });
    setUploadedButtonText(file.name);
    setPreview(window.URL.createObjectURL(file));
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post(
          "/api/course/upload-image",
          {
            image: uri,
          },
          config
        );
        setImage(data);
        //setPreview(data.Location);
        setVaues({ ...values, loading: false });
      } catch (error) {
        console.log(error);
        setVaues({ ...values, loading: false });
        toast.error("Image Upload Fail,Try Again");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/course",
        {
          ...values,
          image,
        },
        config
      );
      toast.success("Great! Now you can start adding lessons");
      history.push("/instructor");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <div className="container-fluid gap">
        <div className="row">
          <div className="col-md-2 text-center">
            <InstructorNav />
          </div>
          <div className="col-md-8 offset-md-1">
            <h2 className="text-center">Create Course</h2>
            <div className="underline"></div>
            <div className="pt-3 pb-3">
              <CourseCreateForm
                values={values}
                setVaues={setVaues}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleImage={handleImage}
                preview={preview}
                uploadedButtonText={uploadedButtonText}
                handleRemoveImage={handleRemoveImage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCourseScreen;
