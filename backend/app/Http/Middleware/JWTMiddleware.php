<?php

namespace App\Http\Middleware;

use Tymon\JWTAuth\Facades\JWTAuth;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JWTMiddleware
{
    /**
     * Maneja una solicitud entrante.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            // Autentica al usuario utilizando el token JWT
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $e) {
            // Excepciones relacionadas con el token
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                // El token no es válido
                return response()->json(['status' => 'Token inválido']);
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                // El token ha expirado
                return response()->json(['status' => 'Token expirado']);
            } else {
                // El token no está autorizado
                return response()->json(['status' => 'Token no autorizado']);
            }
        }

        // Pasa la solicitud al siguiente middleware
        return $next($request);
    }
}
