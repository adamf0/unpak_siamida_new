<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class MasterIndikatorRenstra extends Model
{
    use HasFactory;
    protected $table = 'master_indikator_renstra';
    protected $fillable = ['*'];

    public function StandarRenstra():HasOne{
        return $this->hasOne(MasterStandarRenstra::class, 'id' , 'id_master_standar');
    }
    public function SubIndikator():HasOne{
        return $this->hasOne(MasterIndikatorRenstra::class, 'id' , 'parent');
    }
}
