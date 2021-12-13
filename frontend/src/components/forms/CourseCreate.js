import { Select, Button } from "antd";
const { Option } = Select;
const CreateCourseForm = ({
  values,
  setVaues,
  handleChange,
  handleSubmit,
  handleImage,
}) => {
  const children = [];
  for (let i = 1299; i <= 3499; i = i + 100) {
    children.push(<Option key={i}>Rs{i}</Option>);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <input
          type="text"
          className="form-control"
          name="name"
          value={values.name}
          placeholder="Enter name of the course.."
          onChange={handleChange}
        />
      </div>
      <div className="form-group mt-3">
        <textarea
          name="description"
          cols="7"
          rows="7"
          className="form-control"
          value={values.description}
          onChange={handleChange}
          placeholder="Enter description of the course.."
        ></textarea>
      </div>

      <div className="form-group mt-3">
        <Select
          style={{ width: "100%" }}
          value={values.category}
          size="large"
          onChange={(v) => setVaues({ ...values, category: v })}
        >
          <Option value="development">Development</Option>
          <Option value="health">Health</Option>
          <Option value="business">Business</Option>
          <Option value="design">Design</Option>
          <Option value="marketing">Marketing</Option>
          <Option value="music">Music</Option>
        </Select>
      </div>

      <div className="form-row mt-3">
        <div className="col">
          <Select
            style={{ width: "100%" }}
            value={values.paid}
            size="large"
            onChange={(v) => setVaues({ ...values, paid: !values.paid })}
          >
            <Option value={true}>Paid</Option>
            <Option value={false}>Free</Option>
          </Select>
        </div>

        {values.paid && (
          <div className="form-group mt-3">
            <Select
              defaultValue="Rs 3499"
              onChange={(v) => setVaues({ ...values, price: v })}
              //eslint-disable-next-line
              tokenSeparators={[,]}
              size="large"
            >
              {children}
            </Select>
          </div>
        )}
      </div>

      <div className="form-row mt-3">
        <div className="col">
          <div className="form-group">
            <label className="btn btn-outline-success btn-block">
              {values.loading ? "Uploading" : "Image Upload"}
              <input
                type="file"
                name="image"
                onChange={handleImage}
                accept="image/*"
                hidden
              />
            </label>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <Button
            onClick={handleSubmit}
            type="primary"
            size="large"
            shape="round"
            disabled={values.loading || values.uploading}
            loading={values.loading}
          >
            {values.loading ? "Saving.." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCourseForm;
