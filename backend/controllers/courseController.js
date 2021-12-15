import AWS from "aws-sdk";
import { nanoid } from "nanoid";
import dotenv from "dotenv";

dotenv.config();

const awsconfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const S3 = new AWS.S3(awsconfig);

//@desc   Upload Image
//@routes POST /api/course/upload-image
//@access PRIVATE
export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).send("No Image");
    }

    //prepare the image

    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ""),
      "base64"
    );

    const type = image.split(";")[0].split("/")[1];

    //image params prepare the image just keep the binary data remove the data type store images using base64 format.
    const params = {
      Bucket: "kakshaa",
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      ContentType: `image/${type}`,
    };

    //upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Error,Please Try Again");
      }
      console.log(data);
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

//@desc   Remove Image
//@routes DELETE /api/course/remove-image
//@access PRIVATE
export const removeImage = async (req, res) => {
  try {
    const { image } = req.body;

    const params = {
      Bucket: image.Bucket,
      Key: image.Key,
    };

    S3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).send("Error,Please Try Again");
      }
      res.send({ success: true });
    });
  } catch (error) {}
};
