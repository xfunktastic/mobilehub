<?php

namespace App\Http\Controllers\auth;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Registro de usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            // Validación de datos ingresados
            $messages = validationMessages();
            $this->validate($request, [
                'full_name' => 'required|string|min:10|max:150',
                'email' => 'required|string|regex:/^[^@]+@[^@.]+.[^@]+$/|ends_with:ucn.cl,alumnos.ucn.cl,disc.ucn.cl,ce.ucn.cl|unique:users,email',
                'year' => 'required|numeric|min:1900|max:' . (int)date('Y'),
                'rut' => [
                    'required',
                    'string',
                    'unique:users,rut',
                    'regex:/^\d{1,2}\.\d{3}\.\d{3}\-[0-9kK]$/',
                    function ($attribute, $value, $fail) use ($request) {
                        $this->validateRut($request->rut, $value, $fail);
                    },
                ],

            ], $messages);

            // Validación y limpieza del RUT
            $cleanedRut = $this->validateRut($request->rut, $request->rut, function () {});

            // Creación del nuevo usuario
            $user = User::create([
                'rut' => $request->rut,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => bcrypt($cleanedRut), // Utilizar el RUT modificado como contraseña
                'year' => $request->year,
            ]);

            // Generación de token JWT para el usuario recién registrado
            $token = JWTAuth::fromUser($user);

            // Respuesta JSON con información del usuario y el token
            return response()->json([
                'user' => $user,
                'token' => $token,
                'success' => 'Has creado un usuario',
            ], 201);
        } catch (ValidationException $e) {
            // Error de validación
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            // Excepción general
            return response()->json(['errors' => $e->getMessage()], 500);
        }
    }

    /**
     * Validación del dígito verificador del RUT (Módulo 11).
     *
     * @param  string  $rut
     * @param  mixed  $value
     * @param  \Closure  $fail
     * @return mixed
     */
    public function validateRut($rut, $value, $fail)
    {
        // Limpiar el RUT de puntos y guión
        $cleanedRut = preg_replace('/[^0-9kK]/', '', $rut);

        // Verificar la longitud del RUT
        $rutLength = strlen($cleanedRut);

        if ($rutLength == 9 || $rutLength == 8) {
            // Obtenemos el dígito y el cuerpo del RUT
            $digit = substr($cleanedRut, -1);
            $body = substr($cleanedRut, 0, -1);

            // Invertir la cadena del cuerpo del RUT
            $bodyInverted = strrev($body);

            // Definir los multiplicadores y la suma
            $mult = [2, 3, 4, 5, 6, 7];
            $sum = 0;

            // Cálculo del dígito verificador
            for ($i = 0; $i < strlen($bodyInverted); $i++) {
                $sum += $bodyInverted[$i] * $mult[$i % count($mult)];
                $rest = $sum / 11;
            }
            $digitCalculated = 11 - ($sum - (floor($rest) * 11));

            // Validar que el dígito calculado no sea 10
            if ($digitCalculated == 10) {
                $cleanedRut = substr_replace($cleanedRut, 'k', -1);
                $digitCalculated = 'k';
            }
            // Validar que el dígito calculado no sea 11
            else if ($digitCalculated == 11) {
                $cleanedRut = substr_replace($cleanedRut, '0', -1);
                $digitCalculated = '0';
            }

            // Si el dígito calculado no es igual al dígito ingresado, el RUT es inválido
            if ($digitCalculated != $digit) {
                $fail('El RUT proporcionado no es válido.');
            }
            // Si el dígito calculado es igual al dígito ingresado, el RUT es válido y se retorna
            else {
                return $cleanedRut;
            }
        }
    }

    /**
     * Inicio de sesión del usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function login(Request $request)
    {
        try {
            // Validación de campos requeridos
            $messages = validationMessages();
            $this->validate($request, [
                'email' => 'required|regex:/^[^@]+@[^@.]+\.[^@]+$/',
                'password' => 'required|min:8',
            ], $messages);

            // Obtener las credenciales del usuario
            $credentials = $request->only('email', 'password');

            // Verificar las credenciales
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciales inválidas'], 401);
            }

            $email = $request->input('email');

            // Respuesta JSON con información del inicio de sesión
            return response()->json([
                'success' => 'Inicio de sesión exitoso',
                'email' => $email,
                'token' => $token,
            ], 200);
        } catch (ValidationException $e) {
            // Error de validación
            $errors = $e->validator->errors()->getMessages();
            return response()->json(['errors' => $errors], 422);
        } catch (\Exception $e) {
            // Excepción general
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Cierre de sesión del usuario.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        try {
            // Invalidar el token actual del usuario
            JWTAuth::invalidate(JWTAuth::getToken());

            // Respuesta JSON con información del cierre de sesión
            return response()->json([
                'success' => 'Cierre de sesión exitoso',
            ], 200);
        } catch (JWTException $e) {
            // Manejo de excepciones en caso de error al cerrar sesión
            return response()->json([
                'error' => 'No se pudo cerrar sesión',
            ], 500);
        }
    }

}
