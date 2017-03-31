var Upload = function(){
  this.upload({
    url: 'api/upload/',
    data: {
      key: file,
      otherInfo: uploadInfo
    },
    method: 'POST',
    headers: {
      'Authorization': 'xxx'
    },
    withCredentials: boolean,
    resumeSizeUrl: '/uploaded/size/url?file=' + file.name,
    resumeSizeResponseReader: function(data) {
      return data.size;
    },
    resumeSize: function() {
      return promise;
    },
    resumeChunkSize: '10KB',
    disableProgress: false
  });

  // returns a promise
  upload.then(function(resp) {
    console.log('file ' + resp.config.data.file.name + 'is uploaded successfully. Response: ' + resp.data);
  }, function(resp) {}, function(evt) {
    console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :' + evt.config.data.file.name);
  });
  upload.catch(errorCallback);
  upload.finally(callback, notifyCallback);

  /* access or attach event listeners to the underlying XMLHttpRequest */
  // upload.xhr(function(xhr) {
  //   xhr.upload.addEventListener(...)
  // });

  upload.abort();

  // Upload.http({
  //   url: '/api/edit/upload',
  //   headers: {
  //     'Content-Type': file.type
  //   },
  //   data: file
  // })

  this.setDefaults({
    // ngfMinSize: 20000,
    ngfMaxSize: 20000000,
  })

  this.defaults.blobUrlsMaxMemory = 268435456
  this.defaults.blobUrlsMaxQueueSize = 200


  // Upload.imageDimensions(file).then(function(dimensions) {
  //   console.log(dimensions.width, dimensions.height);
  // });


  // Upload.resize(file, options).then(function(resizedFile) {...
  // });

  this.isResizeSupported();
  this.isResumeSupported();

  this.rename(file, newName)
  this.jsonBlob(obj)
  this.json(obj)
  var blob = upload.dataUrltoBlob(dataurl, name);
  this.isUploadInProgress()
  // Upload.urlToBlob(url).then(function(blob) {...
  // });
  this.isFile(obj);
  // Upload.applyExifRotation(file).then(...)
}



module.exports = Upload;
