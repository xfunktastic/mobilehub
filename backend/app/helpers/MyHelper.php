<?php

function registerValidationMessages()
{
    $messages = [
        'rut.required' => 'El campo RUT es obligatorio.',
        'rut.unique' => 'El RUT proporcionado ya está registrado.',
        'rut.regex' => 'El formato del RUT no es válido.',
        'full_name.required' => 'El campo Nombre completo es obligatorio.',
        'full_name.min' => 'El campo Nombre completo debe tener al menos :min caracteres.',
        'full_name.max' => 'El campo Nombre completo no puede tener más de :max caracteres.',
        'email.required' => 'El campo Correo electrónico es obligatorio.',
        'email.regex' => 'El formato del Correo electrónico no es válido.',
        'email.ends_with' => 'El Correo electrónico debe terminar con uno de los dominios permitidos.',
        'email.unique' => 'El Correo electrónico ya está registrado.',
        'year.required' => 'El campo Año de nacimiento es obligatorio.',
        'year.min' => 'El Año de nacimiento debe ser igual o mayor que :min.',
        'year.integer' => 'El Año de nacimiento debe ser un número entero.',
        'year.between' => 'El Año de nacimiento debe estar entre 1990 y :max.',
    ];
    return $messages;
}

