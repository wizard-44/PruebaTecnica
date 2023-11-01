import React, { useEffect, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { postAPI, putAPI } from "../../api/service";
import { PostPayload } from '../../models/index';
import { useGlobalContext } from "../../context/GlobalContext";


const Post: React.FC = () => {
  const { setIsOpen, isOpen, editObj, setNotification, setPostList, postList, setEditObj } = useGlobalContext();

  const [value, setValue] = useState<string>("");
  const [valueBody, setValueBody] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (editObj.title) {
      setValue(editObj.title);
    }
    if (editObj.body) {
      setValueBody(editObj.body);
    }
  }, [editObj.title,editObj.body])
  

  // CLOSE modal
  const handleClose = () => {
    setIsOpen(false);
    setValue("");
    setValueBody("");
    setEditObj({userId: 0, title: "", body: "", id: 0});
  };

  const putRequest = async () => {
    const newObj = { ...editObj, title: value, body:valueBody };
    try {
      // ADD NEW POST
      const postRes = await putAPI(newObj);
      if (postRes.data) {
        const finIndex = postList.findIndex(
          (item: any) => item.id === postRes.data.id
        );
        postList[finIndex] = postRes.data;
        const updatedList = [...postList];
        setPostList(updatedList);
        setNotification({
          msg: "Post Actualizado Correctamente",
          color: "success",
        });
      }
    } catch (error) {
      
    }
  }

  const postRequest = async () => {
    try {
      const post = {
        title: value,
        body: valueBody,
        userId: 1
      } as PostPayload;
      // EDIT POST POST
      const postRes = await postAPI(post);
      if (postRes.data) {
        postList.splice(0, 0, postRes.data);
        const updatedList = [...postList];
        setPostList(updatedList);
        setNotification({ msg: "Post Añadido Correctamente", color: "success" });
      }
    } catch (error) {
      setNotification({ msg: "Algo Salió Mal", color: "danger" });
    }
  }

  const onSubmit = async () => {
    setLoader(true);
    if (editObj.title) {
      await putRequest();
    } else {
      await postRequest();
    }
    setLoader(false);
    handleClose();
  };

  return (
    <>
      <Modal show={isOpen} animation={true}>
        <Modal.Header className="modal-header">
          <Modal.Title className="mx-auto">{editObj.title ? "Editar elemento" : "Añadir nuevo"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>Nombre del titulo</label>
            <div className="input-group mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                name="name"
                data-testid="title-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Ponga el titulo"
              />
            </div>
          </div>
          <div>
            <label>Cuerpo</label>
            <div className="input-group mb-3 mt-3">
              <input
                type="text"
                className="form-control"
                name="name"
                data-testid="title-input"
                value={valueBody}
                onChange={(e) => setValueBody(e.target.value)}
                placeholder="Ponga el cuerpo"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loader} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button data-testId="add-button" className="add-btn" disabled={loader} variant="primary" onClick={onSubmit}>
            {loader ? <Spinner color="primary" size="sm" /> : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
