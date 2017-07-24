
function Album(el, data){
  this.element = document.getElementById(el);
  this.albumList = data;
  this.loadImg = [];
  this.eleIndex = _base.getQueryString('pid') ? _base.getQueryString('pid') : 0;
}

Album.prototype.init = function(){
    var self = this;
    let ele = self.element,
        _lh = self.list();

    if(typeof self.albumList == "object"){
        _base.loadingFnDoing(self.loadImg, function(){
            $(".loading").css({"visibility": "hidden"}).remove();
            // pfun.init();
            ele.querySelector('.swiper-wrapper').innerHTML = _lh.join('');

            var s1 = new Swiper(ele, {
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 10,
                initialSlide: self.eleIndex,
                //centeredSlides: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
            
            // ele.querySelectorAll('.swiper-wrapper .swiper-slide')[self.eleIndex].className += ' active';

            // document.querySelector('.album-large img')
            // $(".album-large img").attr("src", ele.querySelectorAll('.swiper-wrapper .swiper-slide')[self.eleIndex].getAttribute("data-large"));

            // $("#album-swiper .swiper-slide").on('click', function(){
            //   var dataLarge = $(this).attr("data-large");
            //   $(".album-large img").attr("src", dataLarge);
            //   $("#album-swiper .swiper-slide").removeClass('active');
            //   $(this).addClass('active'); 
            // })

            self.largePreview();
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
    // console.log(value, key);
    _loadImg.push(value.picture);
    _loadImg.push(value.thumbnail);
    _listHtml.push(`
      <div class="swiper-slide" colorify-main-color> 
         <img colorify src="${value.thumbnail}" data-large="${value.picture}" width="100%" />
      </div>
    `);
    // console.log(value, key);
  })

  return _listHtml;
}





// 预览大图方法
Album.prototype.largePreview = function(){
      var imgList = document.getElementById('album-swiper'),
          imgs = imgList.querySelectorAll('img');

      // 定义预览大图事件 'preview'
      function setPreviewBehavior(subjects){
        var previewEvent = document.createEvent('Event');
        // 3个参数：事件类型，是否冒泡，是否阻止浏览器的默认行为  
        previewEvent.initEvent('preview', true, true);

        if(!Array.isArray(subjects)){
          if(subjects.length) subjects = Array.from(subjects);
          else subjects = [subjects];
        }

        previewEvent.previewTargets = subjects.map(function(evt){
          return evt.getAttribute('data-large');
        })

        subjects.forEach(function(subject){
          subject.preview = function(){
            subject.dispatchEvent(previewEvent);
          }
        })
      }

      setPreviewBehavior(imgs);

    var previewImage = document.getElementById('largeImg'),
        previewNode = imgList.querySelectorAll('.swiper-slide');

    function defaultSet(){
      let firstNode = previewNode[0];
      previewImage.src = firstNode.querySelector('img').getAttribute('data-large'); // 设置默认大图
      if(firstNode.className.indexOf(' active') < 0){
        firstNode.className += ' active';
      }
    }
    
    defaultSet();

    imgList.addEventListener('click', function(evt){
      if(evt.target.preview){
        evt.target.preview();
      }
    })

    imgList.addEventListener('preview', function(evt){
      var src = evt.target.getAttribute('data-large'),
          imgs = evt.previewTargets,
          previewNodeActive = imgList.querySelector('.active');
      previewImage.src = src;

      var idx = imgs.indexOf(src);
      function updateStatus(idx){
        previewNodeActive.className = previewNodeActive.className.replace(' active', '');
        previewNode[idx].className += ' active';
      }

      updateStatus(idx);
    })

}






