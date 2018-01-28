function readURL1(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.image-upload-wrap1').hide();

      $('.file-upload-image1').attr('src', e.target.result);
      $('.file-upload-content1').show();

      //$('.image-title1').html(input.files[0].name);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload1();
  }
}

function changeImage1(el) {
    var id = el.id;
    $('.image-upload-wrap1').hide();
    $("#image1").attr('src', 'images/'+id+'.jpg');
    $('.file-upload-content1').show();
}

function changeImage2(el) {
    var id = el.id;
    $('.image-upload-wrap2').hide();
    $("#image2").attr('src', 'images/'+id+'.jpg');
    $('.file-upload-content2').show();
}
function removeUpload1() {
  $('.file-upload-input1').replaceWith($('.file-upload-input1').clone());
  $('.file-upload-content1').hide();
  $('.image-upload-wrap1').show();
}
$('.image-upload-wrap1').bind('dragover', function () {
		$('.image-upload-wrap1').addClass('image-dropping1');
	});
	$('.image-upload-wrap1').bind('dragleave', function () {
		$('.image-upload-wrap1').removeClass('image-dropping1');
});

function readURL2(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.image-upload-wrap2').hide();

      $('.file-upload-image2').attr('src', e.target.result);
      $('.file-upload-content2').show();

      $('.image-title2').html(input.files[0].name);
    };
    reader.readAsDataURL(input.files[0]);
  } else {
    removeUpload();
  }
}

function removeUpload2() {
  $('.file-upload-input2').replaceWith($('.file-upload-input2').clone());
  $('.file-upload-content2').hide();
  $('.image-upload-wrap2').show();
}
$('.image-upload-wrap2').bind('dragover', function () {
		$('.image-upload-wrap2').addClass('image-dropping2');
	});
	$('.image-upload-wrap2').bind('dragleave', function () {
		$('.image-upload-wrap2').removeClass('image-dropping2');
});