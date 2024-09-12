import { DeleteObjectsCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({});

async function deleteObject(objeto) {
  const command = new DeleteObjectsCommand({
    Bucket: "Bucket name",
    Delete: {
      Objects: [{ Key: objeto }],
    },
  });

  try {
    const { Deleted } = await client.send(command);
    console.log(
      `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`
    );
    console.log(Deleted.map((d) => ` • ${d.Key}`).join("\n"));
  } catch (err) {
    console.error(err);
  }
}

export default deleteObject;
