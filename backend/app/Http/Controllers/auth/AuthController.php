<?php

namespace App\Http\Controllers\auth;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $messages = validationMessages();
            $this->validate($request,[
                'rut' => ['required','string','unique:users,rut','regex:/^\d{1,2}\.\d{3}\.\d{3}\-[0-9kK]$/',
                function ($attribute, $value, $fail) use ($request) {$this->validateRut($request->rut, $value, $fail);},],
                'full_name'=> 'required|string|min:10|max:150',
                'email' => 'required|string|regex:/^[^@]+@[^@.]+.[^@]+$/|ends_with:ucn.cl,alumnos.ucn.cl,disc.ucn.cl,ce.ucn.cl|unique:users,email',
                'year' => 'required|integer|min:4|integer|between:1900,' . date('Y'),
            ], $messages);

            $cleanedRut = $this->validateRut($request->rut, $request->rut, function () {});
            $user = User::create([
                'rut' => $request->rut,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => $cleanedRut, // Utilizar el RUT modificado como contraseña
                'year' => $request->year,
            ]);

            $token = JWTAuth::fromUser($user);
            $user->update(['state' => 'auth']);

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Validación digito verificador (Modulo 11)
    public function validateRut($rut, $value, $fail)
    {
        // Limpiar el rut de puntos y guión
        $cleanedRut = preg_replace('/[^0-9kK]/', '', $rut);

        // Verificar la longitud del RUT
        $rutLength = strlen($cleanedRut);

        if ($rutLength == 9 || $rutLength == 8) {
            // Obtenemos el digito y el body
            $digit = substr($cleanedRut, -1);
            $body = substr($cleanedRut, 0, -1);

            // Invertir la cadena
            $bodyInverted = strrev($body);

            // Definimos lo multipliers y la suma
            $mult = [2,3,4,5,6,7];
            $sum = 0;

            //Calculo del digit calculado
            for($i = 0; $i < strlen($bodyInverted); $i++){
                $sum += $bodyInverted[$i] * $mult[$i % count($mult)];
                $rest = $sum / 11;
            }
            $digitCalculated = 11 - ($sum - (floor($rest) * 11));

            // Validar que el digito calculado no sea 10
            if ($digitCalculated == 10){
                $cleanedRut = substr_replace($cleanedRut, 'k', -1);
                $digitCalculated = 'k';
            }
            // Validar que el digito calculado no sea 11
            else if($digitCalculated == 11){
                $cleanedRut = substr_replace($cleanedRut, '0', -1);
                $digitCalculated = '0';
            }

            //Si el digito calculado no es igual al digito es inválido el RUT.
            if ($digitCalculated != $digit) {
                $fail('El RUT proporcionado no es válido.');
            }
            //Si el digito calculado es igual al digito es válido el RUT y lo retorna.
            else {
                $cleanedRut = substr($cleanedRut, 0, -1);
                return $cleanedRut;
            }
        }
    }

    public function login(Request $request)
    {
        try {
            $messages = validationMessages();
            $this->validate($request, [
                'email' => [
                    'string',
                    'required',
                    'regex:/^[^@]+@[^@.]+.[^@]+$/',
                    'exists:users,email',
                ],
                'password' => 'string|required|min:7',
            ], $messages);

            $credentials = $request->only('email', 'password');

            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciales inválidas'], 401);
            }

            // Obtener usuario autenticado
            $user = JWTAuth::user();
            $user->update(['state' => 'auth']);
            $email = $request->input('email');

            return response()->json([
                'success' => 'Inicio de sesión exitoso',
                'email' => $email,
                'token' => $token,
            ], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function logout()
    {
        try {
            // Invalidar el token actual del usuario
            JWTAuth::invalidate(JWTAuth::getToken());

            // Obtener usuario autenticado
            $user = JWTAuth::user();
            if ($user) {
                $user->update(['state' => 'guest']);
            }

            return response()->json([
                'success' => 'Cierre de sesión exitoso',
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'error' => 'No se pudo cerrar sesión',
            ], 500);
        }
    }

    public function updatePassword(){}
}
