<?php

use App\Http\Controllers\ApiIndikatorController;
use App\Http\Controllers\ApiJenisFileRenstraController;
use App\Http\Controllers\ApiMasterTahunController;
use App\Http\Controllers\ApiStandarRenstraController;
use Illuminate\Support\Facades\Route;

Route::get('/jenis_file_renstra', [ApiJenisFileRenstraController::class, 'index'])->name('api_jenis_file_renstra.index');
Route::post('/jenis_file_renstra', [ApiJenisFileRenstraController::class, 'store'])->name('api_jenis_file_renstra.store');
Route::put('/jenis_file_renstra', [ApiJenisFileRenstraController::class, 'update'])->name('api_jenis_file_renstra.update');
Route::delete('/jenis_file_renstra/{id}', [ApiJenisFileRenstraController::class, 'destroy'])->name('api_jenis_file_renstra.destroy');
Route::get('/jenis_file_renstra/{id}', [ApiJenisFileRenstraController::class, 'detail'])->name('api_jenis_file_renstra.detail');

Route::get('/master_standar_renstra', [ApiStandarRenstraController::class, 'index'])->name('api_master_standar_renstra.index');
Route::get('/master_standar_renstra/list', [ApiStandarRenstraController::class, 'list_select'])->name('api_master_standar_renstra.list_select');
Route::post('/master_standar_renstra', [ApiStandarRenstraController::class, 'store'])->name('api_master_standar_renstra.store');
Route::put('/master_standar_renstra', [ApiStandarRenstraController::class, 'update'])->name('api_master_standar_renstra.update');
Route::delete('/master_standar_renstra/{id}', [ApiStandarRenstraController::class, 'destroy'])->name('api_master_standar_renstra.destroy');
Route::get('/master_standar_renstra/{id}', [ApiStandarRenstraController::class, 'detail'])->name('api_master_standar_renstra.detail');

Route::get('/master_indikator_renstra', [ApiIndikatorController::class, 'index'])->name('api_master_indikator_renstra.index');
Route::get('/master_indikator_renstra/list', [ApiIndikatorController::class, 'list_select'])->name('api_master_indikator_renstra.list_select');
Route::post('/master_indikator_renstra', [ApiIndikatorController::class, 'store'])->name('api_master_indikator_renstra.store');
Route::put('/master_indikator_renstra', [ApiIndikatorController::class, 'update'])->name('api_master_indikator_renstra.update');
Route::delete('/master_indikator_renstra/{id}', [ApiIndikatorController::class, 'destroy'])->name('api_master_indikator_renstra.destroy');
Route::get('/master_indikator_renstra/{id}', [ApiIndikatorController::class, 'detail'])->name('api_master_indikator_renstra.detail');

Route::get('/master_tahun', [ApiMasterTahunController::class, 'index'])->name('api_master_tahun.index');
Route::post('/master_tahun', [ApiMasterTahunController::class, 'store'])->name('api_master_tahun.store');
Route::put('/master_tahun', [ApiMasterTahunController::class, 'update'])->name('api_master_tahun.update');
Route::delete('/master_tahun/{id}', [ApiMasterTahunController::class, 'destroy'])->name('api_master_tahun.destroy');
Route::get('/master_tahun/{id}', [ApiMasterTahunController::class, 'detail'])->name('api_master_tahun.detail');