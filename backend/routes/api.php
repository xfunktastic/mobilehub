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

// Registrarse - Permite a los usuarios registrarse en la aplicación
Route::post('register', [AuthController::class, 'register']);

// Iniciar sesión - Permite a los usuarios iniciar sesión en la aplicación
Route::post('login', [AuthController::class, 'login']);

// Cerrar sesión - Permite a los usuarios cerrar sesión en la aplicación
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware(['jwt'])->group(function() {
    // Actualizar Contraseña - Permite a los usuarios autenticados actualizar su contraseña
    Route::patch('/update-password', [UserController::class, 'updatePassword']);

    // Editar usuario
    Route::get('/user', [UserController::class, 'editProfile']); // Obtiene datos del usuario para editar
    Route::patch('/user', [UserController::class, 'updateProfile']); // Actualiza los datos del usuario
});

