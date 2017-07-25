<?php

function campaign_preprocess_html(&$variables) {

}

function campaign_preprocess_page(&$variables) {

}

/**
 * Implementation of hook_form_alter()
 */
function campaign_form_alter(&$form, &$form_state, $form_id) {

  if ($form_id == 'user_login') {
    drupal_add_css(drupal_get_path('theme', $GLOBALS['theme']) . '/css/login.css',array('group' => CSS_THEME));
  }
}

/**
 * Implementation of hook_preprocess_node()
 */
function campaign_preprocess_node(&$variables) {
  if (in_array($variables['type'], array('survey', 'form', 'slideshow_a', 'slideshow_b'))) {
    drupal_add_js(drupal_get_path('theme', $GLOBALS['theme']) . '/js/campaign.js',array('group' => CSS_THEME));
    drupal_add_css(drupal_get_path('theme', $GLOBALS['theme']) . '/css/campaign.css',array('group' => CSS_THEME));
  }
}

function campaign_css_alter(&$css){
  if(!path_is_admin(current_path())) {
    foreach($css as $key => $val){
      if($css[$key]['group'] != 100)
        unset($css[$key]);
    }
  }
}

function campaign_js_alter(&$js){
  if(!path_is_admin(current_path())) {
    $exclude = array('settings', 'misc/jquery.js', 'misc/drupal.js');
    foreach($js as $key => $val){
      if(!in_array($key, $exclude) && $js[$key]['group'] != 100)
        unset($js[$key]);
    }
    $js['misc/jquery.js']['data'] = path_to_theme() . '/js/jquery-1.7.2.min.js';
  }
}