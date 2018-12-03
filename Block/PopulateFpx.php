<?php

namespace SystemSpecs\Remita\Block;

use Magento\Customer\Model\Session;

class PopulateFpx extends \Magento\Framework\View\Element\Template
{

    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        Session $customerSession,
        \Magento\Framework\ObjectManagerInterface $objectManager,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->customerSession = $customerSession;
        $this->_objectManager = $objectManager;
    }

    public function getFpxConfig()
    {
        $output['fpxLogoImageUrl'] = $this->getViewFileUrl('SystemSpecs_Remita::images/fpx_logo.png');
        return $output;
    }
}
