# Harlem Shake V1.0

Make your site dance, literally.

## Installation

Install using Artisan CLI:

```shell
php artisan bundle:install harlemshake
```

Add the following line to application/bundles.php

```php
'harlemshake' => array('auto' => true),
```

Publish the bundle assets to your public folder.

```shell
php artisan bundle:publish
```

Add the following to the page where you want Harlem Shake script to be active.

```php
{{ Asset::container('harlemshake')->scripts(); }}
```

The script requires jQuery for the Konami Code execution.

After the bundle assets are published and the script embedded in one of your pages navigate to it and do the Konami Code :
 ↑ ↑ ↓ ↓ ← → ← → B A

 That's it!

 Enjoy the Harlem Shake dancing website!

Plugin published under MIT license