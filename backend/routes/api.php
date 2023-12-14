<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\auth\AuthController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Registrarse
Route::post('register', [AuthController::class, 'register']);
//Iniciar sesión
Route::post('login', [AuthController::class, 'login']);
// Cerrar sesión
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware(['jwt'])->group(function()
{
    // Actualizar Contraseña
    Route::patch('/update-password', [UserController::class, 'updatePassword']);

    // Editar usuario
    Route::get('/user/{id}', [UserController::class, 'editProfile']); // Obtener datos del usuario para editar
    Route::put('/user/{id}', [UserController::class, 'updateProfile']); // Actualizar los datos del usuario

});
