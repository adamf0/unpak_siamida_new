import SidebarItemMenuDropdown from "@src/Components/SidebarItemMenuDropdown"
import SidebarItemMenu from "@src/Components/SidebarItemMenu"
import { useEffect, useState } from "react";
import { classNames } from '@src/Utility';
import {useVersion} from '@src/Context/VersionContext'

const AdminPage = ({children, selected="", level=null}) => {
  const { version, setVersion } = useVersion();

  function renderBukuPanduan(){
    if(level=="admin"){
      return <SidebarItemMenuDropdown
            title="Buku Panduan"
            parent="sidebar-nav-panduan"
            target="dropdown-buku-panduan"
            icon="bi bi-book-half"
            active={false}
        >
            <SidebarItemMenu
                title="Admin"
                icon=""
                link="/buku_panduan/MANUAL BOOK ADMIN.pdf"
                active={false}
            />
            <SidebarItemMenu
                title="Auditee"
                icon=""
                link="/buku_panduan/MANUAL BOOK AUDITEE.pdf"
                active={false}
            />
            <SidebarItemMenu
                title="Auditor 1"
                icon=""
                link="/buku_panduan/MANUAL BOOK AUDITOR 1.pdf"
                active={false}
            />
            <SidebarItemMenu
                title="Auditor 2"
                icon=""
                link="/buku_panduan/MANUAL BOOK AUDITOR 2.pdf"
                active={false}
            />
        </SidebarItemMenuDropdown>
    } else if(level=="auditor1"){
      return <li className="nav-item">
              <a className={`nav-link collapsed`} target="_blank" href="/buku_panduan/MANUAL BOOK AUDITOR 1.pdf">
                  <i className="bi bi-card-checklist"></i>
                  <span>Buku Panduan</span>
              </a>
          </li>
    } else if(level=="auditor2"){
      return <li className="nav-item">
              <a className={`nav-link collapsed`} target="_blank" href="/buku_panduan/MANUAL BOOK AUDITOR 2.pdf">
                  <i className="bi bi-card-checklist"></i>
                  <span>Buku Panduan</span>
              </a>
          </li>
    } else if(level=="auditee"){
      return <li className="nav-item">
              <a className={`nav-link collapsed`} target="_blank" href="/buku_panduan/MANUAL BOOK AUDITEE.pdf">
                  <i className="bi bi-card-checklist"></i>
                  <span>Buku Panduan</span>
              </a>
          </li>
    }
  }
  
  function renderSidebar(){
    console.log(`version: ${version}`)
    if(version==null && level=="admin"){
      return <>
          <li className="nav-heading">Data Master</li>
          
          {renderBukuPanduan()}

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="jenis_file_renstra"? `collapsed`:``)} href="/jenis_file_renstra">
                  <i className="bi bi-card-checklist"></i>
                  <span>Jenis File</span>
              </a>
          </li>
          
          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="penggunas"? `collapsed`:``)} href="/penggunas">
                  <i className="bi bi-person-fill"></i>
                  <span>Pengguna</span>
              </a>
          </li>

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="master_standar_renstra"? `collapsed`:``)} href="/master_standar_renstra">
                  <i className="bi bi-person-fill"></i>
                  <span>Standar Renstra</span>
              </a>
          </li>

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="master_indikator_renstra"? `collapsed`:``)} href="/master_indikator_renstra">
                  <i className="bi bi-card-checklist"></i>
                  <span>Indikator Renstra</span>
              </a>
          </li>

          <li className="nav-heading">Data Template</li>

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="template_dokumen_tambahan"? `collapsed`:``)} href="/template_dokumen_tambahan">
                  <i className="bi bi-file-text-fill"></i>
                  <span>Mapping Dokumen Tambahan</span>
              </a>
          </li>

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="template_renstra"? `collapsed`:``)} href="/template_renstra">
                  <i className="bi bi-file-text-fill"></i>
                  <span>Mapping Renstra</span>
              </a>
          </li>

          <li className="nav-heading">Data Pertanyaan</li>

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="renstra"? `collapsed`:``)} href="/renstra">
                  <i className="bi bi-file-earmark-x-fill"></i>
                  <span>Scheduling</span>
              </a>
          </li>

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="berita_acara_v2"? `collapsed`:``)} href="/berita_acara_v2">
                  <i className="bi bi-chat-quote"></i>
                  <span>Berita Acara</span>
              </a>
          </li>

          <li className="nav-heading">Laporan</li>
          
          <SidebarItemMenuDropdown
              title="Laporan"
              parent="sidebar-nav-laporan"
              target="dropdown-laporan"
              icon="bi bi-menu-button-wide"
              active={["laporan_renstra/utama","laporan_renstra/tambahan"].includes(selected)}
          >
              <SidebarItemMenu
                  title="Laporan Auditor 1"
                  icon="bi bi-chat-quote"
                  link="/laporan_renstra/utama"
                  active={selected=="laporan_renstra/utama"}
              />
              <SidebarItemMenu
                  title="Laporan Auditor 2"
                  icon="bi bi-chat-quote"
                  link="/laporan_renstra/tambahan"
                  active={selected=="laporan_renstra/tambahan"}
              />
          </SidebarItemMenuDropdown>
      </>
    } else if(version==null && ["auditee","auditor1","auditor2"].includes(level)){
      return <>
          {renderBukuPanduan()}

          <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="evaluasi_renstra"? `collapsed`:``)} href="/evaluasi_renstra">
                  <i className="bi bi-chat-quote"></i>
                  <span>Renstra</span>
              </a>
          </li>
      </>
    } else{
      return <>
          {renderBukuPanduan()}
          {
            level=="admin"? 
            <>
              <li className="nav-heading">Data Master</li>
            
              <li className="nav-item">
                  <a className={classNames(`nav-link`, !["master_matriks","master_matrikss"].includes(selected)? `collapsed`:``)} href="/master_matrikss">
                      <i className="bi bi-card-checklist"></i>
                      <span>Matrik</span>
                  </a>
              </li>

              <li className="nav-heading">Data Template</li>
              
              <li className="nav-item">
                  <a className={classNames(`nav-link`, !["template_standar_mutus","template_standar_mutu"].includes(selected)? `collapsed`:``)} href="/template_standar_mutus">
                      <i className="bi bi-file-text"></i>
                      <span>Dokumen Utama (Akreditasi)</span>
                  </a>
              </li>

              <li className="nav-item">
                  <a className={classNames(`nav-link`, !["template_non_akademiks","template_non_akademik"].includes(selected)? `collapsed`:``)} href="/template_non_akademiks">
                      <i className="bi bi-file-text-fill"></i>
                      <span>Dokumen Tambahan</span>
                  </a>
              </li>

              <li className="nav-heading">Data Pertanyaan</li>

              <li className="nav-item">
                  <a className={classNames(`nav-link`, !["nilai_mutus"].includes(selected)? `collapsed`:``)} href="/nilai_mutus">
                      <i className="bi bi-file-earmark-x"></i>
                      <span>Nilai Dokumen Utama (Akreditasi)</span>
                  </a>
              </li>

              <li className="nav-item">
                  <a className={classNames(`nav-link`, !["nilai_non_mutus"].includes(selected)? `collapsed`:``)} href="/nilai_non_mutus">
                      <i className="bi bi-file-earmark-x"></i>
                      <span>Nilai Dokumen Tambahan</span>
                  </a>
              </li>

              <li className="nav-heading">Laporan</li>

              <SidebarItemMenuDropdown
                title="Laporan"
                parent="sidebar-nav-laporan"
                target="dropdown-laporan"
                icon="bi bi-menu-button-wide"
                active={["laporan_akademiks","laporan_non_akademiks"].includes(selected)}
              >
                <SidebarItemMenu
                    title="Laporan Dokumen Utama (Akreditasi)"
                    icon="bi bi-chat-quote"
                    link="/laporan_akademiks"
                    active={selected=="laporan_akademiks"}
                />
                <SidebarItemMenu
                    title="Laporan Dokumen Tambahan"
                    icon="bi bi-chat-quote"
                    link="/laporan_non_akademiks"
                    active={selected=="laporan_non_akademiks"}
                />
              </SidebarItemMenuDropdown> 
            </>: <></>
          }
          
          {
            ["auditee","auditor1"].includes(level)? 
            <li className="nav-item">
              <a className={classNames(`nav-link`, !["evaluasi_diris"].includes(selected)? `collapsed`:``)} href="/evaluasi_diris">
                  <i className="bi bi-chat-quote"></i>
                  <span>Dokumen Utama (Akreditasi)</span>
              </a>
            </li>:<></>
          }

          {
            ["auditee","auditor2"].includes(level)? 
            <li className="nav-item">
              <a className={classNames(`nav-link`, !["evaluasi_non_akademiks"].includes(selected)? `collapsed`:``)} href="/evaluasi_non_akademiks">
                  <i className="bi bi-chat-right-quote"></i>
                  <span>Dokumen Tambahan</span>
              </a>
          </li>:<></>
          }
          
          <li className="nav-item">
              <a className={classNames(`nav-link`, !["berita_acaras"].includes(selected)? `collapsed`:``)} href="/berita_acaras">
                  <i className="bi bi-chat-quote"></i>
                  <span>Berita Acara</span>
              </a>
          </li>
      </>
    }
  }
  return (
    <>
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="/dashboard" className="logo d-flex align-items-center">
          <img src="https://siamida.unpak.ac.id/assets/img/logo.webp" alt="" loading="lazy"/>
          <span className="d-none d-lg-block">SIAMIDA</span>
        </a>
        <i className="bi bi-list toggle-sidebar-btn"></i>
      </div>

      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <span className="d-none d-md-block dropdown-toggle ps-2">{version==null? "Terbaru":version}</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header" style={{ padding: "0px 25px" }}>
                <h6>Versi</h6>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li>
                <button className="dropdown-item d-flex align-items-center" onClick={() => setVersion('2023')}>
                  <span>2023</span>
                </button>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li>
                <button className="dropdown-item d-flex align-items-center" onClick={() => setVersion(null)}>
                  <span>Terbaru</span>
                </button>
              </li>
            </ul>
          </li>
          <li className="nav-item dropdown pe-3">
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
              <img src="https://siamida.unpak.ac.id/assets/img/logo.webp" alt="Profile" className="rounded-circle" loading="lazy" style={{ width: '30px', aspectRatio: '1 / 1' }}/>
              <span className="d-none d-md-block dropdown-toggle ps-2">Nama</span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Nama</h6>
                <span>Level</span>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="/profile/edit">
                  <i className="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider"/>
              </li>
              <li>
                <a className="dropdown-item d-flex align-items-center" href="/logout">
                  <i className="bi bi-box-arrow-right"></i>
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>

    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
            <a className={classNames(`nav-link`, selected!="dashboard"? `collapsed`:``)} href="/dashboard">
                <i className="bi bi-grid"></i>
                <span>Dashboard</span>
            </a>
        </li>

        {
          level=="admin" && <li className="nav-item">
              <a className={classNames(`nav-link`, selected!="monitoring"? `collapsed`:``)} href="/monitoring">
                  <i className="bi bi-menu-button-wide"></i>
                  <span>Monitoring</span>
              </a>
          </li>
        }
        
        {renderSidebar()}

      </ul>
    </aside>

    <main id="main" className="main">
      {children}
    </main>
    </>
  );
};

export default AdminPage;