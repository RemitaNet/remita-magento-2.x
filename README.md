# Remita Magento2 Payment Gateway

---
- [Summary](#summary)
- [Quickstart](#quickstart)
- [Setup](#setup)

---
### Summary

With Remita Magento2 Payment Gateway, the store admin can easily add all desired payment methods to the Magento 2 webshop. Please refer to https://www.remita.net for an overview of all features and services. 

---
### Quickstart

##### Install

In command line, navigate to the installation directory of magento2

Enter the following commands:

```
composer require systemspecs/remita-magento2-payment-gateway
```

* Wait while dependencies are updated.

```
php bin/magento module:enable SystemSpecs_Remita --clear-static-content
php bin/magento setup:upgrade
php bin/magento setup:di:compile
```

The plugin is now installed

---
### Setup

1. Log into the Magento Admin
2. Go to *Stores* / *Configuration*
3. Go to *Sales* / *Payment Methods*
4. Scroll down to find the Remita Settings
5. Enter the public key and secrete key (these can be found in the Remita Gateway Admin Panel --> https://login.remita.net/remita/registration/signup.spa
7. Enable the desired payment methods and set allowed countries
8. Save the settings
