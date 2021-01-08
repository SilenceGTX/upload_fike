import './App.css';
import { UploadOutlined } from '@ant-design/icons';
import ModalContainer from "./components/ModalContainer";
import UploadFile from "./components/UploadFile";

function App() {
  return (
    <div className="App">
      <ModalContainer 
      icon={<UploadOutlined/>} 
      title="上传文件" 
      width={600}
      content={<UploadFile/>}/>
    </div>
  );
}

export default App;
