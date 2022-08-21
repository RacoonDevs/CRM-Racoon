<?php

namespace App\Models;

use CodeIgniter\Model;
use CodeIgniter\Database\ConnectionInterface;
use Modules\Authentication\Models\UserAuthModel;


class ProjectModel extends Model
{
    protected $table         = 'sls_project';
    protected $allowedFields = [
        'name','status','icono_url','descripcion','start_date','end_date','delete_project','created_by','updated_by','updated_at'
    ];
    
    protected $returnType    = \App\Entities\ProjectController::class;
    
    protected $useTimestamps = true;
    protected $createdField  = 'created_at';
    protected $updatedField  = 'updated_at';
    

}