<?php

namespace SystemSpecs\Remita\Model;

use Magento\Payment\Helper\Data as PaymentHelper;

class Payment
{
    const CODE = 'systemspecs_remita';

    private $config;

    private $remita;
    
    /**
     * @var EventManager
     */
    private $eventManager;

    public function __construct(
        PaymentHelper $paymentHelper,
        \Magento\Framework\Event\Manager $eventManager
    ) {
        $this->eventManager = $eventManager;
        $this->config = $paymentHelper->getMethodInstance(self::CODE);
    }
}
