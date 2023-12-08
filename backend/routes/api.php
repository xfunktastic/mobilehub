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
Route::post('/register', [AuthController::class, 'register']);
//Iniciar sesión
Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['jwt'])->group(function()
{
    // Logout
    Route::post('/user/logout', [AuthController::class, 'logout']);
    // Editar usuario
    Route::put('/user/edit', [UserController::class, 'edit']);
});
