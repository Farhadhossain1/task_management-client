import React, { useContext, useState } from 'react';
import { CgLogOut } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import CreateWorkSpaceModal from '../CreateWorkSpaceModal/CreateWorkSpaceModal';
import useRole from '../../hooks/useRole';

const Navbar = () => {
  const navigate = useNavigate()
  const { user, logOut, toggleTheme, isDark } = useContext(AuthContext);
  const [role] = useRole(user?.email)
  // if(role === "admin"){
  //   return setAdmin(role)
  // }
  // else {
  //   return setUsers(role)
  // };

  console.log(role);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate('/')
      })
      .catch(error => console.error(error))
  }
  // eslint-disable-next-line no-unreachable
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

            <li><Link to='/'>Home</Link></li>
            <li> <Link to='/workspace/boards'>Workspaces</Link></li>
            <li><a href="#WorkSpaceModal-1">Create</a></li>

            {/* <li tabIndex={0}>
                <a className="justify-between">
                  Parent
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"/></svg>
                </a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li> */}
          </ul>
        </div>
        <Link to='/'><img className='w-48 lg:ml-12' src="/logo.png" alt="" /></Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className='rounded-none'><Link to='/'>Home</Link></li>
          <li> <Link to='/workspace/boards'>Workspaces</Link></li>
          <li><a href="#WorkSpaceModal-1">Create</a></li>
          <li><Link to="/pricing">Pricing</Link></li>
        {
          role &&   <li><Link to="/dashboard">Dashboard</Link></li>
        }
          {/* <li tabIndex={0}>
              <a>
                Parent
                <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
              </a>
              <ul className="p-2">
               
                <li><a>Submenu 2</a></li>
              </ul>
            </li>
            <li><a>Item 3</a></li> */}
        </ul>
      </div>
      <div className="navbar-end">
       <div className='mr-5 cursor-pointer'> {
          isDark ?   <img  onClick={toggleTheme}  className='w-6' src="https://cdn-icons-png.flaticon.com/512/831/831682.png" alt="#" /> :   <img  onClick={toggleTheme} className='w-6' src="https://icon-library.com/images/moon-icon-png/moon-icon-png-25.jpg" alt="" />
        }
        </div>
     
        {
          user?.uid ?
            <><div className="dropdown dropdown-end flex flex-row">
              {/* <p className='mt-3 font-bold'>{user.displayName}</p> */}
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt='#' src={user?.photoURL != null ? user?.photoURL : `https://ui-avatars.com/api/?name=${user?.displayName}&color=7F9CF5&background=EBF4FF`} />
                </div>
              </label>
              <div tabIndex={1} className="menu menu-compact dropdown-content mt-12 p-2 shadow-lg bg-base-100 rounded-sm w-60">
                <h2 className=" text-gray-600 font-bold my-2">ACCOUNT</h2>
                <div className='flex items-center mb-5'>
                  <div className="w-10 mr-1">
                    <img alt='#' className='rounded-full' src={user?.photoURL != null ? user?.photoURL : `https://ui-avatars.com/api/?name=${user?.displayName}&color=7F9CF5&background=EBF4FF`} />
                  </div>
                  <div>
                    <p className='mt-3 text-xs mb-0'>{user?.displayName}</p>
                    <p className='mt-3 text-xs mb-0'>{user?.email}</p>
                  </div>
                </div>
                <li>
                  <Link to='/profile' className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className="justify-between">
                    Activity
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className="justify-between">
                    Cards
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className="justify-between">
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className="justify-between">
                    Help
                  </Link>
                </li>
                <li>
                  <Link to='/profile' className="justify-between">
                    Shortcuts
                  </Link>
                </li>
                <div className="divider"></div>
                <li><Link className='gap-1 items-center text-center' onClick={handleLogOut}>  <CgLogOut></CgLogOut>Logout</Link></li>
              </div>
            </div></> :
            <>
              <Link to='/login'><button type="button" className="hover:bg-gray-100 rounded-md font-medium  text-sm px-5 py-2.5 mr-2 mb-2 ">Login</button></Link>
              <Link to='/register'><button type="button" className="hover:bg-gray-100 focus-visible: rounded-md  font-medium  text-sm px-5 py-2.5 mr-2 mb-2 ">Sign Up</button></Link>
            </>
        }
      </div>
      {user && <CreateWorkSpaceModal></CreateWorkSpaceModal>}
    </div>
  );
};

export default Navbar;