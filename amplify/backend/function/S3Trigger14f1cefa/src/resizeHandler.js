const s3Handler = require("./s3Handler.js");
const sharp = require("sharp");
class ResizerHandler {
    constructor() { }

    async process(bucket, key) {

        key = key.replace("%3A", ":")
        var keyUp=key.substring(0, key.lastIndexOf(".")).concat(".png")
        if (key.includes("profile/upload/")){
            console.log("procssing profileimage")
            await this.resize(bucket, key,100,keyUp.replace("upload/","").replace(".","-small."))
            await this.resize(bucket, key,250,keyUp.replace("upload/","").replace(".","-medium."))
            return await this.resize(bucket, key,500,keyUp.replace("upload/","").replace(".","-large."))
        }
        else if (key.includes("resources/upload/")){
            console.log("procssing resource")
            await this.resize(bucket, key,600,keyUp.replace("upload/","").replace("-upload.","-small."))
            await this.resize(bucket, key,1024,keyUp.replace("upload/","").replace("-upload.","-medium."))
            return await this.resize(bucket, key,2048,keyUp.replace("upload/","").replace("-upload.","-large."))
        }
        else {
            console.log("image does not need processing")
            return false
        }
    }
    async resize(bucket, key,size,outKey) {
        try {
            const streamResize = sharp()
                .resize(size)
                .toFormat("png", { "options": { "progressive": true } })
            const readStream = s3Handler.readStream({ Bucket: bucket, Key: key })
            const { writeStream, uploaded } = s3Handler.writeStream({ Bucket: bucket, Key: outKey, format: "png" })
            /* var doLoad = false;
             try {
                 const httpResponse = s3Handler.exists(bucket, newKey).promise()
                 await httpResponse
             } catch (e) {
                 doLoad = true
             }
 //            console.log("Doload: "+doLoad)
             if (doLoad) {*/
            readStream
                .pipe(streamResize)
                .pipe(writeStream)
            await uploaded

            return "test.jpeg"
        }
        catch (e) {
            //            console.log("caught")
            console.log(e)
        }
    }
}
module.exports = new ResizerHandler()