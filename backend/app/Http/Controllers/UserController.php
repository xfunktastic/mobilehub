<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Actualiza la información del usuario.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateProfile(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = JWTAuth::user();

            // Verificar si el usuario está autenticado
            if (!$user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }

            // Validación de datos para la actualización de la contraseña
            $messages = validationMessages();
            $this->validate($request, [
                'full_name' => 'required|string|min:10|max:150',
                'email' => 'required|string|regex:/^[^@]+@[^@.]+.[^@]+$/|ends_with:ucn.cl,alumnos.ucn.cl,disc.ucn.cl,ce.ucn.cl',
                'year' => 'required|numeric|min:1900|max:' . (int)date('Y'),
            ], $messages);

            $errors = [];

            if ($request->input('full_name') === $user->full_name) {
                $errors['full_name'] = 'El nombre completo coincide con el actual.';
            }

            if ($request->input('email') === $user->email) {
                $errors['email'] = 'El correo electrónico coincide con el actual.';
            }

            if ($request->input('year') == $user->year) {
                $errors['year'] = 'El año coincide con el actual.';
            }

            if (!empty($errors)) {
                return response()->json(['errors' => $errors], 422);
            }

            // Actualizar la información del usuario
            $user->update([
                'full_name' => $request->input('full_name'),
                'email' => $request->input('email'),
                'year' => $request->input('year'),
            ]);

            // Crear un conjunto de datos específico para la respuesta
            $responseData = [
                'success' => 'Perfil actualizado exitosamente',
                'updated_fields' => [
                    'full_name' => $request->input('full_name'),
                    'email' => $request->input('email'),
                    'year' => $request->input('year'),
                ],
            ];

            // Respuesta JSON con información de la actualización exitosa
            return response()->json($responseData, 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Error de validación
            $errors = $e->validator->errors()->getMessages();
            return response()->json(['errors' => $errors], 422);
        } catch (\Exception $e) {
            // Excepción general
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }


        /**
     * Actualización de la contraseña del usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = JWTAuth::user();

            // Verificar si el usuario está autenticado
            if (!$user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }

            // Validación de datos para la actualización de la contraseña
            $messages = validationMessages();
            $this->validate($request, [
                'password' => 'required|string|min:8',
                'new_password' => 'required|string|min:8|different:password',
                'confirm_password' => 'required|string|min:8|same:new_password',
            ], $messages);

            // Verificar si la contraseña actual coincide con la proporcionada en la solicitud
            if (!Hash::check($request->input('password'), $user->password)) {
                return response()->json(['error' => 'La contraseña actual no es válida'], 422);
            }

            // Actualizar la contraseña del usuario
            $user->update([
                'password' => bcrypt($request->input('new_password')), // Actualiza la contraseña
            ]);

            // Respuesta JSON con información de la actualización exitosa de la contraseña
            return response()->json([
                'success' => 'Contraseña actualizada exitosamente',
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Error de validación
            $errors = $e->validator->errors()->getMessages();
            return response()->json(['errors' => $errors], 422);
        } catch (\Exception $e) {
            // Excepción general
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
