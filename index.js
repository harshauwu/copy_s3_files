const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: '*******', 
    secretAccessKey: '***********',
    region: 'us-west-2'});

const s3 = new AWS.S3();

const pageSizes = 10;
const bucketName = 'your_bucket_name'; 
const sourceDirectory = '<your_directory_name>/';
const destinationDirectory = 'your_dest_directory';
const fileTypes = ['png', 'jpeg','jpg', 'heic'];

const copyS3FilesToAnotherDirectory = async () => {

    let marker = "comment/Stephanie-Uy-Badge-SJ162447324238922.jpeg";
    let params = { 
        Bucket: bucketName,
        Delimiter: '/',
        Prefix: sourceDirectory,
        MaxKeys : pageSizes
    }

    if (marker) params.Marker = marker;
    const response = await s3.listObjects(params).promise();
    for (const item of response.Contents) {
        let keyObject = item.Key.split('/')[1];
        let type = keyObject.split('.')[1];
        if (type != undefined) {
            if(fileTypes.includes(type.toLowerCase())) {
                    console.log(item.Key);
                    const s3Params = {
                        Bucket : bucketName,
                        CopySource: `${bucketName}/${item.Key}`,
                        Key: `${destinationDirectory}/${keyObject}`,
                        ACL: 'public-read'
                    };
                    await s3.copyObject(s3Params).promise();
            }
            
        }
    };
    let marker_key = response.Contents.slice(-1)[0].Key;
    
    console.log('******** marker ******* '+marker_key);
}

(async () => {
    try {
        await copyS3FilesToAnotherDirectory();
    } catch (error) {
      console.error(`Exception: ${error.stack}`);
    }
  })();