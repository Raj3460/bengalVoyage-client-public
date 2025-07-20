import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Select from 'react-select';
import Swal from 'sweetalert2';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';

const ManageUsersByAdmin = () => {
  const axiosSecure = UseAxiosSecureApi();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Role options for filter dropdown
  const roleOptions = [
    { value: '', label: 'All Roles' },
    { value: 'tourist', label: 'Tourist' },
    { value: 'tour-guide', label: 'Tour Guide' },
    { value: 'admin', label: 'Admin' }
  ];

  // Fetch users with filters
  const { 
    data: apiResponse = {}, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['admin-users', searchTerm, roleFilter?.value, currentPage],
    queryFn: async () => {
      const params = {
        search: searchTerm,
        role: roleFilter?.value || '',
        page: currentPage,
        limit: usersPerPage
      };
      
      try {
        const res = await axiosSecure.get('/admin/users', { params });
        console.log('API Response:', res.data); // Debug log
        return res.data;
      } catch (err) {
        console.error('API Error:', err.response?.data || err.message);
        if (err.response?.status === 403) {
          Swal.fire({
            icon: 'error',
            title: 'Access Denied',
            text: 'You do not have admin privileges',
          });
        }
        throw err;
      }
    },
    keepPreviousData: true,
    retry: 1
  });

  // Extract users data from different possible response structures
  const users = apiResponse?.data || apiResponse?.users || [];
  const totalUsers = apiResponse?.pagination?.total || apiResponse?.total || 0;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  // Handle role change
  const handleRoleChange = async (userId, newRole) => {
  try {
    const { isConfirmed } = await Swal.fire({
      title: 'Confirm Role Change',
      text: `Change this user's role to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (isConfirmed) {
      // Add debug logs
      console.log('Attempting to update user:', userId, 'to role:', newRole);
      
      const response = await axiosSecure.patch(
        `/admin/users/${userId}/role`, 
        { role: newRole },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Update response:', response.data);
      refetch();
      Swal.fire('Success!', 'Role updated successfully', 'success');
    }
  } catch (error) {
    console.error('Update error details:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
      message: error.message
    });
    
    Swal.fire(
      'Error!',
      error.response?.data?.message || 'Failed to update role',
      'error'
    );
  }
};

  // Handle user deletion
  const handleDeleteUser = async (userId) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Delete User?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete'
    });

    if (isConfirmed) {
      try {
        await axiosSecure.delete(`/admin/users/${userId}`);
        refetch();
        Swal.fire('Deleted!', 'User has been removed', 'success');
      } catch (error) {
        Swal.fire(
          'Error!',
          error.response?.data?.message || 'Failed to delete user',
          'error'
        );
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="alert alert-error max-w-md mx-auto mt-8">
        <div className="flex-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <label>{error.response?.data?.message || error.message || 'Failed to load users'}</label>
        </div>
      </div>
    );
  }

  console.log( 'users',users);
  console.log( 'totalUsers',totalUsers);
  console.log( 'totalPages',totalPages);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by name or email..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="w-full md:w-64 text-black">
          <Select 
            options={roleOptions}
            defaultValue={roleOptions[0]}
            onChange={(selected) => {
              setRoleFilter(selected);
              setCurrentPage(1);
            }}
            isSearchable={false}
            className="text-sm font-bold "
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-base-300 rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-primary text-black font-bold">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-500">
                  <td className="font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      className="select select-bordered select-sm w-full max-w-xs"
                      value={user.role || 'tourist'}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      disabled={user.role === 'admin'}
                    >
                      <option value="tourist">Tourist</option>
                      <option value="tour-guide">Tour Guide</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <button 
                      className="btn btn-error btn-sm"
                      onClick={() => handleDeleteUser(user._id)}
                      disabled={user.role === 'admin'}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8">
                  <div className="flex flex-col items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="mt-2">No users found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join">
            <button 
              className="join-item btn"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              «
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  className={`join-item btn ${currentPage === pageNum ? 'btn-active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && (
              <button className="join-item btn btn-disabled">...</button>
            )}
            <button 
              className="join-item btn"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsersByAdmin;