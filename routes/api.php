<?php

use App\Http\Controllers\ApiAktivitasController;
use App\Http\Controllers\ApiIndikatorController;
use App\Http\Controllers\ApiJenisFileRenstraController;
use App\Http\Controllers\ApiMasterTahunController;
use App\Http\Controllers\ApiMataProgramController;
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
Route::get('/master_tahun/list', [ApiMasterTahunController::class, 'list_select'])->name('api_master_tahun.list_select');
Route::post('/master_tahun', [ApiMasterTahunController::class, 'store'])->name('api_master_tahun.store');
Route::put('/master_tahun', [ApiMasterTahunController::class, 'update'])->name('api_master_tahun.update');
Route::delete('/master_tahun/{id}', [ApiMasterTahunController::class, 'destroy'])->name('api_master_tahun.destroy');
Route::get('/master_tahun/{id}', [ApiMasterTahunController::class, 'detail'])->name('api_master_tahun.detail');

Route::get('/mata_program', [ApiMataProgramController::class, 'index'])->name('api_mata_program.index');
Route::get('/mata_program/list', [ApiMataProgramController::class, 'list_select'])->name('api_mata_program.list_select');
Route::post('/mata_program', [ApiMataProgramController::class, 'store'])->name('api_mata_program.store');
Route::put('/mata_program', [ApiMataProgramController::class, 'update'])->name('api_mata_program.update');
Route::delete('/mata_program/{id}', [ApiMataProgramController::class, 'destroy'])->name('api_mata_program.destroy');
Route::get('/mata_program/{id}', [ApiMataProgramController::class, 'detail'])->name('api_mata_program.detail');

Route::get('/aktivitas', [ApiAktivitasController::class, 'index'])->name('api_aktivitas.index');
Route::post('/aktivitas', [ApiAktivitasController::class, 'store'])->name('api_aktivitas.store');
Route::put('/aktivitas', [ApiAktivitasController::class, 'update'])->name('api_aktivitas.update');
Route::delete('/aktivitas/{id}', [ApiAktivitasController::class, 'destroy'])->name('api_aktivitas.destroy');
Route::get('/aktivitas/{id}', [ApiAktivitasController::class, 'detail'])->name('api_aktivitas.detail');