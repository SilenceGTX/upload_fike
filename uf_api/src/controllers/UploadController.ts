import { 
    Controller, 
    Request,
    Post,
    Route
} from 'tsoa';
import express from 'express';
const multer = require('multer');
const fs = require('fs');

const storagePath = "F:/node_project/upload_file/dest"; //设置储存路径

@Route("upload")
export class UploadController extends Controller {
    @Post("/")
    public async uploadFile(
        @Request() request: express.Request
    ): Promise<any> {
        await this.handleUpload(request);
        return true;
    }

    private async createFolder (folder: string) {
        //创建文件夹，若文件夹已存在，则跳过
        try {
            fs.accessSync(folder);
            console.log('目标文件夹已创建')
        } catch (error) {
            fs.mkdirSync(folder);
            console.log('创建目标文件夹')
        }
    };

    private async handleUpload (
        request: express.Request
    ): Promise<void> {
        this.createFolder(storagePath);

        var storage = multer.diskStorage({
            destination: function (
                req: express.Request, 
                file: any, 
                callback:any) {
                    callback(null, storagePath)
                }, //负责处理路径
            filename: function (
                req: express.Request, 
                file: any, 
                callback:any
            ) {
                console.log(file)
                callback(null, file.originalname)
            } //负责处理文件名，originalname为你上传文件的名称
        });

        var upload = multer({ storage: storage });

        const multerSingle = upload.single("file");
        // 前端传过来的form-data应该将上传的文件放在file下，即form-data包含 {"file": 你的文件}
        // antd的Upload组件会自动使用"file"

        return new Promise((resolve, reject) => {
            multerSingle(request, undefined, async (error: any) => {
                if (error) {
                    reject(error);
                }
                resolve();
                console.log("文件已上传")
            });
        });
    }
}
