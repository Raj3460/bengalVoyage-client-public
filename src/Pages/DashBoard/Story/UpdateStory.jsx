import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';

const UpdateStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecureApi();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  // Fetch existing story data
  const { data: story, isLoading, refetch } = useQuery({
    queryKey: ['story', id],
    queryFn: () => axiosSecure.get(`/stories/${id}`).then(res => res.data.data),
    staleTime: 0 // Ensure fresh data on every load
  });

  // Set form values when data loads
  useEffect(() => {
    if (story) {
      setValue('title', story.title);
      setValue('description', story.description);
    }
  }, [story, setValue]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axiosSecure.patch(`/stories/${id}`, {
        title: data.title,
        description: data.description
      });
      
      if (res.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Story updated successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          navigate('/dashboard/manage-stories');
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update story',
        icon: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpdate = async (imagesToRemove = [], imagesToAdd = []) => {
    setIsImageUploading(true);
    try {
      const res = await axiosSecure.patch(`/stories/${id}/images`, {
        imagesToRemove,
        imagesToAdd
      });
      
      if (res.data.success) {
        await refetch(); // Wait for data to refresh
        Swal.fire({
          title: 'Success!',
          text: 'Images updated successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    } catch (error) {
      console.error('Image update error:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update images',
        icon: 'error'
      });
    } finally {
      setIsImageUploading(false);
    }
  };

  const uploadNewImages = async (files) => {
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('images', file));
      
      const uploadRes = await axiosSecure.post('/upload-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (uploadRes.data.success) {
        await handleImageUpdate([], uploadRes.data.urls);
      }
    } catch (error) {
      console.error('Upload error:', error);
      throw error;
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );

  return (
    <div className="bg-amber-50 p-4 md:p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Your Story</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Title *</label>
          <input
            {...register('title', { 
              required: 'Title is required',
              minLength: {
                value: 5,
                message: 'Title should be at least 5 characters'
              }
            })}
            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
            placeholder="Enter your story title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Description *</label>
          <textarea
            {...register('description', { 
              required: 'Description is required',
              minLength: {
                value: 50,
                message: 'Description should be at least 50 characters'
              }
            })}
            className={`textarea textarea-bordered w-full h-40 ${errors.description ? 'textarea-error' : ''}`}
            placeholder="Tell your story in detail..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Image Management */}
        <div>
          <label className="block font-medium mb-2 text-gray-700">Images</label>
          
          {story?.images?.length > 0 ? (
            <div className="mb-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {story.images.map((img, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src={img} 
                      alt={`Story image ${index + 1}`} 
                      className="w-full h-40 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageUpdate([img], [])}
                      className={`absolute top-2 right-2 btn btn-circle btn-sm btn-error ${
                        isImageUploading ? 'opacity-50 cursor-not-allowed' : 'opacity-0 group-hover:opacity-100'
                      } transition-opacity`}
                      disabled={isImageUploading}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mb-3">
                Click the × button to remove images
              </p>
            </div>
          ) : (
            <div className="alert alert-warning mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>Your story currently has no images</span>
            </div>
          )}

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Add More Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={async (e) => {
                const files = Array.from(e.target.files);
                if (files.length > 0) {
                  try {
                    await uploadNewImages(files);
                  } catch (error) {
                    Swal.fire({
                      title: 'Error!',
                      text: 'Failed to upload images',
                      icon: 'error'
                    });
                  }
                }
              }}
              className="file-input file-input-bordered w-full"
              disabled={isImageUploading}
            />
            <p className="mt-1 text-sm text-gray-500">
              Upload JPG, PNG, or WEBP images (max 5MB each)
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3 pt-4">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="btn btn-accent"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting || isImageUploading}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Updating...
              </>
            ) : 'Update Story'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStory;