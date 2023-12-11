<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{
    /**
     * Actualiza la información del usuario.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Request $request)
    {
        try {
            // Validación de datos ingresados
            $messages = validationMessages();
            $validator = $this->validate($request, [
                'full_name' => 'required|string|min:10|max:150',
                'email' => 'required|string|regex:/^[^@]+@[^@.]+.[^@]+$/|ends_with:ucn.cl,alumnos.ucn.cl,disc.ucn.cl,ce.ucn.cl|unique:users,email',
                'year' => 'required|integer|min:4|integer|between:1900,' . date('Y'),
            ], $messages);

            $user = JWTAuth::user();

            if (!$user) {
                return response()->json(['error' => 'Usuario no autenticado'], 401);
            }

            // Verifica que no tenga los mismos campos que antes
            if (
                $request->input('full_name') === $user->full_name &&
                $request->input('email') === $user->email &&
                $request->input('year') === $user->year
            ) {
                return response()->json(['message' => 'No has hecho cambios'], 200);
            }

            // Actualiza los datos del usuario
            $user->full_name = $request->input('full_name', $user->full_name);
            $user->email = $request->input('email', $user->email);
            $user->year = $request->input('year', $user->year);
            $user->save();

            $userData = [
                'full_name' => $user->full_name,
                'email' => $user->email,
                'year' => $user->year,
            ];

            return response()->json(['success' => 'Usuario actualizado correctamente', 'user' => $userData], 200);
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Manejo de errores de validación
            $errors = $e->errors();
            return response()->json(['validation_errors' => $errors], 422);
        } catch (\Exception $e) {
            // Manejo de otros errores
            return response()->json(['error' => 'Error al actualizar el usuario: ' . $e->getMessage()], 500);
        }
    }
}
