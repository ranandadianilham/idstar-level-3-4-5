import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { packageData } from "../../assets/employee";
import { Button, Modal } from "react-bootstrap";
import CreateForm, { DetailView } from "./create.form";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  fetchEmployeeAll,
  createEmployee,
  fetchEmployeeById,
  deleteEmployee,
  editEmployee,
} from "./home.action";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => ({
  // Map state slices to props
  data: state.counter.employees,
  loading: state.counter.loading,
  error: state.counter.error,
  employee: state.counter.employee,
  fetchLoading: state.counter.viewLoading,
  deleteLoading: state.counter.deleteLoading,
});

const mapDispatchToProps = {
  // Map actions to component props
  fetchData: fetchEmployeeAll,
  createEmployee: createEmployee,
  fetchEmployeeById: fetchEmployeeById,
  deleteEmployee: deleteEmployee,
  editEmployee: editEmployee,
};

const Home = (props) => {
  const {
    loading,
    data,
    createEmployee,
    employee,
    fetchLoading,
    editEmployee,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteId, setShowDeleteId] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => {
    setShowDelete(false);
    setShowDeleteId(null);
  };
  const navigate = useNavigate();
  useEffect(() => {
    props.fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    console.log("token", token);
    if (token === null) {
      navigate("/auth/signin");
    }
  });

  const [newForm, setNewForm] = useState({
    name: "",
    dob: null,
    status: "",
    address: "",
    karyawanDetail: {
      nik: "",
      npwp: "",
    },
  });

  const resetForm = () => {
    setNewForm({
      name: "",
      dob: null,
      status: "",
      address: "",
      karyawanDetail: {
        nik: "",
        npwp: "",
      },
    });
    setIsEditing(false);
  };
  const [formOpen, setFormOpen] = useState(false);
  const [detailView, setDetailView] = useState(false);
  const handleCreate = () => {
    setFormOpen(true);
  };
  const updateNewForm = (field, newValue) => {
    setNewForm((prevState) => ({
      ...prevState,
      [field]: newValue,
    }));
  };

  const createEmplyee = async () => {
    if (isEditing) {
      await editEmployee({ ...newForm, id: editingId });
    } else {
      await createEmployee(newForm);
    }
    closeForm();
    window.location.reload();
  };

  useEffect(() => {
    if (!formOpen) resetForm();
  }, [formOpen]);

  useEffect(() => {
    //if (!isEditing && fetchLoading) return;
    // console.log("e", employee);
  }, [fetchLoading]);

  const handleEditView = (id) => {
    // fetch data
    // open view
    // edit sttuff
    setIsEditing(true);
    setEditingId(id);
    props.fetchEmployeeById(id);
  };

  useEffect(() => {
    if (isEditing && JSON.stringify(employee) !== "{}") {
      setNewForm((prev) => ({
        ...prev,
        name: employee.name,
        dob: employee.dob,
        status: employee.status,
        address: employee.address,
        karyawanDetail: {
          nik: employee?.karyawanDetail?.nik,
          npwp: employee?.karyawanDetail?.npwp,
        },
      }));
      setFormOpen(true);
    }
  }, [fetchLoading]);

  const closeForm = () => {
    setFormOpen(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleDelete = async () => {
    // handleDelete();
    await props.deleteEmployee(deleteId);
    window.location.reload();
    // handleCloseDelete();
  };
  return (
    <DefaultLayout>
      <DeleteConfirm
        show={showDelete}
        handleClose={handleCloseDelete}
        handleDelete={handleDelete}
        id={deleteId}
      />
      <CreateForm
        show={formOpen}
        handleClose={closeForm}
        createForm={newForm}
        updateNewForm={setNewForm}
        createEmplyee={createEmplyee}
      />
      <DetailView
        show={detailView}
        handleClose={() => setDetailView(false)}
        form={employee}
      />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="flex justify-end">
          <Button onClick={handleCreate}>Create</Button>
        </div>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[50px] py-4 px-1 font-medium text-black dark:text-white">
                  No
                </th>
                <th className="min-w-[120px] py-4 px-2 font-medium text-black dark:text-white">
                  Name
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Nik
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Address
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((packageItem) => (
                <tr key={packageItem.id}>
                  <td className="border-b border-[#eee] py-5 px-1 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <p className="font-medium text-black dark:text-white">
                      {packageItem.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.karyawanDetail.nik}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {packageItem.address}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        packageItem.status
                          ? "bg-success text-success"
                          : "bg-warning text-warning"
                      }`}
                    >
                      {packageItem.status ? "Active" : "Inactive"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          //console.log("ww");
                          props.fetchEmployeeById(packageItem.id);
                          setDetailView(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          handleEditView(packageItem.id);

                          //setFormOpen(true);
                          //setIsEditing(() => true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                      </button>
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          setShowDelete(true);
                          setShowDeleteId(packageItem.id);
                          //props.deleteEmployee(packageItem.id);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
};

const DeleteConfirm = ({ handleDelete, show, handleClose, id }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete employee by id {id}?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const HomeComponent = connect(mapStateToProps, mapDispatchToProps)(Home);

const App = (props) => {
  return <HomeComponent />;
};

export default App;
