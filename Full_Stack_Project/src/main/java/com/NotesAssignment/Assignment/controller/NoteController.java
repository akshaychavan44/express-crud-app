package com.NotesAssignment.Assignment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.NotesAssignment.Assignment.model.Note;
import com.NotesAssignment.Assignment.service.NoteService;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
	
	@Autowired
	
	private NoteService service;
	
	@PostMapping
	public Note create(@RequestBody Note note) {
		return service.create(note);
	}
	@GetMapping
	public List<Note> getAll(){
		return service.getall();
	}
	@PutMapping("/{id}")
	public Note update (@PathVariable  String id, @RequestBody Note note) {
		return service.update(id, note);
	}
	@GetMapping("/{id}")
	public Note getById(@PathVariable String id) {
	    return service.getById(id);
	}
	@DeleteMapping("/{id}")
	public String delete(@PathVariable String id) {
		service.delete(id);
		return "Deleted Successfully";
	}
	
	@GetMapping("/search")
		public List<Note> search(@RequestParam String q){
			return service.search(q);
		}
	}


