"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Palette, CheckSquare, Trash2, ListTodo } from "lucide-react"

interface NoteItem {
  id: string
  text: string
  completed: boolean
}

interface Note {
  id: string
  title: string
  content: string
  items: NoteItem[]
  color: string
  updated_at: string
  isChecklist: boolean
}

const availableColors = ["#FFFFFF", "#F28B82", "#FBBC04", "#FFF475", "#CCFF90", "#A7FFEB", "#CBF0F8", "#AECBFA", "#D7AEFB"]

export default function NotesApp() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const [notes, setNotes] = useState<Note[]>([])
  const [newNote, setNewNote] = useState<{ title: string; content: string; color: string; isChecklist: boolean }>(
    {
      title: "",
      content: "",
      color: "#FFFFFF",
      isChecklist: false,
    }
  )


  const addNote = () => {
    if (!newNote.title.trim() && !newNote.content.trim()) return

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      items: [],
      color: newNote.color,
      updated_at: new Date().toISOString(),
      isChecklist: newNote.isChecklist,
    }

    setNotes([note, ...notes])
    setNewNote({ title: "", content: "", color: "#FFFFFF", isChecklist: false })
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const updateNoteColor = (id: string, color: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, color } : note)))
  }

  const toggleChecklistItem = (noteId: string, itemId: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? {
              ...note,
              items: note.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
            }
          : note
      )
    )
  }

  const addChecklistItem = (noteId: string, text: string) => {
    if (!text.trim()) return
    const newItem: NoteItem = { id: Date.now().toString(), text, completed: false }
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, items: [...note.items, newItem] } : note
      )
    )
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-mono">
        <div>Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-mono">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">KeepKoro</h1>
        </header>

        <div className="mb-8 max-w-lg mx-auto">
          <Card style={{ backgroundColor: newNote.color }} className="shadow-lg">
            <CardContent className="p-4">
              <Input
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="border-none shadow-none p-0 h-auto text-lg font-medium focus-visible:ring-0 mb-2 bg-transparent"
              />
              <Textarea
                placeholder="Take a note..."
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="border-none shadow-none p-0 h-auto text-sm font-mono resize-none focus-visible:ring-0 bg-transparent"
              />
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={() => setNewNote({ ...newNote, isChecklist: !newNote.isChecklist })}>
                    <ListTodo className={`h-5 w-5 ${newNote.isChecklist ? 'text-blue-600' : ''}`}/>
                  </Button>
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewNote({ ...newNote, color })}
                      className={`w-6 h-6 rounded-full border ${newNote.color === color ? "ring-2 ring-blue-500" : ""}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <Button onClick={addNote} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {notes.map((note) => (
            <Card key={note.id} style={{ backgroundColor: note.color }} className="mb-4 break-inside-avoid">
              <CardContent className="p-4">
                {note.title && <h3 className="text-lg font-medium mb-2">{note.title}</h3>}

                {note.isChecklist ? (
                  <ul className="space-y-2">
                    {note.items.map((item) => (
                      <li key={item.id} className="flex items-center gap-3">
                        <input type="checkbox" checked={item.completed} onChange={() => toggleChecklistItem(note.id, item.id)} className="form-checkbox h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                        <span className={`${item.completed ? "line-through text-gray-500" : ""}`}>{item.text}</span>
                      </li>
                    ))}
                     <li className="flex items-center gap-3">
                        <Plus className="h-4 w-4 text-gray-500"/>
                        <Input placeholder="Add item" onKeyPress={(e) => e.key === 'Enter' && addChecklistItem(note.id, e.currentTarget.value)} className="border-none shadow-none p-0 h-auto text-sm focus-visible:ring-0 bg-transparent"/>
                    </li>
                  </ul>
                ) : (
                  <p className="text-sm mb-4 whitespace-pre-wrap">{note.content}</p>
                )}

                <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                  <span>{new Date(note.updated_at).toLocaleDateString()}</span>
                  <div className="flex items-center gap-2">
                    <div className="relative group">
                      <Palette className="h-4 w-4 cursor-pointer" />
                      <div className="absolute bottom-full mb-2 hidden group-hover:flex gap-1 bg-white p-1 rounded-md shadow-lg border">
                        {availableColors.map((color) => (
                          <button
                            key={color}
                            onClick={() => updateNoteColor(note.id, color)}
                            className="w-5 h-5 rounded-full border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <Trash2 className="h-4 w-4 cursor-pointer" onClick={() => deleteNote(note.id)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
