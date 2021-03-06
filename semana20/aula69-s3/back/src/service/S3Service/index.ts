import { S3 } from 'aws-sdk';

export class S3Service {
  private s3 = new S3({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  });

  public uploadFile = async (input:UploadFileInputDTO):Promise<UploadFileResponseDTO> => {
    const fileObject = {
      Bucket: 'aula69bucket',
      Key: input.name,
      Body: input.file
    };

    const result = await this.s3.upload(fileObject).promise();

    return { link: result.Location };
  }
}

interface UploadFileInputDTO {
  name:string;
  file:any;
}

interface UploadFileResponseDTO {
  link:string;
}