package com.NotesAssignment.Assignment.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.NotesAssignment.Assignment.model.Note;

public interface NoteRepository extends MongoRepository<Note, String> {
	
    List<Note> findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(String title, String content);


}
