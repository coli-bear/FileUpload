import 'bootstrap/dist/css/bootstrap.min.css';
import UploadFiles from "components/file/FileUpload";

function App() {
  return (
      <div>
        <div className="container" style={{width: "600px"}}>
          <div>
            <h3>File Uploader</h3>
            <h4>Coli-server bucket</h4>
            <UploadFiles/>
          </div>
        </div>
      </div>
  );
}

export default App;
