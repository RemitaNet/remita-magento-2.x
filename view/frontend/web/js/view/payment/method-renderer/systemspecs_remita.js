define(
    [
        "jquery",
        "Magento_Checkout/js/view/payment/default",
        "Magento_Checkout/js/action/place-order",
        "Magento_Checkout/js/model/payment/additional-validators",
        "Magento_Checkout/js/model/quote",
        "Magento_Checkout/js/model/full-screen-loader",
        "Magento_Checkout/js/action/redirect-on-success",
        "mage/url"
    ],
    function (
        $,
        Component,
        placeOrderAction,
        additionalValidators,
        quote,
        fullScreenLoader,
        redirectOnSuccessAction,
        url
    ) {

        'use strict';

        return Component.extend({
            redirectAfterPlaceOrder: false,
            defaults: {

                template: 'SystemSpecs_Remita/payment/form'
            },
            placeOrderHandler: null,
            fpxImageSrc: window.populateFpx.fpxLogoImageUrl,

            initialize: function() {
                this._super();

                var remitaUrl = window.checkoutConfig.payment.systemspecs_remita.remita_url;

                $("head").append('<script src="' + remitaUrl +'"></script>');
                $("head").append('<script src="https://cdnjs.cloudflare.com/ajax/libs/js-sha512/0.8.0/sha512.min.js"></script>')
                return this;
            },

            getCode: function() {

                return 'systemspecs_remita';
            },

            afterPlaceOrder: function() {
                 var checkoutConfig = window.checkoutConfig;
                 var paymentData = quote.billingAddress();
                 var remitaConfiguration = checkoutConfig.payment.systemspecs_remita;



                var customerData = checkoutConfig.customerData;


                var totalPrice = quote.totals().grand_total;
                var phoneNum = paymentData.telephone;
                var city = paymentData.city;
                var street = paymentData.street;
                var company = paymentData.company;
                var lastname = paymentData.lastname;
                var firstname = paymentData.firstname;
                var publicKey = remitaConfiguration.public_key;
                var secretKey = remitaConfiguration.secret_key;
                var uniqueRef = remitaConfiguration.uniqueRef;

                if (checkoutConfig.isCustomerLoggedIn) {
                    var customerData = checkoutConfig.customerData;
                    paymentData.email = customerData.email;
                } else {
                    var storageData = JSON.parse(
                        localStorage.getItem("mage-cache-storage")
                    )["checkout-data"];
                    paymentData.email = storageData.validatedEmailValue;
                }



                var quoteId = checkoutConfig.quoteItemData[0].quote_id;
                var uniqueOrderId = uniqueRef + '_' + quoteId;

                var paymentEngine = RmPaymentEngine.init({

                    key: publicKey,
                    customerId: paymentData.email,
                    firstName: firstname,
                    lastName: lastname,
                    narration: "bill pay",
                    transactionId: uniqueOrderId,
                    email: paymentData.email,
                    amount: totalPrice,
                    onSuccess: function (response) {
                       validateTransactionDebitedAmount(uniqueOrderId, totalPrice, secretKey, publicKey);
                    }

                });

                paymentEngine.showPaymentWidget();
            }
        });


        function getTransactionDetails(transactionId, secretKey, publicKey)
        {

            return fetch(window.checkoutConfig.payment.systemspecs_remita.remita_query_url + transactionId, {

                contentType: 'application/json',
                headers: {
                    publicKey: publicKey,

                    TXN_HASH: sha512(transactionId + secretKey)
                }
            });
        }

        function validateTransactionDebitedAmount(transactionId, amount, secretKey, publicKey)
        {
            getTransactionDetails(transactionId,secretKey, publicKey).then(
                function success(successData)
                {
                    return successData.json();
                }
            ).then(function (data) {
                if (data.responseData[0].amount == amount) {
                    redirectOnSuccessAction.execute();
                } else {
                    alert('Error!! Amount and Debited Amount are different');
                }
            }
            ).catch(function error(error)
                {
                    console.log(error);});
                }
        }
);