/**
 * Copyright © 2018 Magento. All rights reserved.
 * See COPYING.txt for license details.
 */
/*browser:true*/
/*global define*/
define(
    [
        'uiComponent',
        'Magento_Checkout/js/model/payment/renderer-list'
    ],
    function (
        Component,
        rendererList
    ) {
        'use strict';
        rendererList.push(
            {
                type: 'systemspecs_remita',
                component: 'SystemSpecs_Remita/js/view/payment/method-renderer/systemspecs_remita'
            }
        );
        /** Add view logic here if needed */
        return Component.extend({});
    }
);
