<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;

class UsersModel extends Model
{
    protected $table         = 'sys_users';
    protected $allowedFields = [
        'user_name','status','email','password','name','created_by','updated_at'
    ];
    protected $returnType    = \App\Entities\UsersController::class;
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    protected $db;
}