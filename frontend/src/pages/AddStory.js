import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const AddStoryForm = () => {

  const breadcrumbItems = [
    { label: 'Stories Management', href: '/' },
    { label: 'Add Stories', href: '#' },
  ];
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [category, setCategory] = useState('');
  const [story_cover, setStoryImage] = useState('');
  const [status, setStatus] = useState('Publish');
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const saveStory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/stories", {
        title,
        author,
        synopsis,
        category,
        story_cover,
        tags,
        status,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="mt-5 text-4xl font-bold">Add Stories</h1>
      <div className="mt-3">
        <button onClick={() => navigate(-1)} className="flex items-center rounded-full bg-gray-200 text-gray-700 px-4 py-2 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" className="mr-2">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4l4 4" />
          </svg>
          Back
        </button>
      </div>
      <form onSubmit={saveStory} className="border-b border-gray shadow-md mt-5 rounded-lg">
        <div className="space-y-12 p-5">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <div className="flex flex-wrap items-center p-2 border border-gray-300 rounded-lg bg-white">
                <input
                  type="text"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Writer Name</label>
              <div className="flex flex-wrap items-center p-2 border border-gray-300 rounded-lg bg-white">
                <input
                  type="text"
                  className="input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Writer Name"
                />
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <label className="label">Synopsis</label>
            <div className="control">
              <textarea
                value={synopsis}
                rows={3}
                placeholder="Synopsis"
                className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 pl-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={(e) => setSynopsis(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full mt-1 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 bg-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="Financial">Financial</option>
                <option value="Health">Health</option>
                <option value="Technology">Technology</option>
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags/Keywords Story</label>
              <div className="flex flex-wrap items-center p-2 border border-gray-300 rounded-lg bg-white">
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center bg-gray-200 text-gray-800 text-sm rounded-full px-3 py-1 mr-2 mb-2">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyUp={handleAddTag}
                  placeholder="Press enter to add tag"
                  className="border-none outline-none flex-grow bg-transparent"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label className="label">Cover Image</label>
              <div className="flex flex-wrap items-center p-2 border border-gray-300 rounded-lg bg-white">
                <input
                  type="file"
                  className="input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full mt-1 border border-gray-300 rounded-lg py-2 px-3 text-gray-900 bg-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="Publish">Publish</option>
                <option value="Draft">Draft</option>
                <option value="Archieve">Archieve</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button className="flex items-center rounded-full bg-orange-500 text-white px-4 py-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-600 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Add Chapter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="border-b-2">
                  <th className="px-4 py-2 text-left text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-gray-600">Last Updated</th>
                  <th className="px-4 py-2 text-left text-gray-600"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50 border-b-2">
                  <td className="px-4 py-2">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                  <td className="px-4 py-2">Malcolm Lockyer</td>
                  <td className="px-4 py-2"><button
                    onClick={toggleDropdown}
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Actions
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                    {isOpen && (
                      <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => alert('Edit action')}
                          >
                            Edit
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => alert('Delete action')}
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>


          <div className="flex justify-end">
            <button className="mx-5 flex items-center rounded-full bg-white-500 text-black px-10 py-2 bg-gray-100 hover:bg-gray-200 ring-slate-800 ring-1 focus:outline-none focus:ring-2 focus:ring-gray-200 transition duration-300">
              Cancel
            </button>
            <button className="flex items-center rounded-full bg-orange-500 text-white px-12 py-2 hover:bg-orange-600 focus:outline-none ring-orange-500 ring-1 focus:ring-2 focus:ring-orange-600 transition duration-300">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddStoryForm;
