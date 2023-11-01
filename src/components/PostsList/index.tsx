import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { EditIcon, DeleteIcon } from "./Icons";
import { getPostsAPI, deletePostAPI } from "../../api/service";
import { useGlobalContext } from "../../context/GlobalContext";

const PostList: React.FC = () => {
  const { setIsOpen, setEditObj, setNotification, postList, setPostList } =
    useGlobalContext();
  const [loader, setLoader] = useState<boolean>(false);
  const [editId, setEditId] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(10);
  const [sortColumn, setSortColumn] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');



  const fetchPosts = async (page: number, limit: number, sort: string, order: string) => {
    try {
      const response = await getPostsAPI(page, limit, sort, order);
      setPostList(response.data);
    } catch (error) {
      setNotification({ msg: "Something went wrong", color: "danger" });
    }
  };
  // Inicializar la carga de publicaciones con ordenación
  useEffect(() => {
    fetchPosts(currentPage, postsPerPage, sortColumn, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, postsPerPage, sortColumn, sortOrder]);

    // Función para manejar cambios de ordenación
    const handleSortChange = (column: string) => {
      const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
      setSortColumn(column);
      setSortOrder(order);
    };  



  // Add new post
  const openModal = () => {
    setIsOpen(true);
  };

  // EDIT POST
  const editPost = (id: number) => {
    openModal();
    const filter = postList.filter((item: any) => item.id === id)[0] as any;
    setEditObj(filter);
  };

  // Delete POST
  const deletePost = async (id: number) => {
    setLoader(true);
    setEditId(id);
    try {
      const response = await deletePostAPI(id);
      if (response.data) {
        const filter = postList.filter((item: any) => item.id !== id);
        setPostList([...filter]);
        setNotification({
          msg: "Se borro exitosamente.",
          color: "success",
        });

      }
    } catch (error) {
      setNotification({ msg: "Algo Salió Mal", color: "danger" });
    }
    setEditId(0);
    setLoader(false);
  };


  return (
    <div className="mt-5">
      <div className="d-flex justify-content-end">
        <Button className="add-btn" onClick={() => openModal()}>
          Añadir nuevo
        </Button>
      </div>
      <div className="main mt-3 table-responsive">
        <table className="table">
        <thead>
        <tr>
          <th scope="col" onClick={() => handleSortChange('title')} style={{ color: '#FDFEFF' }}>
            Titulo
            {sortColumn === 'title' && (
              <i className={`uil sort-icon-large ${sortOrder === 'asc' ? 'uil-sort-amount-up' : 'uil-sort-amount-down'}`}></i>
            )}
          </th>
          <th scope="col" onClick={() => handleSortChange('body')} style={{ color: '#FDFEFF' }}>
            Cuerpo
            {sortColumn === 'body' && (
              <i className={`uil sort-icon-large ${sortOrder === 'asc' ? 'uil-sort-amount-up' : 'uil-sort-amount-down'}`}></i>
            )}
          </th>
          <th scope="col" style={{ color: '#FDFEFF' }}>Acción</th>
        </tr>

        </thead>
          <tbody>
            {postList.slice(0, 10).map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.title}</td>
                <td>{item.body}</td>
                <td>
                  <span className="pointer" onClick={() => editPost(item.id)}>
                    <EditIcon />
                  </span>
                  <span className="pointer ms-3" onClick={() => deletePost(item.id)}>
                    {((editId === item.id) && loader) ? <Spinner color="danger" size="sm" /> : <DeleteIcon />}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      <Button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
      >
        Anterior
      </Button>
      <Button
        className="pagination-button"
        onClick={() => setCurrentPage(page => page + 1)}
      >
        Siguiente
      </Button>

      </div>
    </div>
  );
};

export default PostList;
