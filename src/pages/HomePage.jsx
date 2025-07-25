import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../api/studentApi'
import { EyeIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';

function HomePage() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getStudents()
      .then((res) => {
        console.log("Fetched Students:", res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
      });
  }, []);

  const addStudent = () => {
    // Logic to add a student can be implemented here
    navigate('/add-student');
  }

   const handleEditStudentd = (id) => {
    // Logic to edit a student can be implemented here
    navigate(`/student/${id}/edit`);
  }

   const handleDeleteStudent = async (id) => {
    // Logic to delete a student can be implemented here
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      alert('Failed to delete student');
      console.error(error);
    }
  }

const studentDetails = () => {
    // Logic to view student details can be implemented here
    navigate('/student/1');
  }

  return (<div className="min-h-screen flex flex-col m-4">
      {/* Header */}
      <header className="text-black bg-amber-100 h-15 flex items-center">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href='/' className="text-2xl font-bold text-blue-600">Demo Micro SaaS Tuition Center</a>
          <nav>
            <ul className="flex space-x-6 gap-4 ml-2">
              <li><a href="/" className=" text-blue-600 hover:text-blue-600">Home</a></li>
              <li><a href="#" className=" text-blue-600 hover:text-blue-600">About</a></li>
              <li><a href="#" className=" text-blue-600 hover:text-blue-600">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col  items-center justify-start m-8">
      <h1 className="text-black text-3xl mt-4">Student Dashboard</h1>
      
      <div className="w-full p-4 text-xl h-auto flex flex-col items-center ">
        <div className='w-3/4 h-15 flex items-center justify-end '>
         <h1 onClick={addStudent} className='bg-blue-500 h-10 w-55 flex items-center justify-center hover:cursor-pointer' >Add Student</h1>
        </div>
         <div className='w-3/4  h-auto flex items-center '>
          <table className='w-full text-left border-collapse'>
            <thead className="bg-gray-100 w-full" >
              <tr className='h-11'>
                <th >ID</th>
                <th >Photo</th>
                <th >Name</th>
                <th >Course</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody>
            {Array.isArray(students) && students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td> <img
                  src={student.profileImageUrl}
                  alt={student.name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                </td>
                <td>{student.name}</td>
                <td>{student.course}</td>
                <td className="p-3 flex gap-3">
                  <PencilSquareIcon
                      className="h-5 w-5 text-yellow-500 hover:text-yellow-700 cursor-pointer"
                      onClick={() => handleEditStudentd(student.id)}
                    />
                    <TrashIcon
                      className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => handleDeleteStudent(student.id)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
       
        
         

      </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        
      </section>

      {/* Footer */}
      <footer className="bg-gray-600 text-gray-200 py-4 text-center">
        &copy; {new Date().getFullYear()} Micro SaaS. All rights reserved.
      </footer>
    </div>

  );
}

export default HomePage;