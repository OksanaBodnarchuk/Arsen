import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./SingleNotePage.module.css";

const fatchNote = (id) => {
  return axios.get(`http://localhost:3001/notes/${id}`);
};

const deleteNote = (id) => {
  return axios.delete(`http://localhost:3001/notes/${id}`);
};

const changeNote = (id, data) => {
    return axios.put(`http://localhost:3001/notes/${id}`, data)
} 

const SingleNotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState('')
  const [descr, setDescr] = useState('')
  const [tasks, setTasks] = useState('')

  useEffect(() => {
    fatchNote(id)
      .then((res) => setNote(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = () => {
    deleteNote(id)
    .then(() => {
      window.location
      .replace("/")
      .catch((err) => console.log(err));
    });
  };

  const handleEdit = () => {
    setEditMode(true);
    setText(note.text)
    setDescr(note.descr)
    setTasks(note.tasks)    
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const editedNote = {
        text,
        descr,
        tasks
    }
    changeNote(id, editedNote)
    .then(res => {
        setNote(res.data)
        setEditMode(false)
    })
  }

  return (
    <><h1>Редактирование</h1>
      {editMode ? (        
        <form className = {s.form} onSubmit={handleSubmit} >
          <input 
                    className = {s.control} 
                    type = "text" 
                    placeholder = 'Название' 
                    value = {text} 
                    onChange={e => setText(e.target.value)} 
                />
                <input 
                    className = {s.control} 
                    type = "text"               
                    placeholder = 'Описание' 
                    value = {descr} 
                    onChange = {e => setDescr(e.target.value)}
                />
                <input 
                    className = {s.control} 
                    type = "text" 
                    placeholder = 'Количество задач'
                    value = {tasks} 
                    onChange = {e => setTasks(e.target.value)}
                 />
                <input 
                    className = {s.submit} 
                    type = "submit" 
                    value = "Сохранить" />
        </form>
      ) : (
        <div className = {s.form} >
          <h1>{note.text}</h1>
          <p>
            <b>Описание:</b> {note.descr}
          </p>
          <p>
            <b>Количество задач:</b> {note.tasks}
          </p>
          <div className={s.button} >
            <button className = {s.submit}  onClick={handleDelete}>Удалить</button>
            <button className = {s.submit}  onClick={handleEdit}>Редактировать</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleNotePage;
