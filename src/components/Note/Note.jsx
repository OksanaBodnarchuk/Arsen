import React from 'react';
import s from "./Note.module.css"
import { Link } from 'react-router-dom';

const Note = (props) => {
    return (
        <div className={s.note}>
            <h5 className={s.title} >
                <Link to={`/note/${props.id}`}>{props.title}</Link>
            </h5>
            <p className={s.descr} >{props.descr}</p>
        </div>
    );
};

export default Note;