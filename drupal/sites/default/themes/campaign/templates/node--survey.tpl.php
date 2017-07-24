<?php
	drupal_add_css(drupal_get_path('theme', $GLOBALS['theme']) . '/css/survey.css',array('group' => CSS_THEME));
	drupal_add_js(drupal_get_path('theme', $GLOBALS['theme']) . '/js/survey.js', array('group' => JS_THEME));
?>
<div id="dreambox">
	  <div class="head">
		  <div id="logo"></div>
    </div>


    <div class="section" id="homepage">
        <div class="con page-con">
            
        </div>

        <div class="form-footer">
          <a href="javascript:void(0);" class="btn startBtn" target="_blank">
            ------ 
          </a>
        </div>
    </div>

    <div class="section hidden" id="question">
        <div class="con">
            <div class="question-list"></div>
        </div>

        <div class="form-footer">
          <a href="javascript:void(0);" class="btn submitForm">
            ------ 
          </a>
        </div>
    </div>

	<div class="section hidden" id="success">
      <div class="con page-con">
          
      </div>

      <div class="form-footer">
        <a href="javascript:void(0);" class="btn moreBtn" target="_blank">
          ------ 
        </a>
      </div>
  </div>

</div>


<script type="text/javascript">
	var template_data = Drupal.settings['template_data'],
		campaign_data = Drupal.settings['campaign_data'];

	// console.log(template_data, campaign_data);
	
	var templateObj = new templateData('dreambox', template_data);
	templateObj.init();




	var _question = new QuestionSurvey('question', campaign_data);
	_question.init();

	const submitBtn = document.querySelector('.submitForm');
	submitBtn.addEventListener('click', function(){
	    _question.formCheck();
	})

  const startBtn = document.querySelector('.startBtn');
  startBtn.addEventListener('click', function(){
      _base.sectionChange('question');
  })



</script>