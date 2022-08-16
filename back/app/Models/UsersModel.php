<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use Modules\Authentication\Models\UserAuthModel;


class UsersModel extends Model
{
    protected $table         = 'sys_users';
    protected $allowedFields = [
        'user_name','status','email','password','name','created_by','updated_by','updated_at'
    ];
    
    protected $returnType    = \App\Entities\UsersController::class;
    
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    

    protected $validationRules = [
        'email'        => 'is_unique[sys_users.email,id,{id}]',
    ];
    protected $validationMessages = [
        'email' => [
            'is_unique' => 'Lo siento, este email ya esta registrado intenta con otro por favor.',
        ],
    ]; 
    // protected $beforeInsert = [
    //     'insertUserstamp',
    // ];
    
    // protected $afterUpdate = [
    //     'updateUserstamp',
    // ];
    
    
        // -----------------------------------------------------------------------
        // protected function insertUserstamp(array $data) {
        //     $user_id = session()->get('id');
        //     if (!empty($user_id) && 
        //         !array_key_exists('created_by', $data) && !array_key_exists('updated_by', $data)) {
        //         $data['data']['created_by'] = $user_id;
        //         $data['data']['updated_by'] = $user_id;
        //     }
        //     return $data;
        // }
    
        // protected function updateUserstamp(array $data) {
        //     $user_id = session()->get('id');
        //     if (!empty($user_id) && !array_key_exists('updated_by', $data)) {
        //         $data['data']['updated_by'] = $user_id;
        //     }
        //     return $data;
        // } 

}