import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/SideBar';
import './css/index.css';
import AddStoryForm from './pages/AddStory';
import UserList from './pages/StoryManage';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-10">
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/add-story" element={<AddStoryForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
