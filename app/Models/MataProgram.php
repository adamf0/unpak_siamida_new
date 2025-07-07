<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MataProgram extends Model
{
    use HasFactory;
    protected $table = 'mata_program';
    protected $fillable = ['*'];

    public function MTahun():HasOne{
        return $this->hasOne(MasterTahun::class, "id","id_master_tahun");
    }
}
