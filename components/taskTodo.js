import React, {useState} from 'react';
import {FilePlus, Trash} from "phosphor-react";

function TaskTodo({task, setAllTasks, user, item, setAllNotes}) {

    const [note, setNote] = useState("")
    const [noteOpen, setNoteOpen] = useState(false)

    async function setTaskStatus(taskId, setTo) {
        await fetch("/api/update-task-status?taskId=" + taskId + "&setTo=" + setTo)
    }

    async function deleteTask(taskId) {
        await fetch("/api/delete-task?taskId=" + taskId)
    }

    async function getTasks() {
        const fetchedTasks = await fetch("/api/get-tasks?userId=" + user.email + "&referralId=" + item._id)
            .then(res => res.json())
        await setAllTasks(fetchedTasks)
    }

    async function getNotes() {
        const fetchedNotes = await fetch("/api/get-notes?userId=" + user.email)
            .then(res => res.json())
        await setAllNotes(fetchedNotes)
    }

    async function saveNote() {
        await fetch("/api/save-note", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                referralId: item._id,
                taskId: task._id,
                userId: user.email,
                note: note,
                surveyId: item.surveyId,
                timestamp: new Date()
            })
        })
        setNote("")
    }

    return (
        <div className={"mt-3"}>
            <div className={"flex justify-between align-middle p-2 bg-gray-200"} key={task._id}>
                <div className={"flex"}>
                    <input type={"checkbox"} className={"mr-2 rounded"} onChange={() => {
                        setTaskStatus(task._id, true)
                            .then(() => {
                                getTasks().then()
                            })
                    }}/>
                    <div className={"text-xs "}>{task.task}</div>
                </div>
                <div className={"flex"}>
                    <div className={"cursor-pointer mr-3"}
                         onClick={() => {
                             setNoteOpen(!noteOpen)
                         }}><FilePlus size={16} weight="thin"/>
                    </div>
                    <div className={"cursor-pointer"}
                         onClick={() => {
                             if (confirm("Do you want to delete this task? This action is permanent.")) {
                                 deleteTask(task._id)
                                     .then(() => {
                                         getTasks().then()
                                     })
                             }
                         }}><Trash size={16} weight="thin" color={"red"}/>
                    </div>
                </div>
            </div>
            <div className={`mb-3 ${noteOpen ? "visible" : "hidden"}`}>
                <input type={"text"} value={note} placeholder={"Enter  note here..."}
                       className={"p-1 text-sm border-0 border-b-[1px] border-indigo-500 text-sm font-light w-full"}
                       onChange={(e) => {
                           setNote(e.target.value)
                       }}/>
                <div className={"flex justify-end"}>
                    <button disabled={note === ""}
                            className={"bg-indigo-600 text-white px-4 py-1 text-xs rounded mt-2 disabled:bg-gray-400"}
                            onClick={() => {
                                saveNote().then(getNotes)
                            }}>Save note
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskTodo;
