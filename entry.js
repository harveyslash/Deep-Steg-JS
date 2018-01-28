import KerasJS from 'keras-js'
import { secret } from './data'
console.log("hsdfsdf")
import { photo } from './data2'

// console.log(sample)
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
            

        })
        .catch(err => {
          console.log(err)
        })
    })
})
    // }))
  

  
