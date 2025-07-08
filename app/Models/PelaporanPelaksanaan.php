<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class PelaporanPelaksanaan extends Model
{
    use HasFactory;
    protected $table = 'dokumen_realisasi_proker';
    protected $fillable = ['*'];

    public function MMataProgram():HasOne{
        return $this->hasOne(MataProgram::class, "id","id_mata_program");
    }
}
