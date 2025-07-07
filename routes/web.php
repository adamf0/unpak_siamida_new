<?php

use App\Http\Controllers\AktivitasController;
use App\Http\Controllers\JenisFileRenstraController;
use App\Http\Controllers\MasterIndikatorRenstraController;
use App\Http\Controllers\MasterStandarRenstraController;
use App\Http\Controllers\MasterTahunController;
use App\Http\Controllers\MataProgramController;
use Illuminate\Support\Facades\Route;

// Route::get('/', [LoginController::class, 'index'])->name('login.index');
// Route::post('/login', [LoginController::class, 'login'])->name('login.login');
// Route::get('/logout', [LoginController::class, 'logout'])->name('login.logout');

// Route::middleware(LoginCheck::class)->group(function () {
    // Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    // Route::post('/dashboard/chartNilaiMutu', [DashboardController::class, 'chartNilaiMutu'])->name('chartNilaiMutu');
    // Route::post('/dashboard/detailItemChartDokumenUtama', [DashboardController::class, 'detailItemChartDokumenUtama'])->name('detailItemChartDokumenUtama');

    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::post('/profil', [ProfileController::class, 'update'])->name('profile.update');
    // Route::post('/profil/upload', [ProfileController::class, 'upload'])->name('profile.upload');

    //mulai dari sini
    // Route::middleware('role:Pengguna,admin')->group(function () {
    //     Route::get('/penggunas', [PenggunaController::class, 'index'])->name('penggunas');
    //     Route::get('/pengguna', [PenggunaController::class, 'create'])->name('pengguna.create');
    //     Route::post('/pengguna', [PenggunaController::class, 'store'])->name('pengguna.store');
    //     Route::get('/pengguna/edit/{id}', [PenggunaController::class, 'edit'])->name('pengguna.edit');
    //     Route::post('/pengguna/edit', [PenggunaController::class, 'update'])->name('pengguna.update');
    //     Route::get('/pengguna/delete/{id}', [PenggunaController::class, 'destroy'])->name('pengguna.destroy');
    // });
    ///stop

    // Route::middleware('role:Master Matrik,admin')->group(function () {
    //     Route::get('/master_matrikss', [MasterMatriksController::class, 'index'])->name('master_matrikss');
    //     Route::get('/master_matriks', [MasterMatriksController::class, 'create'])->name('master_matriks.create');
    //     Route::post('/master_matriks', [MasterMatriksController::class, 'store'])->name('master_matriks.store');
    //     Route::get('/master_matriks/edit/{id}', [MasterMatriksController::class, 'edit'])->name('master_matriks.edit');
    //     Route::post('/master_matriks/edit', [MasterMatriksController::class, 'update'])->name('master_matriks.update');
    //     Route::get('/master_matriks/delete/{id}', [MasterMatriksController::class, 'destroy'])->name('master_matriks.destroy');
    // });

    // Route::middleware('role:Lembaga Akreditasi,admin')->group(function () {
    //     Route::get('/lembaga_akreditasis', [LembagaAkreditasiController::class, 'index'])->name('lembaga_akreditasis');
    //     Route::get('/lembaga_akreditasi', [LembagaAkreditasiController::class, 'create'])->name('lembaga_akreditasi.create');
    //     Route::post('/lembaga_akreditasi', [LembagaAkreditasiController::class, 'store'])->name('lembaga_akreditasi.store');
    //     Route::get('/lembaga_akreditasi/edit/{id}', [LembagaAkreditasiController::class, 'edit'])->name('lembaga_akreditasi.edit');
    //     Route::post('/lembaga_akreditasi/edit', [LembagaAkreditasiController::class, 'update'])->name('lembaga_akreditasi.update');
    //     Route::get('/lembaga_akreditasi/delete/{id}', [LembagaAkreditasiController::class, 'destroy'])->name('lembaga_akreditasi.destroy');
    // });

    // Route::middleware('role:Nilai Dokumen Utama (Akreditasi),admin')->group(function () {
    //     Route::get('/nilai_mutus', [NilaiMutuController::class, 'index'])->name('nilai_mutus');
    //     Route::get('/nilai_mutu', [NilaiMutuController::class, 'create'])->name('nilai_mutu.create');
    //     Route::post('/nilai_mutu', [NilaiMutuController::class, 'store'])->name('nilai_mutu.store');
    //     Route::get('/nilai_mutu/edit/{id}', [NilaiMutuController::class, 'edit'])->name('nilai_mutu.edit');
    //     Route::post('/nilai_mutu/edit', [NilaiMutuController::class, 'update'])->name('nilai_mutu.update');
    //     Route::get('/nilai_mutu/delete/{id}', [NilaiMutuController::class, 'destroy'])->name('nilai_mutu.destroy');
    // });

    // Route::middleware('role:Nilai Dokumen Tambahan,admin')->group(function () {
    //     Route::get('/nilai_non_mutus', [NilaiNonMutuController::class, 'index'])->name('nilai_non_mutus');
    //     Route::get('/nilai_non_mutu', [NilaiNonMutuController::class, 'create'])->name('nilai_non_mutu.create');
    //     Route::post('/nilai_non_mutu', [NilaiNonMutuController::class, 'store'])->name('nilai_non_mutu.store');
    //     Route::get('/nilai_non_mutu/edit/{id}', [NilaiNonMutuController::class, 'edit'])->name('nilai_non_mutu.edit');
    //     Route::post('/nilai_non_mutu/edit', [NilaiNonMutuController::class, 'update'])->name('nilai_non_mutu.update');
    //     Route::get('/nilai_non_mutu/delete/{id}', [NilaiNonMutuController::class, 'destroy'])->name('nilai_non_mutu.destroy');
    // });

    // Route::middleware('role:Template Dokumen Utama (Akreditasi),admin')->group(function () {
    //     Route::get('/template_standar_mutus', [TemplateStandarMutuController::class, 'index'])->name('template_standar_mutus');
    //     Route::get('/template_standar_mutu', [TemplateStandarMutuController::class, 'create'])->name('template_standar_mutu.create');
    //     Route::post('/template_standar_mutu', [TemplateStandarMutuController::class, 'store'])->name('template_standar_mutu.store');
    //     Route::get('/template_standar_mutu/edit/{id}', [TemplateStandarMutuController::class, 'edit'])->name('template_standar_mutu.edit');
    //     Route::post('/template_standar_mutu/edit', [TemplateStandarMutuController::class, 'update'])->name('template_standar_mutu.update');
    //     Route::get('/template_standar_mutu/delete/{id}', [TemplateStandarMutuController::class, 'destroy'])->name('template_standar_mutu.destroy');
    // });

    // Route::middleware('role:Template Dokumen Tambahan,admin')->group(function () {
    //     Route::get('/template_non_akademiks', [TemplateNonAkademikController::class, 'index'])->name('template_non_akademiks');
    //     Route::get('/template_non_akademik', [TemplateNonAkademikController::class, 'create'])->name('template_non_akademik.create');
    //     Route::post('/template_non_akademik', [TemplateNonAkademikController::class, 'store'])->name('template_non_akademik.store');
    //     Route::get('/template_non_akademik/edit/{id}', [TemplateNonAkademikController::class, 'edit'])->name('template_non_akademik.edit');
    //     Route::post('/template_non_akademik/edit', [TemplateNonAkademikController::class, 'update'])->name('template_non_akademik.update');
    //     Route::get('/template_non_akademik/delete/{id}', [TemplateNonAkademikController::class, 'destroy'])->name('template_non_akademik.destroy');
    // });

    // Route::middleware('role:Generate Dokumen Utama (Akreditasi),admin')->group(function () {
    //     Route::get('/generates/{id_nilai_mutu}', [GenerateNilaiMutuController::class, 'index'])->name('generates');
    //     Route::get('/generate/{id_nilai_mutu}', [GenerateNilaiMutuController::class, 'create'])->name('generate.create');
    //     Route::post('/generate', [GenerateNilaiMutuController::class, 'store'])->name('generate.store');
    //     Route::get('/generate/edit/{id}', [GenerateNilaiMutuController::class, 'edit'])->name('generate.edit');
    //     Route::post('/generate/edit', [GenerateNilaiMutuController::class, 'update'])->name('generate.update');
    //     Route::get('/generate/delete/{id}', [GenerateNilaiMutuController::class, 'destroy'])->name('generate.destroy');
    // });

    // Route::middleware('role:Generate Dokumen Tambahan,admin')->group(function () {
    //     Route::get('/generate_nons/{id_nilai_non_mutu}', [GenerateNilaiNonAkademikController::class, 'index'])->name('generate_nons');
    //     Route::get('/generate_non/{id_nilai_non_mutu}', [GenerateNilaiNonAkademikController::class, 'create'])->name('generate_non.create');
    //     Route::post('/generate_non', [GenerateNilaiNonAkademikController::class, 'store'])->name('generate_non.store');
    //     Route::get('/generate_non/edit/{id}', [GenerateNilaiNonAkademikController::class, 'edit'])->name('generate_non.edit');
    //     Route::post('/generate_non/edit', [GenerateNilaiNonAkademikController::class, 'update'])->name('generate_non.update');
    //     Route::get('/generate_non/delete/{id}', [GenerateNilaiNonAkademikController::class, 'destroy'])->name('generate_non.destroy');
    // });

    // Route::middleware('role:Evaluasi Dokumen Utama (Akreditasi),auditee,auditor1,admin')->group(function () {
    //     Route::get('/evaluasi_diris', [EvaluasiDiriController::class, 'index'])->name('evaluasi_diris');
    //     Route::get('/evaluasi_diri/edit/{id}/{question}', [EvaluasiDiriController::class, 'edit'])->name('evaluasi_diri.edit');
    //     Route::post('/evaluasi_diri/edit/{id}/{question}', [EvaluasiDiriController::class, 'update'])->name('evaluasi_diri.update');
    //     Route::get('/evaluasi_diri/delete/{id}/{question}/{target}', [EvaluasiDiriController::class, 'destroy'])->name('evaluasi_diri.delete');
    //     Route::get('/evaluasi_diri/detail/{id}', [EvaluasiDiriController::class, 'detail'])->name('evaluasi_diri.detail');
    //     Route::get('/evaluasi_diri/graph/all/{id_standar_mutu}', [EvaluasiDiriController::class, 'graphall'])->name('evaluasi_diri.graphall');
    //     Route::get('/evaluasi_diri/graph/{standar}/{template}', [EvaluasiDiriController::class, 'graph'])->name('evaluasi_diri.graph');
    //     Route::post('/evaluasi_diri/verifikasi_berkas', [EvaluasiDiriController::class, 'verifikasi_berkas'])->name('evaluasi_diri.verifikasi_berkas');
    //     Route::post('/evaluasi_diri/add/extra', [EvaluasiDiriController::class, 'add_extra'])->name('evaluasi_diri.add_extra');
    //     Route::post('/evaluasi_diri/delete/extra', [EvaluasiDiriController::class, 'delete_extra'])->name('evaluasi_diri.delete_extra');
    // });

    // Route::middleware('role:KTS,auditee,auditor1,auditor2,admin')->group(function () {
    //     Route::post('/kts/close', [KtsController::class, 'close'])->name('kts.close');

    //     Route::get('/kts/{type}/{evaluasi_diri}', [KtsController::class, 'index'])->name('kts');
    //     Route::post('/kts/{type}', [KtsController::class, 'store'])->name('kts.store');
    //     Route::get('/kts/edit/{type}/{evaluasi_diri}/{id}', [KtsController::class, 'edit'])->name('kts.edit');
    //     Route::post('/kts/edit/{type}', [KtsController::class, 'update'])->name('kts.update');
    //     Route::post('/kts/{type}/terima', [KtsController::class, 'acc'])->name('kts.acc');
    //     Route::post('/kts/{type}/tolak', [KtsController::class, 'reject'])->name('kts.reject');
    //     Route::get('/kts/{type}/{evaluasi_diri}/{id}/fix/terima', [KtsController::class, 'final_acc'])->name('kts.final_acc');

    //     Route::get('/kts/stream/{type}/{evaluasi_diri}/{id}', [KtsController::class, 'stream'])->name('kts.stream');
    //     Route::get('/kts/export/{type}/{evaluasi_diri}/{id}', [KtsController::class, 'export'])->name('kts.export');
    // });

    // Route::middleware('role:Evaluasi Dokumen Tambahan,auditee,auditor2,admin')->group(function () {
    //     Route::get('/evaluasi_non_akademiks', [EvaluasiNonAkademikController::class, 'index'])->name('evaluasi_non_akademiks');
    //     Route::get('/evaluasi_non_akademik/edit/{id}/{question}', [EvaluasiNonAkademikController::class, 'edit'])->name('evaluasi_non_akademik.edit');
    //     Route::post('/evaluasi_non_akademik/update', [EvaluasiNonAkademikController::class, 'update'])->name('evaluasi_non_akademik.update');
    //     Route::get('/evaluasi_non_akademik/detail/{id}', [EvaluasiNonAkademikController::class, 'detail'])->name('evaluasi_non_akademik.detail');
    //     Route::post('/evaluasi_non_akademik/save/note', [EvaluasiNonAkademikController::class, 'note'])->name('evaluasi_non_akademik.note');

    //     Route::get('/evaluasi_non_akademik/delete/{id}/{question}/{target}', [EvaluasiNonAkademikController::class, 'destroy'])->name('evaluasi_non_akademik.delete');
    //     Route::post('/evaluasi_non_akademik/verifikasi_berkas', [EvaluasiNonAkademikController::class, 'verifikasi_berkas'])->name('evaluasi_non_akademik.verifikasi_berkas');
    // });

    // Route::middleware('role:Berita Acara,auditee,auditor1,auditor2,admin')->group(function () {
    //     Route::get('/berita_acaras', [BeritaAcaraController::class, 'index'])->name('berita_acaras');
    //     Route::get('/berita_acara', [BeritaAcaraController::class, 'create'])->name('berita_acara.create');
    //     Route::post('/berita_acara', [BeritaAcaraController::class, 'store'])->name('berita_acara.store');
    //     Route::get('/berita_acara/edit/{id}', [BeritaAcaraController::class, 'edit'])->name('berita_acara.edit');
    //     Route::post('/berita_acara/edit', [BeritaAcaraController::class, 'update'])->name('berita_acara.update');
    //     Route::get('/berita_acara/delete/{id}', [BeritaAcaraController::class, 'destroy'])->name('berita_acara.destroy');
    //     Route::get('/berita_acara/stream/{id}', [BeritaAcaraController::class, 'stream'])->name('berita_acara.stream');
    //     Route::get('/berita_acara/export/{id}', [BeritaAcaraController::class, 'export'])->name('berita_acara.export');
    // });

    //ini
    // Route::middleware('role:Berita Acara V2,auditee,auditor1,auditor2,admin')->group(function () {
    //     Route::get('/berita_acara_v2', [BeritaAcaraV2Controller::class, 'index'])->name('berita_acara_v2');
    //     Route::get('/berita_acara_v2/add', [BeritaAcaraV2Controller::class, 'create'])->name('berita_acara_v2.create');
    //     Route::post('/berita_acara_v2/store', [BeritaAcaraV2Controller::class, 'store'])->name('berita_acara_v2.store');
    //     Route::get('/berita_acara_v2/edit/{id}', [BeritaAcaraV2Controller::class, 'edit'])->name('berita_acara_v2.edit');
    //     Route::post('/berita_acara_v2/edit', [BeritaAcaraV2Controller::class, 'update'])->name('berita_acara_v2.update');
    //     Route::get('/berita_acara_v2/delete/{id}', [BeritaAcaraV2Controller::class, 'destroy'])->name('berita_acara_v2.destroy');
    //     Route::get('/berita_acara_v2/stream/{id}', [BeritaAcaraV2Controller::class, 'stream'])->name('berita_acara_v2.stream');
    //     Route::get('/berita_acara_v2/export/{id}', [BeritaAcaraV2Controller::class, 'export'])->name('berita_acara_v2.export');
    // });
    //stop

    // Route::middleware('role:Laporan Utama,admin')->group(function () {
    //     Route::get('/laporan_akademiks', [LaporanAkademikController::class, 'index'])->name('laporan_akademiks');
    //     Route::get('/laporan_akademik/short', [LaporanAkademikController::class, 'short'])->name('laporan_akademik.short');
    //     Route::get('/laporan_akademik/report', [LaporanAkademikController::class, 'report'])->name('laporan_akademik.report');
    //     Route::get('/laporan_akademik/report/export', [LaporanAkademikController::class, 'export'])->name('laporan_akademik.export');
    // });

    // Route::middleware('role:Laporan Tambahan,admin')->group(function () {
    //     Route::get('/laporan_non_akademiks', [LaporanNonAkademikController::class, 'index'])->name('laporan_non_akademiks');
    //     Route::get('/laporan_non_akademik/short', [LaporanNonAkademikController::class, 'short'])->name('laporan_non_akademik.short');
    // });

    //dari sini yg terbaru
    // Route::middleware('role:Monitoring,admin')->group(function () {
    //     Route::get('/monitoring', [MonitoringController::class, 'index'])->name('monitoring');
    //     Route::get('/monitoring/datatable', [MonitoringController::class, 'datatable'])->name('monitoring.datatable');
    // });

    // Route::middleware('role:Master Standar Renstra,admin')->group(function () {
        Route::get('/master_standar_renstra', [MasterStandarRenstraController::class, 'index'])->name('master_standar_renstra');
    // });

    // Route::middleware('role:Master Indikator Renstra,admin')->group(function () {
        Route::get('/master_indikator_renstra', [MasterIndikatorRenstraController::class, 'index'])->name('master_indikator_renstra');
    //     Route::get('/master_indikator_renstra/add', [MasterIndikatorRenstraController::class, 'create'])->name('master_indikator_renstra.create');
    //     Route::post('/master_indikator_renstra/store', [MasterIndikatorRenstraController::class, 'store'])->name('master_indikator_renstra.store');
    //     Route::get('/master_indikator_renstra/edit/{id}', [MasterIndikatorRenstraController::class, 'edit'])->name('master_indikator_renstra.edit');
    //     Route::post('/master_indikator_renstra/edit', [MasterIndikatorRenstraController::class, 'update'])->name('master_indikator_renstra.update');
    //     Route::get('/master_indikator_renstra/transfer', [MasterIndikatorRenstraController::class, 'transfer'])->name('master_indikator_renstra.transfer');
    //     Route::post('/master_indikator_renstra/store_transfer', [MasterIndikatorRenstraController::class, 'store_transfer'])->name('master_indikator_renstra.store_transfer');
    //     Route::get('/master_indikator_renstra/delete/{id}', [MasterIndikatorRenstraController::class, 'destroy'])->name('master_indikator_renstra.delete');
    // });

    // Route::middleware('role:Template Renstra,admin')->group(function () {
    //     Route::get('/template_renstra', [TemplateRenstraController::class, 'index'])->name('template_renstra');
    //     Route::get('/template_renstra/add', [TemplateRenstraController::class, 'create'])->name('template_renstra.create');
    //     Route::post('/template_renstra/store', [TemplateRenstraController::class, 'store'])->name('template_renstra.store');
    //     Route::post('/template_renstra/edit', [TemplateRenstraController::class, 'update'])->name('template_renstra.update');
    //     Route::get('/template_renstra/edit/{tahun}/{indikator}', [TemplateRenstraController::class, 'edit'])->name('template_renstra.edit');
    //     Route::get('/template_renstra/delete/{tahun}/{indikator}', [TemplateRenstraController::class, 'destroy'])->name('template_renstra.delete');
    //     Route::get('/template_renstra/delete/{tahun}/{indikator}/{type}/{target}', [TemplateRenstraController::class, 'destroySpesific'])->name('template_renstra.destroySpesific');
    // });

    // Route::middleware('role:Template Renstra,admin')->group(function () {
    //     Route::get('/renstra', [RenstraController::class, 'index'])->name('renstra');
    //     Route::get('/renstra/add', [RenstraController::class, 'create'])->name('renstra.create');
    //     Route::post('/renstra/store', [RenstraController::class, 'store'])->name('renstra.store');
    //     Route::post('/renstra/update', [RenstraController::class, 'update'])->name('renstra.update');
    //     Route::get('/renstra/delete/{id}', [RenstraController::class, 'destroy'])->name('renstra.delete');
    //     Route::get('/renstra/edit/{id}', [RenstraController::class, 'edit'])->name('renstra.edit');
    // });

    // Route::middleware('role:Jenis File Renstra,admin')->group(function () {
        Route::get('/jenis_file_renstra', [JenisFileRenstraController::class, 'index'])->name('jenis_file_renstra');
    // });

    // Route::middleware('role:Mapping Dokumen Tambahan,admin')->group(function () {
    //     Route::get('/template_dokumen_tambahan', [TemplateDokumenTambahanController::class, 'index'])->name('template_dokumen_tambahan');
    //     Route::get('/template_dokumen_tambahan/add', [TemplateDokumenTambahanController::class, 'create'])->name('template_dokumen_tambahan.create');
    //     Route::post('/template_dokumen_tambahan/store', [TemplateDokumenTambahanController::class, 'store'])->name('template_dokumen_tambahan.store');
    //     Route::post('/template_dokumen_tambahan/edit', [TemplateDokumenTambahanController::class, 'update'])->name('template_dokumen_tambahan.update');
    //     Route::get('/template_dokumen_tambahan/edit/{tahun}/{jenis_file}', [TemplateDokumenTambahanController::class, 'edit'])->name('template_dokumen_tambahan.edit');
    //     Route::get('/template_dokumen_tambahan/delete/{tahun}/{jenis_file}', [TemplateDokumenTambahanController::class, 'destroy'])->name('template_dokumen_tambahan.delete');
    //     Route::get('/template_dokumen_tambahan/delete/{tahun}/{jenis_file}/{type}/{target}', [TemplateDokumenTambahanController::class, 'destroySpesific'])->name('template_dokumen_tambahan.destroySpesific');
    // });

    // Route::middleware('role:Evaluasi Renstra,auditee,auditor1,auditor2,admin')->group(function () {
    //     Route::get('/evaluasi_renstra', [EvaluasiRenstraController::class, 'index'])->name('evaluasi_renstra');
    //     Route::get('/evaluasi_renstra/edit/{id_renstra}/{type}/{id_nilai}/{part}', [EvaluasiRenstraController::class, 'edit'])->name('evaluasi_renstra.edit');
    //     Route::post('/evaluasi_renstra/update', [EvaluasiRenstraController::class, 'update'])->name('evaluasi_renstra.update');

    //     Route::post('/evaluasi_renstra/upload_berkas', [EvaluasiRenstraController::class, 'upload_berkas'])->name('evaluasi_renstra.upload_berkas');
    //     Route::post('/evaluasi_renstra/dokumen_tambahan', [EvaluasiRenstraController::class, 'dokumen_tambahan'])->name('evaluasi_renstra.dokumen_tambahan');
    //     Route::get('/evaluasi_renstra/hapus_berkas/{id_renstra}/{type}/{id_nilai}/{part}', [EvaluasiRenstraController::class, 'hapus_berkas'])->name('evaluasi_renstra.hapus_berkas');

    //     Route::get('/evaluasi_renstra/kts/{id_renstra}/{type}/{tahun}', [EvaluasiRenstraController::class, 'kts'])->name('evaluasi_renstra.kts');
    //     Route::get('/evaluasi_renstra/edit_kts/{id}', [EvaluasiRenstraController::class, 'edit_kts'])->name('evaluasi_renstra.edit_kts');
    //     Route::post('/evaluasi_renstra/update_kts', [EvaluasiRenstraController::class, 'update_kts'])->name('evaluasi_renstra.update_kts');
    //     // Route::post('/evaluasi_renstra/proses_kts', [EvaluasiRenstraController::class, 'proses_kts'])->name('evaluasi_renstra.proses_kts');
    //     Route::post('/evaluasi_renstra/note', [EvaluasiRenstraController::class, 'note'])->name('evaluasi_renstra.note');

    //     Route::get('/evaluasi_renstra/{type}/{id}', [EvaluasiRenstraController::class, 'dokumen_kts'])->name('evaluasi_renstra.dokumen_kts');
    // });

    // Route::middleware('role:Laporan Renstra,admin')->group(function () {
    //     Route::get('/laporan_renstra/{type}', [LaporanRenstraController::class, 'index'])->name('laporan_renstra');
    // });

    // Route::middleware('role:Master Tahun,admin')->group(function () {
        Route::get('/master_tahun', [MasterTahunController::class, 'index'])->name('master_tahun');
    // });

    // Route::middleware('role:Laporan Renstra,admin')->group(function () {
        Route::get('/mata_program', [MataProgramController::class, 'index'])->name('mata_program');
    // });

    // Route::middleware('role:Aktivitas,admin')->group(function () {
        Route::get('/aktivitas', [AktivitasController::class, 'index'])->name('aktivitas');
    // });
// });

// Route::get('/share/penggunas', [PenggunaController::class, 'index'])->name('share.penggunas');

// Route::get('/periodes', [PeriodeController::class, 'index'])->name('periodes');
// Route::get('/fakultas_units', [FakultasUnitController::class, 'index'])->name('fakultas_units');
// Route::get('/jenis_files', [JenisFileController::class, 'index'])->name('jenis_files');
// Route::get('/prodis', [ProdiController::class, 'index'])->name('prodis');
// Route::get('/tes', [TesController::class, 'index']);