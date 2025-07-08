package com.example.demo.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Batch {
	  @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    private String name;

	    @OneToMany(mappedBy = "batch")
//	    @com.fasterxml.jackson.annotation.JsonIgnore
	    private List<Student> students;



	    @OneToMany(mappedBy = "batch")
	    @com.fasterxml.jackson.annotation.JsonIgnore
	    private List<Trainer> trainers;


		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public List<Student> getStudents() {
			return students;
		}

		public void setStudents(List<Student> students) {
			this.students = students;
		}

		public List<Trainer> getTrainers() {
			return trainers;
		}

		public void setTrainers(List<Trainer> trainers) {
			this.trainers = trainers;
		}

		@Override
		public String toString() {
			return "Batch [id=" + id + ", name=" + name + "]";
		}
	    
	    
}
