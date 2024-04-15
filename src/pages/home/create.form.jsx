import moment from "moment";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateForm = ({ show, handleClose, createForm, updateNewForm, createEmplyee }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormBody createForm={createForm} updateNewForm={updateNewForm} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
          createEmplyee();
        }}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export const DetailView = ({ show, handleClose, form }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Employee Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>nama: {form.name}</p>
        <p>NIK: {form?.karyawanDetail?.nik}</p>
        <p>NPWP: {(form?.karyawanDetail?.npwp)}</p>
        <p>Tanggal Lahir: {moment(form.dob).format("MMM DD YYYY")}</p>
        <p>Alamat: {form.address}</p>
        <p>Status: {form.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const FormBody = ({ createForm, updateNewForm }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <div className="grid grid-cols-1 gap-9 ">
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className=" py-4 px-6.5 ">
              <h3 className="font-medium text-black dark:text-white">
                Create New
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      name
                    </label>
                    <input
                    value={createForm.name}
                    onChange={(e) => {
                      updateNewForm((prev) => ({...createForm, name: e.target.value}));
                    }}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <div className="w-full">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Birth Date
                    </label>
                    <ReactDatePicker
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      selected={createForm.dob}
                      onChange={(e) => {
                        updateNewForm((prev) => ({...prev, dob: e}));
                      }}
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    NIK
                  </label>
                  <input
                   value={createForm.karyawanDetail.nik}
                   onChange={(e) => {
                     updateNewForm((prev) => ({...prev, karyawanDetail : {
                      ...prev.karyawanDetail, nik: e.target.value
                     }}));
                   }}
                    type="number"
                    placeholder="Enter your NIK"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Npwp
                  </label>
                  <input
                    type="number"
                    value={createForm.karyawanDetail.npwp}
                   onChange={(e) => {
                     updateNewForm((prev) => ({...prev, karyawanDetail : {
                      ...prev.karyawanDetail, npwp: e.target.value
                     }}));
                   }}
                    placeholder="Enter your NPWP"
                    className="w-full no-de rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Active
                  </label>
                  <div key={`default-radio`} className="mb-3">
                    <Form.Check // prettier-ignore
                      type={"radio"}
                      id={`default-radio`}
                      label={`Active`}
                      value={'active'}
                      checked={createForm.status === "active"}
                      onChange={(e) => {
                        updateNewForm((prev) => ({...prev, status: e.target.value}));
                      }}
                    />
                    <Form.Check // prettier-ignore
                      type={"radio"}
                      id={`default-radio`}
                      label={`Non-Active`}
                      value={'inactive'}
                      checked={createForm.status === "inactive"}
                      onChange={(e) => {
                        updateNewForm((prev) => ({...prev,  status: e.target.value}));
                      }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Address
                  </label>
                  <textarea
                    rows={6}
                    value={createForm.address}
                    onChange={(e) => {
                      updateNewForm((prev) => ({...prev,  address: e.target.value}));
                    }}
                    placeholder="Type your Address"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};



export default CreateForm;
