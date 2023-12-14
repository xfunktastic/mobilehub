<?php

function validationMessages()
{
    $messages = [
        'rut.required' => 'El campo RUT es obligatorio.',
        'rut.unique' => 'El RUT proporcionado ya está registrado.',
        'rut.regex' => 'El formato del RUT no es válido.',
        'rut.string' => 'El RUT debe ser texto.',
        'full_name.required' => 'El campo nombre completo es obligatorio.',
        'full_name.min' => 'El campo nombre completo debe tener al menos :min caracteres.',
        'full_name.max' => 'El campo nombre completo no puede tener más de :max caracteres.',
        'full_name.string' => 'El nombre completo debe ser texto.',
        'email.required' => 'El campo correo electrónico es obligatorio.',
        'email.regex' => 'El formato del correo electrónico no es válido.',
        'email.ends_with' => 'El correo electrónico debe tener dominio de la UCN.',
        'email.unique' => 'El correo electrónico ya está registrado.',
        'email.string' => 'El correo electrónico debe ser texto.',
        'year.required' => 'El campo año de nacimiento es obligatorio.',
        'year.min' => 'El año de nacimiento debe ser igual o mayor que :min.',
        'year.max' => 'El año de nacimiento debe ser igual o menor que :max.',
        'year.numeric' => 'El año de nacimiento debe ser un número entero.',
        'year.between' => 'El año de nacimiento debe estar entre 1990 y :max.',
        'password.required' => 'La contraseña es obligatoria.',
        'password.string' => 'La contraseña debe ser texto.',
        'password.min' => 'La contraseña debe tener al menos :min caracteres.',
        'new_password.different' => 'La contraseña nueva debe ser diferente a la contraseña actual.',
        'new_password.required' => 'El campo de contraseña nueva es obligatorio.',
        'new_password.string' => 'La contraseña nueva debe ser texto.',
        'new_password.min' => 'La contraseña nueva debe tener al menos :min caracteres.',
        'confirm_password.required' => 'El campo de confirmación de contraseña es obligatorio.',
        'confirm_password.string' => 'La contraseña confirmada debe ser texto.',
        'confirm_password.min' => 'La contraseña confirmada debe tener al menos :min caracteres.',
        'confirm_password.same' => 'La contraseña confirmada debe ser igual a la contraseña nueva.',
    ];
    return $messages;
}

