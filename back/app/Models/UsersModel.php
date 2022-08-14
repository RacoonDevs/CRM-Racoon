<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;

class UsersModel extends Model
{
    protected $table         = 'sys_users';
    protected $allowedFields = [
        'user_name','status','email','password','name','updated_by','updated_at'
    ];
    
    protected $returnType    = \App\Entities\UsersController::class;
    
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    
    /* protected $validationRules = [
        'email'        => 'is_unique[sys_users.email,id,{id}]',
    ];
    protected $validationMessages = [
        'email' => [
            'is_unique' => 'Lo siento, este email ya esta registrado intenta con otro por favor.',
        ],
    ]; */

}