import { Injectable, InternalServerErrorException } from '@nestjs/common';
// import * as toStream from 'buffer-to-stream';
import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  UploadResponseCallback,
  v2,
} from 'cloudinary';
import { toStream } from './BufferToStream';
// import { createWriteStream } from 'fs';
// import { get } from 'https';

export type resourceType = 'image' | 'video' | 'raw';
export type UploadOptions = UploadApiOptions;

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    options: UploadOptions,
    resource_type?: resourceType,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          resource_type: resource_type || 'auto',
          folder:
            process.env.CLOUDINARY_ROOT_FOLDER + '/' + options.folderName ||
            options.folderName,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async removeFile(public_id: string, resource_type: resourceType) {
    const res = await v2.uploader.destroy(public_id, {
      resource_type: resource_type,
    });
    return res;
  }

  async removeFiles(public_id: string[], resource_type: resourceType) {
    const removePromises = public_id.map(async (public_id) => {
      return this.removeFile(public_id, resource_type);
    });
    return Promise.all(removePromises);
  }

  uploadFiles(files: Express.Multer.File[], options: UploadOptions) {
    const filesUpload = files.map((file) => {
      return this.uploadFile(file, options);
    });
    return filesUpload;
  }

  async getAllFileInFolder(
    folder: string,
    options?: { resourceType?: string },
  ) {
    return await v2.search
      .expression(
        `folder:${folder} ${
          options.resourceType && `AND resource_type:${options.resourceType}`
        }`,
      )
      .execute();
  }

  uploadFileOnDisk(
    path: string,
    resource_type?: resourceType,
    options?: UploadApiOptions,
    callback?: UploadResponseCallback,
  ) {
    try {
      return v2.uploader.upload(path, { resource_type, ...options }, callback);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException(`Can't download file`);
    }
  }

  // downLoadFile(url: string, folder: string, fileExtension: string) {
  //   const fileName = folder + Date.now() + '.' + fileExtension;
  //   const file = createWriteStream(fileName);
  //   const request = get(url, function (response) {
  //     response.pipe(file);
  //     // after download completed close filestream
  //     file.on('finish', () => {
  //       file.close();
  //     });
  //   });
  // }
}
