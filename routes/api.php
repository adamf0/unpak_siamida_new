<?php

use App\Http\Controllers\ApiJenisFileRenstraController;
use App\Http\Controllers\ApiStandarRenstraController;
use Architecture\Application\Controller\JenisFileRenstraController;
use Illuminate\Support\Facades\Route;

Route::get('/jenis_file_renstra', [ApiJenisFileRenstraController::class, 'index'])->name('api_jenis_file_renstra.index');
Route::post('/jenis_file_renstra', [ApiJenisFileRenstraController::class, 'store'])->name('api_jenis_file_renstra.store');
Route::put('/jenis_file_renstra', [ApiJenisFileRenstraController::class, 'update'])->name('api_jenis_file_renstra.update');
Route::delete('/jenis_file_renstra/{id}', [ApiJenisFileRenstraController::class, 'destroy'])->name('api_jenis_file_renstra.destroy');
Route::get('/jenis_file_renstra/{id}', [ApiJenisFileRenstraController::class, 'detail'])->name('api_jenis_file_renstra.detail');

Route::get('/master_standar_renstra', [ApiStandarRenstraController::class, 'index'])->name('api_master_standar_renstra.index');
Route::post('/master_standar_renstra', [ApiStandarRenstraController::class, 'store'])->name('api_master_standar_renstra.store');
Route::put('/master_standar_renstra', [ApiStandarRenstraController::class, 'update'])->name('api_master_standar_renstra.update');
Route::delete('/master_standar_renstra/{id}', [ApiStandarRenstraController::class, 'destroy'])->name('api_master_standar_renstra.destroy');
Route::get('/master_standar_renstra/{id}', [ApiStandarRenstraController::class, 'detail'])->name('api_master_standar_renstra.detail');

