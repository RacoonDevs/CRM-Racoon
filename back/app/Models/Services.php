<?php

namespace App\Models;

use CodeIgniter\Model;


class Services extends Model
{
/**
 * Callbacks for beforeInsert
 *
 * @var array
 */
protected $beforeInsert = [
    'insertUserstamp',
];

/**
 * Callbacks for afterUpdate
 *
 * @var array
 */
protected $afterUpdate = [
    'updateUserstamp',
];


    // -----------------------------------------------------------------------
  /**
     * This method saves the session "user_id" value to "created_by" and "updated_by" array 
     * elements before the row is inserted into the database.
     *
     */
    protected function insertUserstamp(array $data) {
        $user_id = session()->get('user_id');
        if (!empty($user_id) && 
            !array_key_exists('created_by', $data) && !array_key_exists('updated_by', $data)) {
            $data['data']['created_by'] = $user_id;
            $data['data']['updated_by'] = $user_id;
        }
        return $data;
    }

    /**
     * This method saves the session "user_id" value to "updated_by" array element before 
     * the row is inserted into the database.
     *
     */
    protected function updateUserstamp(array $data) {
        $user_id = session()->get('user_id');
        if (!empty($user_id) && !array_key_exists('updated_by', $data)) {
            $data['data']['updated_by'] = $user_id;
        }
        return $data;
    } 
}   // End of YourModelName Model Class.

/**
 * -----------------------------------------------------------------------
 * Filename: YourModelName.php
 * Location: ./app/Models/YourModelName.php
 * -----------------------------------------------------------------------
 */ 