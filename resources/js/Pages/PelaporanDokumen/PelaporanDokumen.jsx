import { useEffect, useRef, useState } from "react";
import AdminPage from "@src/AdminPage";
import { apiProduction, baseUrl } from "@src/Persistance/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "@src/Components/Pagination ";
import Select from "@src/Components/Select";
import { BsThreeDotsVertical } from "react-icons/bs";
import RadioGroup from "@src/Components/RadioGroup";

//[PR] level & fakultas_unit belum di set value dari login
const PelaporanDokumen = ({selected="",level,fakultas_unit=null}) => {
    const [id, setId] = useState(null);
    const [openModal, setOpenModal] = useState(null);
    const modalRef = useRef();
    const modalDeleteRef = useRef();
    const modalInstanceRef = useRef(null);
    const modalDeleteInstanceRef = useRef(null);

    const [loadingModal, setLoadingModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [dataSource, setDataSource] = useState([]);

    const [jenisDokumen, setJenisDokumen] = useState(null);
    const [mataProgram, setMataProgram] = useState(null);
    const fileRef = useRef(null);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [statusVerifikasi, setStatusVerifikasi] = useState(null);
    const [catatan, setCatatan] = useState(null);
    
    const [listMataProgram, setListMataProgram] = useState([]);
    const [loadingMataProgram, setLoadingMataProgram] = useState(false);
    
    async function loadData(){
        setLoading(true);
        try {
            console.log(`execute loadData to call /api/pelaporan_dokumen`);
            const response = await apiProduction.get(`/api/pelaporan_dokumen`, {
                params: {
                    page:page,
                    filter: "",
                    level: level,
                    fakultas_unit: fakultas_unit
                }
            });

            if (response.status === 200 || response.status === 204) {
                const rawData = response?.data ?? {};
                const newData = (rawData.data ?? []).map(item => ({
                    ...item,
                    open: false,
                }));

                setDataSource({
                    ...rawData,
                    data: newData,
                });
            }
        } catch (error) {
            const status = error.response?.status;
            const rawResponse = error.response?.data;
            console.error(rawResponse);

            if(![200,204].includes(status) && rawResponse?.title!=="PelaporanPelaksanaan.EmptyData"){
                alert(rawResponse?.description ?? "ada masalah pada aplikasi");
            }
        } finally {
            setLoading(false);
        }
    }
    async function loadMataProgram(){
        setLoadingMataProgram(true);
        try {
            console.log(`execute loadData to call /api/mata_program`);
            const response = await apiProduction.get(`/api/mata_program/list`, {
                filter: ""
            });

            if (response.status === 200 || response.status === 204) {
                const rawData = response?.data ?? {};
                setListMataProgram(rawData);
            }
        } catch (error) {
            const status = error.response?.status;
            const rawResponse = error.response?.data;
            console.error(rawResponse);

            if(![200,204].includes(status) && rawResponse?.title!=="MataProgram.EmptyData"){
                alert(rawResponse?.description!=null? "data tahun kosong":"ada masalah saat mengambil data tahun");
            }
        } finally {
            setLoadingMataProgram(false);
        }
    }
    function actionHandler(id) {
        const newData = dataSource.data.map(item => ({
            ...item,
            open: item.id === id ? !item.open : false, 
        }));

        setDataSource({
            ...dataSource,
            data: newData,
        });
    }

    function loadSelect(target=null){
        if(target==="mataProgram"){
            setListMataProgram([]);
            loadMataProgram();
        }
    }
    function addHandler() {
        setId(null);
        setFile(null)
        setMataProgram(null)
        setJenisDokumen(null)
        setStatusVerifikasi(null)
        setCatatan(null)
        setOpenModal("add")
        loadSelect("mataProgram");
    }
    function editHandler(data) {
        setId(data.id);
        setFile(data.file)
        setMataProgram(data.id_mata_program)
        setJenisDokumen(data.jenis_dokumen)
        setStatusVerifikasi(null)
        setCatatan(null)
        setOpenModal("edit")
        loadSelect("mataProgram");
    }
    function verifikasiHandler(data) {
        setId(data.id);
        setFile(data.file)
        setMataProgram(data.id_mata_program)
        setJenisDokumen(data.jenis_dokumen)
        setStatusVerifikasi(data.status)
        setCatatan(data.catatan)
        setOpenModal("verifikasi")
        loadSelect("mataProgram");
    }
    function detailHandler(event,data) {
        event.preventDefault();
        setId(null);
        setFile(null)
        setMataProgram(data.id_mata_program)
        setJenisDokumen(data.jenis_dokumen)
        setStatusVerifikasi(null)
        setCatatan(data.catatan)
        setOpenModal("detail")
    }
    function deleteHandler(data) {
        setId(data.id);
        setOpenModal("delete")
    }
    async function deleteProcess() {
        setLoadingModal(true);
        openModalDelete()
        try {
            console.log(`execute loadData to call /api/mata_program`);
            const response = await apiProduction.delete(`/api/mata_program/${id}`);

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil disimpan!');
                setPage(1)
                loadData()
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            toast.error(detail);
            console.error(detail);
        } finally {
            setLoadingModal(false);
            closeModalDelete();
        }
    }
    async function createProcess() {
        setLoadingModal(true);
        openModalForm();
        try {
            let formData = new FormData();
            formData.append("id_mata_program", mataProgram==null? "":mataProgram)
            formData.append("jenis_dokumen", jenisDokumen==null? "":jenisDokumen)
            formData.append("file", file)
            formData.append("id_fakultas_unit", fakultas_unit==null? "":fakultas_unit)

            console.log(`execute loadData to call /api/pelaporan_dokumen`);
            const response = await apiProduction.post("/api/pelaporan_dokumen", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil disimpan!');
                setPage(1)
                loadData()
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            toast.error(detail);
            console.error(detail);
        } finally {
            setLoadingModal(false);
            closeModalForm();
        }
    }
    async function updateProcess() {
        setLoadingModal(true);
        openModalForm();
        try {
            let formData = new FormData();
            formData.append("id_mata_program", mataProgram==null? "":mataProgram)
            formData.append("jenis_dokumen", jenisDokumen==null? "":jenisDokumen)
            if(filePreview!=null){
                formData.append("file", file)
            }
            formData.append("id_fakultas_unit", fakultas_unit==null? "":fakultas_unit)
            formData.append("id", id)
            formData.append('_method', 'PUT');

            console.log(`execute loadData to call /api/pelaporan_dokumen`);
            const response = await apiProduction.post("/api/pelaporan_dokumen", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil diupdate!');
                setPage(1)
                loadData()
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            toast.error(detail);
            console.error(detail);
        } finally {
            setLoadingModal(false);
            closeModalForm();
        }
    }
    async function verifikasiProcess() {
        setLoadingModal(true);
        openModalForm();
        try {
            console.log(`execute loadData to call /api/pelaporan_dokumen/verifikasi`);
            const response = await apiProduction.put("/api/pelaporan_dokumen/verifikasi", {
                status:statusVerifikasi,
                catatan:catatan,
                id:id
            });

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil diupdate!');
                setPage(1)
                loadData()
            }
        } catch (error) {
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            toast.error(detail);
            console.error(detail);
        } finally {
            setLoadingModal(false);
            closeModalForm();
        }
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setFilePreview(file?.name ?? "");
            // setErrListBerkasTambahan(prev => {
            //     const { file, ...rest } = prev;
            //     return rest;
            // });
        }
    };

    const handlerResetFile = () => {
        setFile(null);
        setFilePreview(null);
        if (fileRef.current) {
            fileRef.current.value = "";
        }
    }
    
    const openModalForm = () => {
        modalInstanceRef.current?.show();
    };

    const closeModalForm = () => {
        modalInstanceRef.current?.hide();
    };

    const openModalDelete = () => {
        modalDeleteInstanceRef.current?.show();
    };

    const closeModalDelete = () => {
        modalDeleteInstanceRef.current?.hide();
    };


    useEffect(() => {
        if (modalRef.current && !modalInstanceRef.current) {
            modalInstanceRef.current = new window.bootstrap.Modal(modalRef.current, {
                backdrop: 'static',
            });
        }
        if (modalDeleteRef.current && !modalDeleteInstanceRef.current) {
            modalDeleteInstanceRef.current = new window.bootstrap.Modal(modalDeleteRef.current, {
                backdrop: 'static',
            });
        }
    }, []);

    useEffect(()=>{
        loadData()
    },[page]);
    
    useEffect(() => {
        const modal = modalInstanceRef.current;
        const modalDelete = modalDeleteInstanceRef.current;

        if (!modal || !modalDelete) return;

        if (openModal === "delete" || openModal === "detail") {
            modal.hide();
            modalDelete.show();
        } else if (openModal === "add" || openModal === "edit" || openModal === "verifikasi") {
            modalDelete.hide();
            modal.show();
        } else{
            modalDelete.hide();
            modal.hide();
        }
    }, [openModal]);

    return <AdminPage selected={selected} level={level}>
        <div className="pagetitle">
            <h1>Pelaporan Dokumen</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Pelaporan Dokumen</li>
                </ol>
            </nav>
        </div>
        <section className="section dashboard">
            {
                ["auditee"].includes(level) && 
                <div className="flex justify-end items-center mb-4">
                    <button className="px-4 py-2 rounded transition bg-green-500 hover:bg-green-600 text-white" onClick={()=>addHandler()}>Tambah</button>
                </div>
            }

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading
                    ? "Loading..."
                    : (dataSource?.data ?? []).map(source => <Items idx={source?.id} 
                                                                mataProgram={source?.m_mata_program?.mata_program} 
                                                                jenisDokumen={source?.jenis_dokumen}
                                                                file={source?.file}
                                                                status_verifikasi={source?.status_verifikasi}
                                                                catatan={source?.catatan}
                                                                open={source?.open} 
                                                                actionHandler={()=>actionHandler(source?.id)}
                                                                editHandler={()=>editHandler(source)}
                                                                deleteHandler={()=>deleteHandler(source)}
                                                                verifikasiHandler={()=>verifikasiHandler(source)}
                                                                detailHandler={(event)=>detailHandler(event,source)}
                                                                level={level}
                                                                />)
                }
            </div>
            {!loading && <Pagination
                    currentPage={dataSource?.meta?.current_page ?? 1}
                    totalPages={dataSource?.meta?.last_page ?? 1}
                    onPageChange={(newPage) => setPage(newPage)}
                />}
        </section>
        
        <ToastContainer position="top-right" autoClose={3000} />
        
        <div className="modal modal-lg fade" data-bs-backdrop='static' tabIndex="-1" ref={modalDeleteRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {openModal==="detail"? 
                                <>
                                    <b>{mataProgram}</b>
                                    <br/>
                                    {jenisDokumen}
                                </>:
                                "Konfirmasi"
                            }
                        </h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        disabled={loadingModal}
                        onClick={()=>setOpenModal(null)}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {openModal==="detail" && <b>Catatan:</b>}
                        <h5 className={`modal-title w-full ${openModal!=="detail" && "text-center"}`}>{openModal==="detail"? catatan:"Anda yakin ingin hapus data ini?"}</h5>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            disabled={loadingModal}
                        >
                            {openModal==="detail"? "Tutup":"Tidak"}
                        </button>
                        {openModal!=="detail" && 
                            <button type="button" className="btn btn-success" disabled={loadingModal} onClick={()=>deleteProcess()}>
                                Ya
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className="modal modal-lg fade" data-bs-backdrop='static' tabIndex="-2" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{openModal=="add"? "Tambah":openModal=="edit"? "Edit":"Verifikasi"}</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={()=>setOpenModal(null)}
                        disabled={loadingModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-4">
                            <Select label={"Mata Program"} 
                                        handlerChange={setMataProgram} 
                                        items={listMataProgram} 
                                        selected={mataProgram} 
                                        disabled={openModal=="verifikasi"}
                                        loading={loadingMataProgram}/>

                            <RadioGroup
                                label="Jenis Dokumen"
                                items={[
                                    {
                                    id: "sk",
                                    text: "SK",
                                    },
                                    {
                                    id: "sop",
                                    text: "SOP",
                                    },
                                    {
                                    id: "proposal_tor",
                                    text: "Proposal/TOR",
                                    },
                                    {
                                    id: "laporan",
                                    text: "Laporan",
                                    },
                                    {
                                    id: "dokumen_pendukung",
                                    text: "Dokumen Pendukung",
                                    },
                                ]}
                                selected={jenisDokumen}
                                disabled={openModal=="verifikasi"}
                                handlerChange={setJenisDokumen}
                                />

                            <div className="w-full relative">
                                {
                                    openModal=="verifikasi"?
                                    <>
                                        <RadioGroup
                                            label="Status Verifikasi"
                                            items={[
                                                {
                                                id: "belum_terverifikasi",
                                                text: "Belum Terverifikasi",
                                                },
                                                {
                                                id: "terverifikasi",
                                                text: "Terverifikasi",
                                                },
                                                {
                                                id: "gagal_terverifikasi",
                                                text: "Gagal Terverifikasi",
                                                }
                                            ]}
                                            selected={statusVerifikasi}
                                            handlerChange={setStatusVerifikasi}
                                        />

                                        {statusVerifikasi=="gagal_terverifikasi" && 
                                            <div className="w-full relative">
                                                <label className="block text-sm font-medium text-gray-900 mb-2">
                                                    Catatan Gagal Verifikasi
                                                </label>
                                                <div className="flex flex-col space-y-2">
                                                    <textarea
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-800 resize-none"
                                                        rows={4}
                                                        value={catatan}
                                                        onChange={(e)=> setCatatan(e.target.value)}
                                                        placeholder="Tulis sesuatu di sini..."/>
                                                </div>
                                            </div>
                                        }

                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            File
                                        </label>
                                        <iframe src={`/pelaporan_pelaksanaan/?`.replace("?",file)} type="application/pdf" className="w-full min-h-180"></iframe>
                                    </>:
                                    <>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            File
                                        </label>
                                        <div className="flex flex-col space-y-2">
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                onChange={handleFileChange}
                                                accept="application/pdf"
                                                className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white`}
                                            />
                                            <label className="block text-sm font-medium text-red-500 mb-2">Catatan:</label>
                                            <ol className="list-decimal pl-10">
                                                <li>ektensi file yang diterima <b>.PDF</b></li>  
                                                <li>ukuran file yang di upload maksimal <b>5MB</b></li> 
                                            </ol>
                                            {file && (
                                                <div className="bg-purple-50 border border-purple-400 rounded text-purple-800 text-sm p-2 flex justify-between">
                                                    <div>
                                                        <div className="flex items-center">
                                                            <a target="_blank" href={filePreview==null? `/pelaporan_pelaksanaan/?`.replace("?",file):"#"}>
                                                                {filePreview==null? file:filePreview}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <button onClick={handlerResetFile}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                        <path
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M6 18L18 6M6 6l12 12"
                                                        />
                                                        </svg>
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" disabled={loadingModal} onClick={()=> openModal=="add"? createProcess() : openModal=="verifikasi"? verifikasiProcess() : updateProcess()}>
                        Simpan
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminPage>;
};
const renderJenisDokumen = (jenisDokumen) => {
    let output = null;
    if(jenisDokumen=="sk"){
        output = "SK";
    } else if(jenisDokumen=="sop"){
        output = "SOP";
    } else if(jenisDokumen=="proposal_tor"){
        output = "Proposal/TOR";
    } else if(jenisDokumen=="laporan"){
        output = "Laporan";
    } else if(jenisDokumen=="dokumen_pendukung"){
        output = "Dokumen Pendukung";
    }
    return <span className="inline-block px-2 py-0.5 text-xs font-medium bg-green-700 text-white rounded-full">
        {output}
    </span>
}
function renderColorCard(status=null){
    if(status=="terverifikasi") return "border-green-500";
    if(status=="gagal_terverifikasi") return "border-red-700";
    return "border-gray-500 ";
}
function renderBadge(status=null){
    if(status=="terverifikasi") return <span class="w-fit px-2 py-1 mt-3 text-xs font-semibold rounded-full bg-green-700 text-white ml-auto">Terverifikasi</span>;
    if(status=="gagal_terverifikasi") return <span class="w-fit px-2 py-1 mt-3 text-xs font-semibold rounded-full bg-red-700 text-white ml-auto">Gagal Terverifikasi</span>;
    return <span class="w-fit px-2 py-1 mt-3 text-xs font-semibold rounded-full bg-gray-500 text-white ml-auto">Belum Terverifikasi</span>;
}
const Items = ({idx, mataProgram, jenisDokumen, file=null, status_verifikasi, catatan, open=false, actionHandler=()=>{}, deleteHandler=()=>{}, editHandler=()=>{}, verifikasiHandler=()=>{}, detailHandler=()=>{}, level}) => {
    return <div key={idx} className={`relative bg-white shadow-md rounded-lg pl-4 pr-4 pt-4 pb-3 border-l-4 ${renderColorCard(status_verifikasi)}`}>
                <div className="flex flex-col">
                    <p className="text-sm font-semibold break-words mb-3 me-4">{mataProgram}</p>
                    <table className="text-sm w-full table-fixed">
                        <tr>
                            <td className="w-28 align-top" width={100}>Jenis Dokumen</td>
                            <td class="break-words">: {renderJenisDokumen(jenisDokumen)}</td>
                        </tr>
                        <tr>
                            <td className="w-28 align-top" width={100}>File</td>
                            <td class="break-words">: <a href={file==null? "#":`${baseUrl}/pelaporan_dokumen/${file}`} target="_blank">Klik disini</a></td>
                        </tr>
                        <tr>
                            <td className="w-28 align-top" width={100}>Catatan</td>
                            <td class="break-words">: <a href="#" onClick={detailHandler}>Klik disini</a></td>
                        </tr>
                    </table>
                    {renderBadge(status_verifikasi)}
                </div>        
                {
                    ["auditee","admin"].includes(level) && 
                    <div className="absolute top-3 right-3">
                        <button className="p-2 rounded-full hover:bg-gray-200" onClick={actionHandler}>
                            <BsThreeDotsVertical  />
                        </button>
                        {open && <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden z-50">
                            <ul className="!py-1 !px-1 mb-0">
                                {level=="auditee" &&<li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>deleteHandler()}>Hapus</li>}
                                {level=="auditee" &&<li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>editHandler()}>Edit</li>}
                                {level=="admin" && <li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>verifikasiHandler()}>Verifikasi</li>}
                            </ul>
                        </div>}
                    </div>
                }
            </div>
}

export default PelaporanDokumen;