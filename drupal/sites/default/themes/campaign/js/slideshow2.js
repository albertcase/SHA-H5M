function Album(el, data){
  this.element = el;
  this.albumList = data;
  this.loadImg = [];
  this.eleIndex = _base.getQueryString('pid') ? _base.getQueryString('pid') : 0;
}

Album.prototype.init = function(){
    var self = this,
        loadImg = this.loadImg;
    let ele = document.querySelector(self.element),
        _lh = self.list();

    if(typeof self.albumList == "object"){
        _base.loadingFnDoing(loadImg, function(){
            $(".loading").css({"visibility": "hidden"}).remove();
            // pfun.init();
            ele.querySelector('.swiper-wrapper').innerHTML = _lh.join('');

            var s1 = new Swiper(ele, {
                paginationClickable: true,
                initialSlide: self.eleIndex,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                //centeredSlides: true,
            });

        }) 


    }else{
        _base.formErrorTips('无效参数' + obj);
    }
}

Album.prototype.list = function(){
  let _listData = this.albumList, 
      _listHtml = [],
      _loadImg = this.loadImg; 

  _listData.forEach(function(value, key) {
    _loadImg.push(value.picture);
    _listHtml.push(`
      <div class="swiper-slide"> 
         <img src="${value.picture}" width="100%" />
      </div>
    `);
  })

  return _listHtml;
}



