const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: 'AK****HOLH<NLIO****VRDDCIX', 
    secretAccessKey: 'ESSK353tGbpow&&&*JLJMMTo+hrN/6lZM5i*****tGbpowTo',
    region: 'us-west-2'
    });
var s3 = new AWS.S3();

const bucketName = 'your_bucket_name';
const destinationDirectory = 'your_dest_directory';
const images = ['sample_01/16402056628393122.png', 'sample_01/16402056675206903.png'];

const copyFile = async () => {
    for (const item of images) {
            let keyObject = item.split('/')[1];
            console.log(item);
            let s3Params = {
                Bucket : bucketName,
                CopySource: `${bucketName}/${item}`,
                Key: `${destinationDirectory}/${keyObject}`,
                ACL: 'public-read'
            };
            //console.log(s3Params)
            await s3.copyObject(s3Params).promise();
            console.log('**** done ****');
    }
};

(async () => {
    try {
        await copyFile();
    } catch (error) {
      console.error(`Exception: ${error.stack}`);
    }
  })();