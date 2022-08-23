<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;

class UsersDetailsModel extends Model
{
    protected $table         = 'sys_user_details';
    protected $allowedFields = [
        'photo_url','address','phone','birthdate','id_user','created_by','updated_at','updated_by'
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
    // protected $beforeInsert = [
    //     'insertUserstamp',
    // ];
    

    // protected $afterUpdate = [
    //     'updateUserstamp',
    // ];
    
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