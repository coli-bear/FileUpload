import http from "common/http";

const getFormData = obj => Object.keys(obj).reduce((formData, key) => {
  formData.append("files", obj[key]);
  return formData;
}, new FormData);

const upload = (idx, onUploadProgress) => {
  return http.post("/upload/coli-server/testfolder", getFormData(files), {
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress
  });
};

const getFiles = () => {
  return http.get("/files");
}

const FileUploadService = {
  upload,
  getFiles
}
export default FileUploadService;