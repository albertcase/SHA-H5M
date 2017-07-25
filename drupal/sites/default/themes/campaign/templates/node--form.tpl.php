<?php
	drupal_add_css(drupal_get_path('theme', $GLOBALS['theme']) . '/css/form.css',array('group' => CSS_THEME));
	drupal_add_js(drupal_get_path('theme', $GLOBALS['theme']) . '/js/form.js', array('group' => JS_THEME));
?>

<div id="dreambox">
    <style type="text/css">
        .bod{
            width: 100px;
        }
    </style>
	<div class="head">
		<div id="logo"></div>
    </div>

    <div class="section" id="form">
        <div class="con ycenter">
            <div class="form-group"></div>
        </div>

        <div class="form-footer">
          <a href="javascript:void(0);" class="btn submitForm">
            -- 
          </a>
        </div>
    </div>

    <div class="section hidden" id="success">
        <div class="con success-con">
            
        </div>

        <div class="form-footer">
          <a href="javascript:void(0);" class="btn moreBtn" target="_blank">
            --
          </a>
        </div>
    </div>
</div>

<script type="text/javascript">
	var template_data = Drupal.settings['template_data'],
		campaign_data = Drupal.settings['campaign_data'];

	 console.log(template_data, campaign_data);

    // 模版基础数据
	var templateObj = new templateData('body', template_data);
	templateObj.init();


	var f = new __form('dreambox', campaign_data);
	f.init();


	var submitBtn = document.querySelector('.submitForm');
	submitBtn.addEventListener('click', function(){
	    f.check();
	})
</script>
