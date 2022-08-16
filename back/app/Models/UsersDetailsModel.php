<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;

class UsersDetailsModel extends Model
{
    protected $table         = 'sys_user_details';
    protected $allowedFields = [
        'photo_url','addres','phone','id_user','created_by','updated_at'
    ];
    protected $returnType    = \App\Entities\UsersDetailsController::class;
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    /* protected $validationRules = [
        'phone'        => 'is_unique[sys_user_details.phone, id, {id}]',
    ];
    protected $validationMessages = [
        'phone' => [
            'is_unique' => 'Lo siento, el numero de celular debe ser unico.',
        ],
    ]; */

    

}