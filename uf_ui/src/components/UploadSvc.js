import axios from 'axios';

const api = "http://localhost:5000"; //后段地址

class UploadSvc {
    uploadDataset(file) {
        let config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        } // 我们上传的是form-data
        return new Promise((resolve) => resolve(axios.post(`${api}/upload`, file, config)));
    }
}

export default new UploadSvc();