 import React,{useState} from 'react'
 import backgroundImage from './nature-background.jpg'; 

export default function App() {
    const [id]=useState(101)
    const [count,setcount]=useState(0);
    const [name]=useState('Malavan');
    const [salary]=useState([10000]);
    const [Address,setaddress]=useState({Street:'South Street',village:'Srimushnam',district:''});
  return (
    <div >
       <style>
        {`
          body {
            background-image: url(${backgroundImage});
            background-size: cover;
            background-position: center;
            height: 100vh;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
      
       <div>Employee_Id :{id}</div>
      <div>Name :{name}</div> 
      
      <div>Salary:{salary}</div>

      <div>Address:{' '+Address.Street +','+Address.village+','+Address.district}</div>
      <input type="text" value={Address.district} onChange={(e) =>{
        setaddress({...Address,district: e.target.value})
      }}></input>
      <div>No of Days Working :{count} </div>
      <div>
        <button onClick={()=>{
            setcount(count+1);
        }}>
            Present
        </button>{'     '}
        <button onClick={()=>{
            setcount(count-1);
        }}>
            Absent
        </button>
      </div>
      
      <div>
        
      </div>
          

    </div>
  )
}
