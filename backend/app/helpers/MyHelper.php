<?php

function validationMessages()
{
    $messages = [
        'rut.required' => 'El campo RUT es obligatorio.',
        'rut.unique' => 'El RUT proporcionado ya está registrado.',
        'rut.regex' => 'El formato del RUT no es válido.',
        'rut.string' => 'El RUT debe ser texto',
        'full_name.required' => 'El campo Nombre completo es obligatorio.',
        'full_name.min' => 'El campo Nombre completo debe tener al menos :min caracteres.',
        'full_name.max' => 'El campo Nombre completo no puede tener más de :max caracteres.',
        'full_name.string' => 'El Nombre completo debe ser texto',
        'email.required' => 'El campo Correo electrónico es obligatorio.',
        'email.regex' => 'El formato del Correo electrónico no es válido.',
        'email.ends_with' => 'El Correo electrónico debe terminar con uno de los dominios permitidos.',
        'email.unique' => 'El Correo electrónico ya está registrado.',
        'email.string' => 'El Correo electrónico debe ser texto',
        'year.required' => 'El campo Año de nacimiento es obligatorio.',
        'year.min' => 'El Año de nacimiento debe ser igual o mayor que :min.',
        'year.max' => 'El Año de nacimiento debe ser igual o menor que :max.',
        'year.numeric' => 'El Año de nacimiento debe ser un número entero.',
        'year.between' => 'El Año de nacimiento debe estar entre 1990 y :max.',
        'password.required' => 'La contraseña es obligatoria.',
        'password.string' => 'La contraseña debe ser texto',
        'new_password.required' => 'El campo de nueva contraseña es obligatorio.',
        'new_password.string' => 'El campo de nueva contraseña debe ser una cadena de texto.',
        'new_password.different' => 'La nueva contraseña debe ser diferente a la contraseña actual.',
        'confirm_password.required' => 'El campo de confirmación de contraseña es obligatorio.',
        'confirm_password.string' => 'El campo de confirmación de contraseña debe ser una cadena de texto.',
        'confirm_password.min' => 'El campo de confirmación de contraseña debe tener al menos :min caracteres.',
        'confirm_password.same' => 'La confirmación de contraseña debe ser igual a la nueva contraseña.',
    ];
    return $messages;
}

