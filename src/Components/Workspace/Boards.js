import React, { useContext, useEffect, useState } from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from '../../Context/UserContext';
import EditBoard from './Modals/EditBoard';
import NewBoard from './Modals/NewBoard';

const Boards = () => {
  const { user, currentWorkspace, logOut } = useContext(AuthContext);
  const [cards, setBoards] = useState([]);
  const [_id, _setId] = useState("");

  const handleEdit = (id) => {
    _setId(id)
  }

  const reloadBoards = () => {
    if (!currentWorkspace) return;
    setBoards([]);
    fetch(process.env.REACT_APP_SERVER_URL + `/workspace-boards/${currentWorkspace._id}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
      })
      .then(res => {
        setBoards(res);
      });
  }

  useEffect(reloadBoards, [currentWorkspace]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const data = { name, wid: currentWorkspace._id, _id: 'new' };

    fetch(`${process.env.REACT_APP_SERVER_URL}/create-update-workspace-board`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Successfully added the board.");
        form.reset();
        document.querySelector(".close_modal").click();
        reloadBoards();
      })
      .catch((error) => toast.error(error.message));
  };
  const image = "https://media.istockphoto.com/id/1044776908/photo/a-beautiful-colorful-abstract-mountain-scenery-in-sunrise-minimalist-landscape-of-mountains.jpg?s=170667a&w=0&k=20&c=M1n3XMcg9KJNXEdsQqITqboEcU999O4uRy9yjUOKpJk=";

  const handleEdite = (event) => {
    event.preventDefault();
    console.log(event,);
    const form = event.target;
    const name = form.name.value;
    const data = { name, _id: _id };
    fetch(`${process.env.REACT_APP_SERVER_URL}/create-update-workspace-board`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        toast.success("Successfully edited the board name.");
        form.reset();
        document.querySelector(".close_modal").click();
        reloadBoards();
      })
      .catch((error) => toast.error(error.message));
  }

  return (
    <div>{currentWorkspace && <>
      <div className="flex justify-between  pr-5">
        <h1 className="text-xl font-medium px-5">Boards</h1>
        <a
          href="#new-board"
          className="btn btn-primary btn-sm rounded-sm"
        > Create new board </a>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 mt-8 gap-4 px-5 ">
        {cards.map((card, i) => (
          <div key={card._id}>
            <a href={`#edit-board-${card._id}`} onClick={() => handleEdit(card._id)} className='justify-end flex -mb-16 cursor-pointer p-2 text-lg hover:text-gray-400  text-white'><BsPencilSquare ></BsPencilSquare></a>
            <Link to={`/workspace/board/${card._id}`}>
              <div style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
              }} className="mt-6 image-full">
                <div className="card-body">
                  <div className='flex'>
                    <h2 className="card-title text-white ">{card.name}</h2>
                  </div>
                </div>
              </div></Link>
            <EditBoard card={card} handleEdite={handleEdite} ></EditBoard>
          </div>
        ))}
      </div>
      <NewBoard handleSubmit={handleSubmit}></NewBoard>
    </>}
    </div>
  );
};

export default Boards;
