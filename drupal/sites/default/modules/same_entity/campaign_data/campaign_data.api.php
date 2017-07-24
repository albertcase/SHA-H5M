<?php
/**
 * @file
 * Hooks provided by this module.
 */

/**
 * @addtogroup hooks
 * @{
 */

/**
 * Acts on $entity being loaded from the database.
 *
 * This hook is invoked during $entity loading, which is handled by
 * entity_load(), via the EntityCRUDController.
 *
 * @param array $entities
 *   An array of $entity entities being loaded, keyed by id.
 *
 * @see hook_entity_load()
 */
function hook_campaign_data_load(array $entities) {
  $result = db_query('SELECT pid, foo FROM {mytable} WHERE pid IN(:ids)', array(':ids' => array_keys($entities)));
  foreach ($result as $data) {
    $entities[$data->pid]->foo = $data->foo;
  }
}

/**
 * Responds when a $entity is inserted.
 *
 * This hook is invoked after the $entity is inserted into the database.
 *
 * @param CampaignDataEntity $entity
 *   The $entity that is being inserted.
 *
 * @see hook_entity_insert()
 */
function hook_campaign_data_insert(CampaignData $entity) {
  db_insert('mytable')
    ->fields(array(
      'id' => entity_id('campaign_data', $entity),
      'extra' => print_r($entity, TRUE),
    ))
    ->execute();
}

/**
 * Acts on a $entity being inserted or updated.
 *
 * This hook is invoked before the $entity is saved to the database.
 *
 * @param CampaignDataEntity $entity
 *   The $entity that is being inserted or updated.
 *
 * @see hook_entity_presave()
 */
function hook_campaign_data_presave(CampaignData $entity) {
  $entity->name = 'foo';
}

/**
 * Responds to a $entity being updated.
 *
 * This hook is invoked after the $entity has been updated in the database.
 *
 * @param CampaignDataEntity $entity
 *   The $entitythat is being updated.
 *
 * @see hook_entity_update()
 */
function hook_campaign_data_update(CampaignData $entity) {
  db_update('mytable')
    ->fields(array('extra' => print_r($entity, TRUE)))
    ->condition('id', entity_id('campaign_data', $entity))
    ->execute();
}

/**
 * Responds to $entity deletion.
 *
 * This hook is invoked after the $entity has been removed from the database.
 *
 * @param CampaignData $entity
 *   The $entity that is being deleted.
 *
 * @see hook_entity_delete()
 */
function hook_campaign_data_delete(CampaignData $entity) {
  db_delete('mytable')
    ->condition('pid', entity_id('campaign_data', $entity))
    ->execute();
}

/**
 * Act on a entity that is being assembled before rendering.
 *
 * @param $entity
 *   The entity.
 * @param $view_mode
 *   The view mode the entity is rendered in.
 * @param $langcode
 *   The language code used for rendering.
 *
 * The module may add elements to $entity->content prior to rendering. The
 * structure of $entity->content is a renderable array as expected by
 * drupal_render().
 *
 * @see hook_entity_prepare_view()
 * @see hook_entity_view()
 */
function hook_campaign_data_view($entity, $view_mode, $langcode) {
  $entity->content['my_additional_field'] = array(
    '#markup' => $additional_field,
    '#weight' => 10,
    '#theme' => 'mymodule_my_additional_field',
  );
}

/**
 * Alter the results of entity_view() for entities.
 *
 * @param $build
 *   A renderable array representing the entities content.
 *
 * This hook is called after the content has been assembled in a structured
 * array and may be used for doing processing which requires that the complete
 * entities content structure has been built.
 *
 * If the module wishes to act on the rendered HTML of the entities rather than
 * the structured content array, it may use this hook to add a #post_render
 * callback. Alternatively, it could also implement hook_preprocess_view_alter().
 * See drupal_render() and theme() documentation respectively for details.
 *
 * @see hook_entity_view_alter()
 */
function hook_campaign_data_view_alter($build) {
  if ($build['#view_mode'] == 'full' && isset($build['an_additional_field'])) {
    // Change its weight.
    $build['an_additional_field']['#weight'] = -10;

    // Add a #post_render callback to act on the rendered HTML of the entity.
    $build['#post_render'][] = 'my_module_post_render';
  }
}

/**
 * Acts on entity_type being loaded from the database.
 *
 * This hook is invoked during entity_type loading, which is handled by
 * entity_load(), via the EntityCRUDController.
 *
 * @param array $entities
 *   An array of entity_type entities being loaded, keyed by id.
 *
 * @see hook_entity_load()
 */
function hook_campaign_data_type_load(array $entities) {
  $result = db_query('SELECT pid, foo FROM {mytable} WHERE pid IN(:ids)', array(':ids' => array_keys($entities)));
  foreach ($result as $data) {
    $entities[$data->pid]->foo = $data->foo;
  }
}

/**
 * Responds when a entity_type is inserted.
 *
 * This hook is invoked after the entity_type is inserted into the database.
 *
 * @param CampaignDataType $entity_type
 *   The entity_type that is being inserted.
 *
 * @see hook_entity_insert()
 */
function hook_campaign_data_type_insert(CampaignDataType $entity_type) {
  db_insert('mytable')
    ->fields(array(
      'id' => entity_id('campaign_data_type', $entity_type),
      'extra' => print_r($campaign_data_type, TRUE),
    ))
    ->execute();
}

/**
 * Acts on a entity_type being inserted or updated.
 *
 * This hook is invoked before the entity_type is saved to the database.
 *
 * @param CampaignDataType $entity_type
 *   The entity_type that is being inserted or updated.
 *
 * @see hook_entity_presave()
 */
function hook_campaign_data_type_presave(CampaignDataType $entity_type) {
  $entity_type->name = 'foo';
}

/**
 * Responds to a entity_type being updated.
 *
 * This hook is invoked after the entity_type has been updated in the database.
 *
 * @param CampaignDataType $entity_type
 *   The entity_type that is being updated.
 *
 * @see hook_entity_update()
 */
function hook_campaign_data_type_update(CampaignDataType $entity_type) {
  db_update('mytable')
    ->fields(array('extra' => print_r($entity_type, TRUE)))
    ->condition('id', entity_id('campaign_data_type', $entity_type))
    ->execute();
}

/**
 * Responds to entity_type deletion.
 *
 * This hook is invoked after the entity_type has been removed from the database.
 *
 * @param CampaignDataType $entitya_type
 *   The entity_type that is being deleted.
 *
 * @see hook_entity_delete()
 */
function hook_campaign_data_type_delete(CampaignDataType $entity_type) {
  db_delete('mytable')
    ->condition('pid', entity_id('campaign_data_type', $entity_type))
    ->execute();
}

/**
 * Define default entity_type configurations.
 *
 * @return
 *   An array of default entity_type, keyed by machine names.
 *
 * @see hook_default_entity_type_alter()
 */
function hook_default_campaign_data_type() {
  $defaults['main'] = entity_create('campaign_data_type', array(
    // …
  ));
  return $defaults;
}

/**
 * Alter default entity_type configurations.
 *
 * @param array $defaults
 *   An array of default entity_type, keyed by machine names.
 *
 * @see hook_default_entity_type()
 */
function hook_default_campaign_data_type_alter(array &$defaults) {
  $defaults['main']->name = 'custom name';
}
