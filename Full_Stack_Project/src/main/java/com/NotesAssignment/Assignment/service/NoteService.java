package com.NotesAssignment.Assignment.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.NotesAssignment.Assignment.model.Note;
import com.NotesAssignment.Assignment.repository.NoteRepository;

@Service
public class NoteService {
	
	@Autowired
	private NoteRepository repo;
	
	public Note create (Note note) {
		if(note.getTitle()==null || note.getTitle().trim().isEmpty() ) {
			throw new RuntimeException("title cannot be empty");
		}
		
		note.setCreatedAt(LocalDateTime.now());
		note.setUpdatedAt(LocalDateTime.now());
		return repo.save(note);
	}
	
	public List<Note> getall(){
		return repo.findAll();
	}
	
	public Note getById(String id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Note not found"));
    }

	public Note update(String id,Note updated) {
		Note note= getById(id);
		note.setTitle(updated.getTitle());
		note.setContent(updated.getContent());
		note.setUpdatedAt(LocalDateTime.now());
		
		return repo.save(note);
	}
	public void delete(String id) {
	    if (!repo.existsById(id)) {
	        throw new RuntimeException("Note not found");
	    }
	    repo.deleteById(id);
	}
	
	public List<Note> search(String keyword){
		return repo.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(keyword, keyword);
	}
	
	
	}

