<?php

/**
 * Record view callback.
 */
function campaign_data_view($entity) {
  drupal_set_title(entity_label('campaign_data', $entity));
  return entity_view('campaign_data', array(entity_id('campaign_data', $entity) => $entity), 'full');
}
