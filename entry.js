import KerasJS from 'keras-js'
// import { secret } from './data'
console.log("hsdfsdf")
// import { photo } from './data2'
var photo;
var secret;
const model = new KerasJS.Model({
  filepath: 'final_hide_212.bin',
  gpu: true
})
var d = new Date();
var output;
var image

var predict_function = function() {
  return model.predict({
        'hide_in': new Float32Array(photo),
        'prep_in': new Float32Array(secret), 

})
}
model.ready()
  .then(() => {
    console.log("ready")
    $('#loading').hide();
    $('#loaded').show();
    $('#predict').on('click', function(){
  var c = document.createElement("canvas");
        c.width = 224
        c.height = 224;
        var ctx = c.getContext("2d");
        var img = $('.file-upload-image1')[0];
        ctx.drawImage(img, 0, 0);
        var imgData = ctx.getImageData(0, 0, c.width, c.height);
        photo = new Float32Array(224 * 224 * 3)
        var k = 0;
        for (var i = 0; i < imgData.data.length; i += 4) {
            photo[k++] = (((imgData.data[i]) / 255.0) - 0.485) / 0.229;
            photo[k++] = (((imgData.data[i + 1]) / 255.0) - 0.456) / 0.224;
            photo[k++] = (((imgData.data[i + 2]) / 255.0) - 0.406) / 0.225;
        }

        var c = document.createElement("canvas");
        c.width = 224
        c.height = 224;
        var ctx = c.getContext("2d");
        var img = $('.file-upload-image2')[0];
        ctx.drawImage(img, 0, 0);
        var imgData = ctx.getImageData(0, 0, c.width, c.height);
        secret = new Float32Array(224 * 224 * 3)
        var k = 0;
        for (var i = 0; i < imgData.data.length; i += 4) {
            secret[k++] = (((imgData.data[i]) / 255.0) - 0.485) / 0.229;
            secret[k++] = (((imgData.data[i + 1]) / 255.0) - 0.456) / 0.224;
            secret[k++] = (((imgData.data[i + 2]) / 255.0) - 0.406) / 0.225;
        }
          predict_function().then(outputData => {
          output = outputData['hide_out']
          console.log(output)
          image = new Uint8ClampedArray(224 * 224 * 4);
          // image2 = new Uint8ClampedArray(224 * 224 * 4);
          var k = 0;
          for(var i=0; i < output.length; i += 3) {
            image[k++] = (.229 * output[i] + 0.485) * 225;
            image[k++] = (.224 * output[i+1] + 0.456) * 225;
            image[k++] = (.225 * output[i+2] + 0.406) * 225;
            image[k++] = 255;
          }
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');

          canvas.width = 224;
          canvas.height = 224;
          var i = new Image();
          // create imageData object
          var idata = ctx.createImageData(224, 224);

          // set our buffer as source
          idata.data.set(image);

          // update canvas with new data
          ctx.putImageData(idata, 0, 0);

          var dataUri = canvas.toDataURL(); // produces a PNG file

          // i.onload = imageLoaded;       // optional callback function
          i.src = dataUri
          document.getElementById('completed').setAttribute('src', i.src);
          modal.style.display = "block";
            

        })
        .catch(err => {
          console.log(err)
        })
    })
})
    

// $('#loading').hide();
//     $('#loaded').show();