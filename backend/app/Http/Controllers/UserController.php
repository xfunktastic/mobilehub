<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function editProfile(Request $request, $id)
    {
        // Obtener el usuario autenticado
        $user = JWTAuth::user();

        // Verificar si el usuario está autenticado
        if (!$user) {
            return response()->json(['error' => 'Usuario no autenticado'], 401);
        }

        // Verificar si el usuario que solicita la edición es el mismo que el usuario a editar
        if ($user->id != $id) {
            return response()->json(['message' => 'No tienes permiso para editar este usuario'], 403);
        }

        // Encontrar y retornar los datos específicos del usuario
        $userData = User::select('year', 'full_name', 'email')->find($id);

        if (!$userData) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        return response()->json(['user' => $userData]);
    }

    public function updateProfile(Request $request, $id)
    {}

    public function updatePassword(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = JWTAuth::user();

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
