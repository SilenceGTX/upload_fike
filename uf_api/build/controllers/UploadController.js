"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const tsoa_1 = require("tsoa");
const express_1 = __importDefault(require("express"));
const multer = require('multer');
const fs = require('fs');
const storagePath = "F:/node_project/upload_file/dest"; //设置储存路径
let UploadController = class UploadController extends tsoa_1.Controller {
    uploadFile(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.handleUpload(request);
            return true;
        });
    }
    createFolder(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            //创建文件夹，若文件夹已存在，则跳过
            try {
                fs.accessSync(folder);
                console.log('目标文件夹已创建');
            }
            catch (error) {
                fs.mkdirSync(folder);
                console.log('创建目标文件夹');
            }
        });
    }
    ;
    handleUpload(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.createFolder(storagePath);
            var storage = multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, storagePath);
                },
                filename: function (req, file, callback) {
                    console.log(file);
                    callback(null, file.originalname);
                } //负责处理文件名，originalname为你上传文件的名称
            });
            var upload = multer({ storage: storage });
            const multerSingle = upload.single("file");
            // 前端传过来的form-data应该将上传的文件放在file下，即form-data包含 {"file": 你的文件}
            // antd的Upload组件会自动使用"file"
            return new Promise((resolve, reject) => {
                multerSingle(request, undefined, (error) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        reject(error);
                    }
                    resolve();
                    console.log("文件已上传");
                }));
            });
        });
    }
};
__decorate([
    tsoa_1.Post("/"),
    __param(0, tsoa_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadFile", null);
UploadController = __decorate([
    tsoa_1.Route("upload")
], UploadController);
exports.UploadController = UploadController;
