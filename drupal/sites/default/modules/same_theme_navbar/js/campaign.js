(function($) {
'use strict';

    Drupal.behaviors.campaign_navbar = {
        attach: function(context, settings) {
            localStorage.setItem('Drupal.navbar.activeTabID', '"navbar-item--campaign"');
            localStorage.setItem('Drupal.navbar.activeTab', '"navbar-item--campaign"');
            // localStorage.setItem('Drupal.navbar.trayVerticalLocked', "true");
        }
    };

    Drupal.behaviors.navbar_campaign = {
        attach: function(context, settings) {
            var navbar_tab = $('#navbar-item--campaign');

            $('#' + navbar_tab.data('navbar-tray') + ' .navbar-menu > ul > li').hover(function() {
                if ($(this).has('ul.menu')) {
                    $(this).parent().find('ul.menu').removeClass('campaign-menu-active').hide();
                    $(this).find('ul.menu').addClass('campaign-menu-active').show();
                }
            }, function() {
                $(this).parent().find('ul.menu').removeClass('campaign-menu-active').hide();
            });
        }
    }
})(jQuery);