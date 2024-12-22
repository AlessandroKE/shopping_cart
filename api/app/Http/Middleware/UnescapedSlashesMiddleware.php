<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UnescapedSlashesMiddleware
{
    /**
     * Handle an outgoing request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($response instanceof \Illuminate\Http\JsonResponse) {
            $response->setEncodingOptions(
                $response->getEncodingOptions() | JSON_UNESCAPED_SLASHES
            );
        }

        return $response;
    }
}
