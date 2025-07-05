<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MasterStandarRenstra extends Model
{
    use HasFactory;
    protected $table = 'master_standar_renstra';
    protected $fillable = ['*'];
}