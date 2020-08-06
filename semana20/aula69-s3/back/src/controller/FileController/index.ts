import { Request, Response} from 'express';
import { S3Service } from '../../service/S3Service';

export class FileController {
  public fileUpload = async (req:Request, res:Response) => {
    try {
      const file = req.files && (req.files.file as any);

      if (!file) {
        throw new Error('A file must be provided');
      }

      const result = await new S3Service().uploadFile({
        name: file.name,
        file: file.data
      });

      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
}