<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisFileRenstra extends Model
{
    use HasFactory;
    protected $table = 'jenis_file_renstra';
    protected $fillable = ['*'];
}
