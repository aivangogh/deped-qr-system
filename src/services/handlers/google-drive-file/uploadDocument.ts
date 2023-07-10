import { uploadFileDocx } from '@/services/api/google-drive-file/uploadFileDocx';
import { NextApiRequest, NextApiResponse } from 'next';
import { inspect } from 'util';

export default function uploadDocument(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { file } = req.body as { file: File };

  console.log("HANDLER");
  // console.log(file)
  console.log(inspect(req.body, { depth: null }));

  // const response = uploadFileDocx(file, process.env.GOOGLE_FOLDER_ID!);

  // if (!response)
  //   return res.status(500).json({ message: 'Something went wrong' });

  // return res.status(200).json(response);
}
