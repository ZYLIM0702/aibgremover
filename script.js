// File Upload
// 
function ekUpload(){
  function Init() {

    var fileSelect    = document.getElementById('file-upload'),
        fileDrag      = document.getElementById('file-drag'),
        submitButton  = document.getElementById('submit-button');

    fileSelect.addEventListener('change', fileSelectHandler, false);

    // Is XHR2 available?
    var xhr = new XMLHttpRequest();
    if (xhr.upload) {
      // File Drop
      fileDrag.addEventListener('dragover', fileDragHover, false);
      fileDrag.addEventListener('dragleave', fileDragHover, false);
      fileDrag.addEventListener('drop', fileSelectHandler, false);
    }
  }

  function fileDragHover(e) {
    var fileDrag = document.getElementById('file-drag');

    e.stopPropagation();
    e.preventDefault();

    fileDrag.className = (e.type === 'dragover' ? 'hover' : 'modal-body file-upload');
  }

  function fileSelectHandler(e) {
    // Fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    // Cancel event and hover styling
    fileDragHover(e);

    // Process all File objects
    for (var i = 0, f; f = files[i]; i++) {
      parseFile(f);
      uploadFile(f);
    }
  }

  // Output
  function output(msg) {
    // Response
    var m = document.getElementById('messages');
    m.innerHTML = msg;
  }

  function parseFile(file) {

    
    output(
      '<strong>' + encodeURI(file.name) + '</strong>'
    );
    
    // var fileType = file.type;
    // console.log(fileType);
    var imageName = file.name;

    var isGood = (/\.(?=gif|jpg|png|jpeg)/gi).test(imageName);
    if (isGood) {
      document.getElementById('start').classList.add("hidden");
      document.getElementById('response').classList.remove("hidden");
      document.getElementById('notimage').classList.add("hidden");
      // Thumbnail Preview
      document.getElementById('file-image').classList.remove("hidden");
      document.getElementById('file-image').src = URL.createObjectURL(file);
      document.getElementById('after').src = document.getElementById('file-image').src
      document.getElementById('after').style.maxHeight="500px";
      document.getElementById('after').style.maxWidth="500px";





    }
    else {
      document.getElementById('file-image').classList.add("hidden");
      document.getElementById('notimage').classList.remove("hidden");
      document.getElementById('start').classList.remove("hidden");
      document.getElementById('response').classList.add("hidden");
      document.getElementById("file-upload-form").reset();
    }
  }



  function uploadFile(file) {

    var xhr = new XMLHttpRequest(),
      fileInput = document.getElementById('file-upload'),
      pBar = document.getElementById('file-progress'),
      fileSizeLimit = 1000; // In MB
    if (xhr.upload) {
      // Check if file is less than x MB
      if (file.size <= fileSizeLimit * 10000 * 10000) {
        // Progress bar
        

        // File received / failed
        xhr.onreadystatechange = function(e) {
          if (xhr.readyState == 4) {
            // Everything is good!

            // progress.className = (xhr.status == 200 ? "success" : "failure");
            // document.location.reload(true);
          }
        };

        // Start upload
        xhr.open('POST', document.getElementById('file-upload-form').action, true);
        xhr.setRequestHeader('X-File-Name', file.name);
        xhr.setRequestHeader('X-File-Size', file.size);
        xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        xhr.send(file);
      } else {
        output('Please upload a smaller file (< ' + fileSizeLimit + ' MB).');
      }
    }
  }

  // Check for the various File API support.
  if (window.File && window.FileList && window.FileReader) {
    Init();
  } else {
    document.getElementById('file-drag').style.display = 'none';
  }
}
ekUpload();


var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 30);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

// I hope this over-commenting helps. Let's do this!
// Let's use the 'active' variable to let us know when we're using it
let active = false;

// First we'll have to set up our event listeners
// We want to watch for clicks on our scroller
document.querySelector('.scroller').addEventListener('mousedown',function(){
  active = true;
  // Add our scrolling class so the scroller has full opacity while active
  document.querySelector('.scroller').classList.add('scrolling');
});
// We also want to watch the body for changes to the state,
// like moving around and releasing the click
// so let's set up our event listeners
document.body.addEventListener('mouseup',function(){
  active = true;
  document.querySelector('.scroller').classList.remove('scrolling');
});
document.body.addEventListener('mouseout',function(){
  active = true;
  document.querySelector('.scroller').classList.remove('scrolling');
});

// Let's figure out where their mouse is at
document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  // Their mouse is here...
  let x = e.pageX;
  // but we want it relative to our wrapper
  x -= document.querySelector('.wrapper').getBoundingClientRect().left;
  // Okay let's change our state
  scrollIt(x);
});

// Let's use this function
function scrollIt(x){
    let transform = Math.max(0,(Math.min(x,document.querySelector('.wrapper').offsetWidth)));
    document.querySelector('.after').style.width = transform+"px";
    document.querySelector('.scroller').style.left = transform-25+"px";
}

// Let's set our opening state based off the width, 
// we want to show a bit of both images so the user can see what's going on
scrollIt(150);

// And finally let's repeat the process for touch events
// first our middle scroller...
document.querySelector('.scroller').addEventListener('touchstart',function(){
  active = true;
  document.querySelector('.scroller').classList.add('scrolling');
});
document.querySelector('.scroller').addEventListener('touchend',function(){
  active = true;
  document.querySelector('.scroller').classList.add('scrolling');
});
document.querySelector('.scroller').addEventListener('touchmove',function(){
  active = true;
  document.querySelector('.scroller').classList.add('scrolling');

});