<?php

/**
 * Generates the data type editing form.
 */
function campaign_data_type_form($form, &$form_state, $entity_type, $op = 'edit') {

  if ($op == 'clone') {
    $entity_type->label .= ' (cloned)';
    $entity_type->type = '';
  }

  $form['label'] = array(
    '#title' => t('Name'),
    '#type' => 'textfield',
    '#default_value' => $entity_type->label,
    '#description' => t('The human-readable name of this data type.'),
    '#required' => TRUE,
    '#size' => 30,
  );

  // Machine-readable type name.
  $form['type'] = array(
    '#type' => 'machine_name',
    '#default_value' => isset($entity_type->type) ? $entity_type->type : '',
    '#maxlength' => 32,
    '#disabled' => $entity_type->isLocked() && $op != 'clone',
    '#machine_name' => array(
      'exists' => 'campaign_data_types',
      'source' => array('label'),
    ),
    '#description' => t('A unique machine-readable name for this entity type. It must only contain lowercase letters, numbers, and underscores.'),
  );

  $form['description'] = array(
    '#type' => 'textarea',
    '#default_value' => isset($entity_type->description) ? $entity_type->description : '',
    '#description' => t('Description about the entity type.'),
  );

  $form['actions'] = array('#type' => 'actions');
  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save entity type'),
    '#weight' => 40,
  );

  if (!$entity_type->isLocked() && $op != 'add' && $op != 'clone') {
    $form['actions']['delete'] = array(
      '#type' => 'submit',
      '#value' => t('Delete entity type'),
      '#weight' => 45,
      '#limit_validation_errors' => array(),
      '#submit' => array('campaign_data_type_form_submit_delete')
    );
  }
  return $form;
}

/**
 * Submit handler for creating/editing entity_type.
 */
function campaign_data_type_form_submit(&$form, &$form_state) {
  $entity_type = entity_ui_form_submit_build_entity($form, $form_state);
  // Save and go back.
  campaign_data_type_save($entity_type);

  // Redirect user back to list of data types.
  $form_state['redirect'] = 'admin/structure/campaign/data_types';
}

function campaign_data_type_form_submit_delete(&$form, &$form_state) {
  $form_state['redirect'] = 'admin/structure/campaign/data_types/' . $form_state['entity_type']->type . '/delete';
}

/**
 * data type delete form.
 */
function campaign_data_type_form_delete_confirm($form, &$form_state, $entity_type) {
  $form_state['entity_type'] = $entity_type;
  // Always provide entity id in the same form key as in the entity edit form.
  $form['entity_type_id'] = array('#type' => 'value', '#value' => entity_id('campaign_data_type' ,$entity_type));
  return confirm_form($form,
    t('Are you sure you want to delete data type %title?', array('%title' => entity_label('entity_type', $entity_type))),
    'admin/content/campaign/data/' . entity_id('campaign_data_type' ,$entity_type),
    t('This action cannot be undone.'),
    t('Delete'),
    t('Cancel')
  );
}

/**
 * data type delete form submit handler.
 */
function campaign_data_type_form_delete_confirm_submit($form, &$form_state) {
  $entity_type = $form_state['entity_type'];
  campaign_data_type_delete($entity_type);

  watchdog('campaign_data_type', '@type: deleted %title.', array('@type' => $entity_type->type, '%title' => $entity_type->label));
  drupal_set_message(t('@type %title has been deleted.', array('@type' => $entity_type->type, '%title' => $entity_type->label)));

  $form_state['redirect'] = 'admin/structure/campaign/data_types';
}

/**
 * Page to select data Type to add new data.
 */
function campaign_data_admin_add_page() {
  $items = array();
  foreach (campaign_data_types() as $entity_key => $entity_type) {
    $items[] = l(entity_label('campaign_data_type', $entity_type), 'admin/content/campaign/data/add/' . $entity_key);
  }
  return array('list' => array('#theme' => 'item_list', '#items' => $items, '#title' => t('Select type of data to create.')));
}

/**
 * Add new data page callback.
 */
function campaign_data_add($type) {
  $entity_type = campaign_data_types($type);

  $entity = entity_create('campaign_data', array('type' => $type));
  drupal_set_title(t('Create @name', array('@name' => entity_label('entity_type', $entity_type))));

  $output = drupal_get_form('campaign_data_form', $entity);

  return $output;
}

/**
 * data Form.
 */
function campaign_data_form($form, &$form_state, $entity) {
  $form_state['entity'] = $entity;

  $form['title'] = array(
    '#type' => 'textfield',
    '#required' => TRUE,
    '#title' => t('Name'),
    '#default_value' => $entity->title,
  );

  $form['description'] = array(
    '#type' => 'textarea',
    '#title' => t('Description'),
    '#default_value' => $entity->description,
  );

  $form['uid'] = array(
    '#type' => 'value',
    '#value' => $entity->uid,
  );

  field_attach_form('campaign_data', $entity, $form, $form_state);

  $submit = array();
  if (!empty($form['#submit'])) {
    $submit += $form['#submit'];
  }

  $form['actions'] = array(
    '#weight' => 100,
  );

  $form['actions']['submit'] = array(
    '#type' => 'submit',
    '#value' => t('Save data'),
    '#submit' => $submit + array('campaign_data_type_form_submit'),
  );

  // Show Delete button if we edit data.
  $entity_id = entity_id('campaign_data' ,$entity);
  if (!empty($entity_id) && campaign_data_access('edit', $entity)) {
    $form['actions']['delete'] = array(
      '#type' => 'submit',
      '#value' => t('Delete'),
      '#submit' => array('campaign_data_type_form_submit_delete'),
    );
  }

  $form['#validate'][] = 'campaign_data_type_form_validate';

  return $form;
}

function campaign_data_type_form_validate($form, &$form_state) {

}

/**
 * data submit handler.
 */
function campaign_data_form_submit($form, &$form_state) {
  $entity = $form_state['entity'];

  entity_form_submit_build_entity('campaign_data', $entity, $form, $form_state);

  campaign_data_save($entity);

  $entity_uri = entity_uri('campaign_data', $entity);

  $form_state['redirect'] = $entity_uri['path'];

  drupal_set_message(t('data %title saved.', array('%title' => entity_label('campaign_data', $entity))));
}

function campaign_data_form_submit_delete($form, &$form_state) {
  $entity = $form_state['entity'];
  $entity_uri = entity_uri('campaign_data', $entity);
  $form_state['redirect'] = $entity_uri['path'] . '/delete';
}

/**
 * Delete confirmation form.
 */
function campaign_data_delete_form($form, &$form_state, $entity) {
  $form_state['entity'] = $entity;
  // Always provide entity id in the same form key as in the entity edit form.
  $form['entity_type_id'] = array('#type' => 'value', '#value' => entity_id('campaign_data' ,$entity));
  $entity_uri = entity_uri('campaign_data', $entity);
  return confirm_form($form,
    t('Are you sure you want to delete data %title?', array('%title' => entity_label('campaign_data', $entity))),
    $entity_uri['path'],
    t('This action cannot be undone.'),
    t('Delete'),
    t('Cancel')
  );
}

/**
 * Delete form submit handler.
 */
function campaign_data_delete_form_submit($form, &$form_state) {
  $entity = $form_state['entity'];
  campaign_data_delete($entity);

  drupal_set_message(t('data %title deleted.', array('%title' => entity_label('campaign_data', $entity))));

  $form_state['redirect'] = '<front>';
}
