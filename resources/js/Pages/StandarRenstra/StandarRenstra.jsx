import { useEffect, useRef, useState } from "react";
import AdminPage from "@src/AdminPage";
import { apiProduction } from "@src/Persistance/API";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "@src/Components/Pagination ";

const StandarRenstra = ({selected="",level}) => {
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

    const [standarRenstra, setStandarRenstra] = useState(null);
    
    async function loadData(){
        setLoading(true);
        try {
            console.log(`execute loadData to call /api/master_standar_renstra`);
            const response = await apiProduction.get(`/api/master_standar_renstra?page=${page}`, {
                filter: "",
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
            // console.error(error.response?.data)
            const status = error.response?.status;
            const detail =
                error.response?.description ?? "ada masalah pada aplikasi";

            alert(detail);
            console.error(detail);
        } finally {
            setLoading(false);
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
    function addHandler() {
        setId(null);
        setStandarRenstra(null)
        setOpenModal("add")
    }
    function editHandler(data) {
        setId(data.id);
        setStandarRenstra(data.nama)
        setOpenModal("edit")
    }
    function deleteHandler(data) {
        setId(data.id);
        setStandarRenstra(data.nama)
        setOpenModal("delete")
    }
    async function deleteProcess() {
        setLoadingModal(true);
        openModalDelete()
        try {
            console.log(`execute loadData to call /api/master_standar_renstra`);
            const response = await apiProduction.delete(`/api/master_standar_renstra/${id}`);

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil disimpan!');
                setPage(1)
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
            console.log(`execute loadData to call /api/master_standar_renstra`);
            const response = await apiProduction.post("/api/master_standar_renstra", {nama: standarRenstra});

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil disimpan!');
                setPage(1)
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
            console.log(`execute loadData to call /api/master_standar_renstra`);
            const response = await apiProduction.put("/api/master_standar_renstra", {nama: standarRenstra, id: id});

            if (response.status === 200 || response.status === 204) {
                toast.success('Berhasil diupdate!');
                setPage(1)
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

        if (openModal === "delete") {
            modal.hide();
            modalDelete.show();
        } else if (openModal === "add" || openModal === "edit") {
            modalDelete.hide();
            modal.show();
        }
    }, [openModal]);


    return <AdminPage selected={selected} level={level}>
        <div className="pagetitle">
            <h1>Standar Renstra</h1>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Standar Renstra</li>
                </ol>
            </nav>
        </div>
        <section className="section dashboard">
            <div className="flex justify-end items-center mb-4">
                <button className="px-4 py-2 rounded transition bg-green-500 hover:bg-green-600 text-white" onClick={()=>addHandler()}>Tambah</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading
                    ? "Loading..."
                    : (dataSource?.data ?? []).map(source => <Items idx={source?.id} 
                                                                title={source?.nama} open={source?.open} 
                                                                actionHandler={()=>actionHandler(source?.id)}
                                                                editHandler={()=>editHandler(source)}
                                                                deleteHandler={()=>deleteHandler(source)}
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
                        <h5 className="modal-title">Konfirmasi</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        disabled={loadingModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <h5 className="modal-title">Anda yakin ingin hapus data "{standarRenstra}" ?</h5>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            disabled={loadingModal}
                        >
                            Tidak
                        </button>
                        <button type="button" className="btn btn-success" disabled={loadingModal} onClick={()=>deleteProcess()}>
                            Ya
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="modal modal-lg fade" data-bs-backdrop='static' tabIndex="-2" ref={modalRef}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{openModal=="add"? "Tambah":"Edit"}</h5>
                        <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        disabled={loadingModal}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div class="mb-4">
                            <div class="w-full relative">
                                <label class="block text-sm font-medium text-gray-900 mb-2">Standar Renstra</label>
                                <div class="relative">
                                    <input placeholder="Masukkan standar renstra" 
                                            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 bg-gray-100 bg-gray-100 " 
                                            type="text"
                                            onChange={(e)=>setStandarRenstra(e.target.value)} 
                                            value={standarRenstra}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-primary" disabled={loadingModal} onClick={()=> openModal=="add"? createProcess() : updateProcess()}>
                        Simpan
                    </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminPage>;
};
const Items = ({idx, title, open=false, actionHandler=()=>{}, deleteHandler=()=>{}, editHandler=()=>{}}) => {
    return <div key={idx} className="relative bg-white shadow-md rounded-lg p-4 border-l-4 border-green-500">
                    <p className="text-sm font-semibold break-words mb-3 me-4">{title}</p>
                    <div className="absolute top-3 right-3">
                        <button className="p-2 rounded-full hover:bg-gray-200" onClick={actionHandler}>
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"></path></svg>
                        </button>
                        {open && <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden z-50">
                            <ul className="!py-1 !px-1 mb-0">
                                <li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>deleteHandler()}>Hapus</li>
                                <li className="py-2 text-black hover:bg-gray-100 cursor-pointer" onClick={()=>editHandler()}>Edit</li>
                            </ul>
                        </div>}
                    </div>
                </div>
}

export default StandarRenstra;