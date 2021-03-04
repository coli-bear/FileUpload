import 'bootstrap/dist/css/bootstrap.min.css';
import UploadFiles from "components/file/FileUpload";

function App() {
  return (
      <div>
        <div className="container" style={{width: "600px"}}>
          <div>
            <h3>Coli Server File Uploader</h3>
            <h4>React File upload</h4>
            <UploadFiles/>
          </div>
        </div>
      </div>
  );
}

export default App;
