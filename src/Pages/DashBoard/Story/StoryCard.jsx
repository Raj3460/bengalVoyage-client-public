import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosSecureApi from '../../../Hooks/Api/UseAxiosSecureApi';

const StoryCard = ({ story, refetch }) => {
  const axiosSecure = UseAxiosSecureApi();

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/stories/${id}`);
        if (res.data.success) {
          Swal.fire('Deleted!', 'Your story has been deleted.', 'success');
          refetch();
        }
      }
    });
  };

  const renderImageGrid = () => {
    const imageCount = story.images?.length || 0;
    const containerClass = "w-full h-64 overflow-hidden rounded-t-lg";

    if (imageCount === 0) {
      return (
        <div className={`${containerClass} bg-gray-100 flex items-center justify-center`}>
          <span className="text-gray-400">No images</span>
        </div>
      );
    }

    if (imageCount === 1) {
      return (
        <div className={containerClass}>
          <img 
            src={story.images[0]} 
            alt={story.title} 
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (imageCount === 2) {
      return (
        <div className={`${containerClass} flex gap-1`}>
          {story.images.slice(0, 2).map((img, index) => (
            <div key={index} className="w-1/2 h-full overflow-hidden">
              <img 
                src={img} 
                alt={`${story.title} ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    if (imageCount === 3) {
      return (
        <div className={`${containerClass} grid grid-cols-2 gap-1`}>
          <div className="row-span-2 h-full overflow-hidden">
            <img 
              src={story.images[0]} 
              alt={`${story.title} 1`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-32 overflow-hidden">
            <img 
              src={story.images[1]} 
              alt={`${story.title} 2`} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-32 overflow-hidden">
            <img 
              src={story.images[2]} 
              alt={`${story.title} 3`} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      );
    }

    if (imageCount === 4) {
      return (
        <div className={`${containerClass} grid grid-cols-2 gap-1`}>
          {story.images.slice(0, 4).map((img, index) => (
            <div key={index} className="h-32 overflow-hidden">
              <img 
                src={img} 
                alt={`${story.title} ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      );
    }

    // For 5+ images
    return (
      <div className={`${containerClass} grid grid-cols-2 gap-1`}>
        {story.images.slice(0, 4).map((img, index) => (
          <div 
            key={index} 
            className={`overflow-hidden ${index === 3 ? 'relative' : ''}`}
          >
            <img 
              src={img} 
              alt={`${story.title} ${index + 1}`} 
              className="w-full h-32 object-cover"
            />
            {index === 3 && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-bold text-xl">
                +{imageCount - 4}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card bg-white shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg">
      {/* Facebook-style Image Grid */}
      {renderImageGrid()}

      {/* Card Content */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-1 line-clamp-1">{story.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{story.description}</p>
        
        {/* Action Buttons */}
        <div className="flex justify-between border-t pt-3">
          <Link 
            to={`/dashboard/update-story/${story._id}`}
            className="text-blue-500 hover:text-blue-700 font-medium text-sm"
          >
            Edit
          </Link>
          <button 
            onClick={() => handleDelete(story._id)}
            className="text-red-500 hover:text-red-700 font-medium text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryCard;