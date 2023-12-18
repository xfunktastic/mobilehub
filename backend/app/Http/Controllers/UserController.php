<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Obtiene y muestra la información del usuario autenticado.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function editProfile(Request $request)
    {
        // Obtener el usuario autenticado
        $user = JWTAuth::user();

        // Verificar si el usuario está autenticado
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Preparar los datos del usuario autenticado
        $userData = [
            'year' => $user->year,
            'full_name' => $user->full_name,
            'email' => $user->email,
        ];

        // Verificar si se encontraron los datos del usuario
        if (!$userData) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Devolver los datos del usuario en formato JSON
        return response()->json(['user' => $userData]);
    }

    /**
     * Actualiza el perfil del usuario autenticado.
     *
     * @param  Request  $request
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

            // Validar los datos para la actualización del perfil
            $messages = validationMessages();
            $this->validate($request, [
                'full_name' => 'required|string|min:10|max:150',
                'email' => 'required|string|regex:/^[^@]+@[^@.]+.[^@]+$/|ends_with:ucn.cl,alumnos.ucn.cl,disc.ucn.cl,ce.ucn.cl|unique:users,email,' . $user->id,
                'year' => 'required|numeric|min:1900|max:' . (int)date('Y'),
            ], $messages);

            // Almacenar los valores existentes antes de la actualización
            $oldFullName = $user->full_name;
            $oldEmail = $user->email;
            $oldYear = $user->year;

            // Actualizar la información del usuario
            $user->full_name = $request->input('full_name');
            $user->email = $request->input('email');
            $user->year = $request->input('year');
            $user->save();

            // Verificar si se realizaron cambios antes de enviar la respuesta
            $changesMade = (
                $oldFullName !== $user->full_name ||
                $oldEmail !== $user->email ||
                $oldYear !== $user->year
            );

            // Generar la respuesta basada en los cambios realizados
            if ($changesMade) {
                return response()->json([
                    'success' => 'Información actualizada exitosamente',
                ], 200);
            } else {
                return response()->json([
                    'success' => 'No se realizaron cambios en la información',
                ], 200);
            }
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Manejar errores de validación
            $errors = $e->validator->errors()->getMessages();
            return response()->json(['errors' => $errors], 422);
        } catch (\Exception $e) {
            // Manejar excepciones generales
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Actualiza la contraseña del usuario autenticado.
     *
     * @param  Request  $request
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

            // Validar los datos para la actualización de la contraseña
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
            // Manejar errores de validación
            $errors = $e->validator->errors()->getMessages();
            return response()->json(['errors' => $errors], 422);
        } catch (\Exception $e) {
            // Manejar excepciones generales
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
