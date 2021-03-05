import http from "common/http";

const getFormData = obj => Object.keys(obj).reduce((formData, key) => {
  formData.append("files", obj[key]);
  return formData;
}, new FormData);

const upload = (file, onUploadProgress) => {
  return http.post("/upload/coli-server/testfolder", getFormData(file), {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
};

const getFiles = () => {
  return http.get("/buckets");
}

const FileUploadService = {
  upload,
  getFiles
}
export default FileUploadService;