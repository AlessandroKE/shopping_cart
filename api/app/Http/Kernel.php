<?php

use App\Http\Middleware\UnescapedSlashesMiddleware;
use Symfony\Component\HttpKernel\HttpKernel;

class Kernel extends HttpKernel
{
    protected $middlewareGroups = [
        'api' => [
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \Illuminate\Http\Middleware\HandleCors::class,
        ],
    ];
    protected $middleware = [
        UnescapedSlashesMiddleware::class,
    ]; 
}
