<?php

namespace App\Http\Controllers\auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    public function register(Request $request){

        try {
            $messages = registerValidationMessages();
            $this->validate($request,[
                'rut' => ['required','unique:users,rut','regex:/^\d{1,2}\.\d{3}\.\d{3}\-[0-9kK]$/',
                function ($attribute, $value, $fail) use ($request) {$this->validateRut($request->rut, $value, $fail);},],
                'full_name'=> 'required|min:10|max:150',
                'email' => 'required|email|ends_with:ucn.cl,alumnos.ucn.cl,disc.ucn.cl,ce.ucn.cl|unique:users,email',
                'year' => 'required|min:4|integer|between:1900,' . date('Y'),
            ], $messages);

            $user = User::create([
                'rut' => $request->rut,
                'full_name' => $request->full_name,
                'email' => $request->email,
                'password' => bcrypt($request->password), // Utilizar el RUT modificado como contraseña
                'year' => $request->year,
            ]);

            return response()->json([
                'user' => $user
            ], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    // Modulo 11
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
                $digitCalculated == 'k';
            }
            // Validar que el digito calculado no sea 11
            else if($digitCalculated == 11){
                $digitCalculated == '0';
            }

            //Si el digito calculado no es igual al digito es inválido el RUT.
            if ($digitCalculated != $digit) {
                $fail('El RUT proporcionado no es válido.');
            }
        }
    }

    public function login(){}

    public function logout(){}
}
