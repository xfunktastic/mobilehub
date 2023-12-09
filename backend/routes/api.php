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

Route::middleware(['jwt'])->group(function()
{
    // Cerrar sesión
    Route::post('/logout', [AuthController::class, 'logout']);

    // Actualizar Contraseña
    Route::put('/update-password/{rut}', [AuthController::class, 'updatePassword']);

    // //Ver repositorios
    // Route::get('/users/', [UserController::class, 'edit']);

    // //Ver commits de un repositorio
    // Route::get('/users/', [UserController::class, 'edit']);

    // Editar usuario
    Route::put('/profile/edit/{rut}', [UserController::class, 'edit']);
});
