/*
   Keeps all required sprites in cache
*/

var RessourceCache = function () {
	this.ressources = {};
   this.loaded = 0;
   this.to_load = 0;
};

RessourceCache.prototype.load = function(urls) {
   this.to_load = urls.length; 
   for (url in urls) {
      if(this.ressources[url]) {
         console.log(url + " is already loaded!");
         this.loaded++;
         return;
      } else {
         console.log("Loading" , urls[url]);
         var img = new Image();
         img.onload = this.loadedCallback.bind(this);
         this.ressources[urls[url]] = null;
         img.src = urls[url];
      }
   }
}

RessourceCache.prototype.loadedCallback = function (img) {
   this.ressources[url] = img;
   this.loaded++;
}

RessourceCache.prototype.get = function(url) {
   if (this.ressources[url]) {
   	return this.ressources[url];
	} else {
		var img = new Image();
		img.src = url;
		this.ressources[url] = img;
		return img;
	}
}

RessourceCache.prototype.getStatus = function() {
   if (this.to_load==0) {
      return 100;
   }

   return Math.floor((this.loaded/this.to_load)*100);
}

var ressourceCache = new RessourceCache();