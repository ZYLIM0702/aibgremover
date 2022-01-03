var myArray = ['55abd9a523296eeeb3f6e52d7a515670239cabd5', 'a18148efaa09b1e74f7c8d83c93e8c5948853aef','8aeed560d0f202f6e85f45dd170c609aa87d9792', 'b5cd341e8cf1460e7d38c92c406965a262ec7078', 'b82799bea2a66099d4f6714e69162f1197352dbc','25dc38f697776dede763399514f13f274571d614']; 
var rand = myArray[(Math.random() * myArray.length) | 0]



document
  .querySelector("input[type=file]")
  .addEventListener("change", async function () {
    const resizedImage = await loadImage(this.files[0], {
      // resize before sending to PhotoRoom for performance
      maxWidth: 30000,
      maxHeight: 30000,
      canvas: true

    
    });

    

    resizedImage.image.toBlob(async function (inputBlob) {
      const formData = new FormData();
      formData.append("image_file", inputBlob);

      const response = await fetch("https://sdk.photoroom.com/v1/segment", {
        method: "POST",
        headers: {
          "x-api-key": rand
        },
        body: formData
      });


      // https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api#example_fetching_images
      var outputBlob = await response.blob();
      var outputImage = document.createElement("img");
      document.querySelector("#result").appendChild(outputImage);
      outputImage.setAttribute('id', 'bunss');
      outputImage.classList.add('content-image');
      outputImage.src = URL.createObjectURL(outputBlob);


const reader = new FileReader();
reader.readAsDataURL(outputBlob); 
reader.onloadend = function() {
  var base64data = reader.result; 
  reader.src = base64data.toString();
   saveImg.href = reader.src ;  
   document.getElementById("dones").src = saveImg.href ;  
}


function clickdownload() {
 
            document.getElementById('saveImg');
	    Android.downloading();
            
        }



var image = document.querySelector('img'); // Image you want to save
var saveImg = document.createElement("a");
saveImg.setAttribute('id', 'downss');     // New link we use to save it with
saveImg.classList.add('buttonss');
saveImg.style.width ="570px";    // Assign image src to our link target
saveImg.download = "Ai Background removed_" + new Date().getTime() + ".png";
saveImg.innerHTML = "CLICK TO DOWNLOAD IMAGE";       // Set link text
document.body.appendChild(saveImg);   
document.getElementById("downss").onclick = function() {clickdownload()};
});
});

var beforeimage = document.querySelector("input[type=file]");

async function uploadFiles() {
  let formData = new FormData(); 
  formData.append("file",beforeimage.files[0] );
  await fetch('/upload.php', {
    method: "POST", 
    body: formData
  }); 
  
  }


const ImageEditor = new window.FilerobotImageEditor();
const Button = document.getElementById("image-editor-btn");

Button.addEventListener("click", function() {
  const ids = document.getElementById("bunss").src;
  ImageEditor.open(ids);
  Android.showAdFromJs();
});