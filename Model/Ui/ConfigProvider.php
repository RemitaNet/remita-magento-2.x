<?php

namespace SystemSpecs\Remita\Model\Ui;

use Magento\Checkout\Model\ConfigProviderInterface;
use Magento\Payment\Helper\Data as PaymentHelper;
use Magento\Store\Model\Store as Store;

/**
 * Class ConfigProvider
 */
final class ConfigProvider implements ConfigProviderInterface
{
    const CODE = 'systemspecs_remita';

    private $method;

    public function __construct(PaymentHelper $paymentHelper, Store $store)
    {
        $this->method = $paymentHelper->getMethodInstance(self::CODE);
        $this->store = $store;
    }

    /**
     * Retrieve assoc array of checkout configuration
     *
     * @return array
     */
    public function getConfig()
    {
        $public_key = $this->method->getConfigData('remita_public_key');
        $secret_key = $this->method->getConfigData('remita_secret_key');
        $test_mode = $this->method->getConfigData('test_mode');
        $uniqueRef     = uniqid();
        $remita_url = "https://remitademo.net/payment/v1/remita-pay-inline.bundle.js";
        $remitaQueryUrl = "https://remitademo.net/payment/v1/payment/query/";
        if ($test_mode == 0) {
            $remita_url = "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";
            $remitaQueryUrl = "https://login.remita.net/payment/v1/payment/query/";
        }

        return [
            'payment' => [
                self::CODE => [
                    'public_key' => $public_key,
                    'secret_key' => $secret_key,
                    'remita_url' => $remita_url,
                    'remita_query_url' => $remitaQueryUrl,
                    'test_mode' => $test_mode,
                    'uniqueRef' => $uniqueRef ,
                    'api_url' => $this->store->getBaseUrl() . 'rest/'
                ]
            ]
        ];
    }
}
