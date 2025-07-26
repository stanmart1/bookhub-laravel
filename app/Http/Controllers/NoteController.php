<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Note;

class NoteController extends Controller
{
    // Get notes for a book
    public function getNotes($bookId)
    {
        $user = Auth::user();
        $notes = Note::where('user_id', $user->id)->where('book_id', $bookId)->get();
        return response()->json($notes);
    }

    // Add a note
    public function addNote(Request $request, $bookId)
    {
        $user = Auth::user();
        $request->validate([
            'content' => 'required|string',
            'page_number' => 'nullable|integer',
        ]);
        $note = Note::create([
            'user_id' => $user->id,
            'book_id' => $bookId,
            'content' => $request->content,
            'page_number' => $request->page_number,
        ]);
        return response()->json($note);
    }

    // Update a note
    public function updateNote(Request $request, $id)
    {
        $user = Auth::user();
        $note = Note::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $request->validate([
            'content' => 'required|string',
            'page_number' => 'nullable|integer',
        ]);
        $note->update([
            'content' => $request->content,
            'page_number' => $request->page_number,
        ]);
        return response()->json($note);
    }

    // Remove a note
    public function removeNote($id)
    {
        $user = Auth::user();
        $note = Note::where('id', $id)->where('user_id', $user->id)->firstOrFail();
        $note->delete();
        return response()->json(['message' => 'Note removed.']);
    }

    // Export notes for a book
    public function exportNotes($bookId)
    {
        $user = Auth::user();
        $notes = Note::where('user_id', $user->id)->where('book_id', $bookId)->get();
        $content = "";
        foreach ($notes as $note) {
            $content .= "Page " . ($note->page_number ?? '-') . ":\n" . strip_tags($note->content) . "\n\n";
        }
        $filename = "notes-book-{$bookId}.txt";
        return response($content)
            ->header('Content-Type', 'text/plain')
            ->header('Content-Disposition', "attachment; filename=\"$filename\"");
    }
}
