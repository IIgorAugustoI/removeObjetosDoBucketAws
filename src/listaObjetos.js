import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import listarArquivosAntigos from "./listarArquivosAntigos.js";

const client = new S3Client({});

async function listarObjetos(nameBucket) {
  const command = new ListObjectsV2Command({
    Bucket: nameBucket,
    MaxKeys: 1,
  });

  try {
    let isTruncated = true;

    var contentsList = [];

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command);
      Contents.map((c) => {
        if (c.Key === "backups/") {
          return;
        }
        contentsList.push(c.Key);
      });
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    return listarArquivosAntigos(contentsList);
  } catch (err) {
    console.error(err);
  }
}

export default listarObjetos;
