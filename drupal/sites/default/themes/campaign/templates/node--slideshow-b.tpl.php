<?php
	drupal_add_css(drupal_get_path('theme', $GLOBALS['theme']) . '/css/swiper.min.css',array('group' => CSS_THEME));
	drupal_add_css(drupal_get_path('theme', $GLOBALS['theme']) . '/css/slideshow.css',array('group' => CSS_THEME));
	drupal_add_js(drupal_get_path('theme', $GLOBALS['theme']) . '/js/PxLoader.js', array('group' => JS_THEME));
	drupal_add_js(drupal_get_path('theme', $GLOBALS['theme']) . '/js/swiper.min.js', array('group' => JS_THEME));
	drupal_add_js(drupal_get_path('theme', $GLOBALS['theme']) . '/js/slideshow2.js', array('group' => JS_THEME));
?>

<div class="loading">
	<div class="loading-con">
      <span class="loading-text-words">L</span>
      <span class="loading-text-words">O</span>
      <span class="loading-text-words">A</span>
      <span class="loading-text-words">D</span>
      <span class="loading-text-words">I</span>
      <span class="loading-text-words">N</span>
      <span class="loading-text-words">G</span>
    </div>
</div>


<div id="dreambox">
	<div class="head">
		<div id="logo"></div>
    </div>

    <div class="section hidden" id="Album2">
	    <div class="con">
	  
	        <div class='slidelist'>
	          <!-- Swiper -->
	          <div class="swiper-container" id="album2-swiper">
	              <div class="swiper-wrapper">

	              </div>
	          </div>

	          <!-- Add Navigation -->
	          <div class="swiper-button-prev swiper-button-white arrow"></div>
	          <div class="swiper-button-next swiper-button-white arrow"></div>
	        </div>
	    </div>
    </div>
</div>

<script type="text/javascript">
	var template_data = Drupal.settings['template_data'],
		campaign_data = Drupal.settings['campaign_data'];

	// console.log(template_data, campaign_data);

	var templateObj = new templateData('body', template_data);
	templateObj.init();


	var _album = new __Album('#album2-swiper', campaign_data);
	_album.init();
</script>